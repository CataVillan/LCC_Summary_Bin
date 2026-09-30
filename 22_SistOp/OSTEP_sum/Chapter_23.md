## Complete Virtual Memory Systems
# Chapter 23

# Key words
- Complete VM System
- VAX/VMS
- Linux
- Process Space (P0 / P1)
- System Space (S)
- Curse of Generality
- Real Address Space
- Null-pointer Detection
- Kernel Mapped into User Address Space
- Protection Levels
- Memory Hogs
- Resident Set Size (RSS)
- Segmented FIFO
- Second-chance Lists (clean / dirty)
- Emulating Reference Bits
- Clustering
- Demand Zeroing
- Copy-on-Write (COW)
- Lazy Optimizations
- Kernel Logical Address
- Kernel Virtual Address
- kmalloc / vmalloc
- Four-level Page Table
- Huge Pages
- Transparent Huge Pages
- Page Cache
- Anonymous Memory
- 2Q Replacement (inactive / active list)
- Memory-mapped Files
- Buffer Overflow
- Privilege Escalation
- NX bit
- Return-Oriented Programming (ROP)
- Gadgets
- Return-to-libc
- ASLR / KASLR
- Speculative Execution
- Meltdown / Spectre
- KPTI (Kernel Page-Table Isolation)

# Conceptos de Hardware
- VAX-11 (DEC)
- x86 / x86-64
- MMU
- TLB (hardware-managed)
- Page Table Entry
- Protection Bits
- Modify (Dirty) Bit
- Valid Bit
- Base / Bounds Registers
- DMA
- Processor Caches
- Branch Predictors
- Privileged Mode

# Funciones
- write()
- fork()
- exec()
- mmap()
- shmget()
- kmalloc()
- vmalloc()
- strcpy()
- pmap (herramienta)
- pdflush (threads de background)

# Idea General

`¿Que caracteristicas necesita un sistema de memoria virtual completo?`
El capitulo junta todo lo visto (tablas de paginas, TLB, politicas de reemplazo) estudiando dos sistemas reales: **VAX/VMS** (uno de los primeros VM "modernos", 1970s-80s) y **Linux**.
**VAX/VMS**
- Muchas ideas siguen vigentes: kernel mapeado en cada address space, demand zeroing, copy-on-write, clustering
**Linux**
- Sistema flexible que corre desde telefonos hasta servidores: huge pages, page cache unificada, 2Q, seguridad (NX, ASLR, KPTI)

*Un sistema real hereda muchas ideas del pasado y suma optimizaciones de rendimiento, funcionalidad y seguridad*

# Repaso teorico

[23.0]`El problema`
Existen muchas caracteristicas mas alla de los mecanismos basicos que componen un VM completo: rendimiento, funcionalidad y seguridad.
*Algunas ideas, incluso de hace 50 anios, siguen valiendo la pena*

[23.1]`VAX/VMS: hardware de administracion de memoria`
Arquitectura VAX-11 (DEC, fines de los 70). VMS tenia que funcionar en un rango enorme de maquinas, desde baratas hasta muy poderosas
- El SO muchas veces oculta con software fallas del hardware
*Aside: la maldicion de la generalidad (curse of generality)*
- Un SO general que debe soportar muchas configuraciones probablemente no soporte muy bien ninguna en particular (hoy: Linux en telefonos, TVs, laptops, servidores en la nube)
Direcciones y paginas
- Espacio virtual de 32 bits por proceso, paginas de **512 bytes** -> VPN de 23 bits + offset de 9 bits
- Los 2 bits mas altos del VPN indican el segmento: es un hibrido de paginacion y segmentacion
- Mitad baja = **process space**: P0 (programa de usuario + heap, que crece hacia abajo) y P1 (stack, que crece hacia arriba)
- Mitad alta = **system space (S)**: codigo y datos protegidos del SO, compartido entre procesos (solo se usa la mitad)
Reduccion de la presion de las tablas (la pagina de 512 bytes hacia que las tablas lineales fueran enormes)
1. Segmentar el espacio de usuario en dos (P0 y P1): una tabla por region y por proceso, asi no hay tabla para el hueco entre stack y heap; base = direccion de la tabla, bounds = cantidad de PTEs
2. Poner las tablas de usuario (2 por proceso) en **memoria virtual del kernel** (segmento S): si hay mucha presion se pueden mandar paginas de esas tablas a disco
Costo: la traduccion se complica. Para traducir una direccion de P0/P1 el hardware puede tener que consultar antes la tabla del sistema (que vive en memoria fisica) para encontrar la pagina de la tabla de usuario. El TLB por hardware evita gran parte de este trabajo.

[23.2]`VAX/VMS: un address space real`
- La pagina 0 se marca **inaccesible** para detectar accesos por punteros nulos (soporte de debugging)
- El kernel esta mapeado dentro de **cada** address space de usuario: en un context switch cambian los registros P0 y P1 pero no los de S
Por que mapear el kernel en cada proceso
- Al hacer una syscall (ej. write()) el SO recibe un puntero de usuario y puede copiar datos facilmente
- El kernel puede escribirse y compilarse sin preocuparse de donde vienen los datos
- Seria dificil intercambiar paginas de tablas a disco si el kernel viviera solo en memoria fisica
- Si el kernel tuviera su propio address space, mover datos entre usuario y kernel seria complicado
- El kernel parece casi una libreria para las aplicaciones, aunque protegida
Proteccion
- Los bits de proteccion de la tabla especifican el **nivel de privilegio** que debe tener la CPU para acceder a la pagina
- Un acceso de codigo de usuario a datos del sistema genera un trap al SO (y probablemente la terminacion del proceso)
*Aside: por que un acceso por puntero nulo causa un seg fault. int *p = NULL; *p = 10; -> VPN 0 -> TLB miss -> la PTE esta invalida -> el SO termina el proceso (en UNIX envia una senal)*

[23.3]`VAX/VMS: reemplazo de paginas`
La PTE del VAX tiene: valid bit, protection (4 bits), modify (dirty) bit, campo reservado para el SO (5 bits) y PFN. **No tiene reference bit**
- Ademas les preocupaban los **memory hogs** (programas que usan mucha memoria y perjudican a otros); LRU es una politica global que no reparte la memoria de forma justa
*Aside: emulando reference bits (Babaoglu y Joy)*
- Se marcan las paginas como inaccesibles (guardando en el campo del SO si realmente lo son)
- Al acceder a una, se produce un trap; el SO ve que la pagina era realmente accesible y restaura sus permisos
- Las que siguen inaccesibles al reemplazar son las no usadas recientemente
- Equilibrio: no marcar demasiadas paginas (mucho overhead) ni muy pocas (todas quedan como referenciadas)
**Segmented FIFO**
- Cada proceso tiene un maximo de paginas en memoria: su **resident set size (RSS)**
- Las paginas van en una lista FIFO por proceso; al pasarse del RSS, se saca la primera en entrar
- FIFO no necesita ayuda de hardware, pero rinde mal por si solo
Para mejorarlo: **dos listas de segunda oportunidad** (globales)
- Lista de paginas clean (libres) y lista de paginas dirty
- Cuando un proceso P se pasa de su RSS, la pagina sacada va al final de la lista clean (si no fue modificada) o dirty (si lo fue)
- Si otro proceso Q necesita una pagina libre, toma la primera de la lista clean
- Si P vuelve a fallar sobre esa pagina antes de que se reutilice, la **recupera de la lista** y se evita un acceso a disco
- Mientras mas grandes las listas, mas se acerca el segmented FIFO a LRU
**Clustering**
- Con paginas tan chicas el I/O a disco era ineficiente; VMS agrupa muchas paginas de la lista dirty y las escribe de una vez (quedan clean)
- La libertad de ubicar paginas en cualquier lugar del swap lo permite; se usa en casi todos los sistemas modernos

[23.4]`VAX/VMS: otros trucos (lazy optimizations)`
**Demand zeroing**
- Version ingenua: al agregar una pagina al heap, el SO busca una pagina fisica, la llena de ceros (necesario por seguridad, para no ver datos de otro proceso) y la mapea
- Con demand zeroing: al agregar la pagina solo se pone una entrada inaccesible en la tabla, marcada como demand-zero
- Si el proceso accede, hay un trap; recien ahi se busca la pagina fisica, se la llena de ceros y se la mapea
- Si nunca se accede, se evita todo el trabajo
**Copy-on-Write (COW)** (idea que viene de TENEX)
- Para copiar una pagina de un address space a otro, en lugar de copiarla se la mapea en el destino y se marca **read-only en ambos**
- Si solo se lee, no hace falta hacer nada: copia rapida sin mover datos
- Si alguno escribe, hay un trap; el SO ve que es una pagina COW, aloca una pagina nueva, copia los datos y la mapea en el address space del que escribio
- Util para librerias compartidas (ahorran memoria) y muy importante en UNIX: `fork()` copia todo el address space y luego `exec()` casi siempre lo sobreescribe; con COW se evita copiar de mas
*Tip: ser vago (lazy) puede reducir la latencia de la operacion actual y a veces evita hacer el trabajo por completo*

[23.5]`Linux: el address space`
Se enfoca en Linux para x86. El address space se divide en parte de usuario y parte de kernel
- Al hacer context switch cambia la parte de usuario; la del kernel es la misma para todos los procesos
- Un programa en user mode no puede acceder a paginas del kernel; solo mediante un trap y pasando a modo privilegiado
- En Linux de 32 bits el corte esta en **0xC0000000** (tres cuartos): 0 a 0xBFFFFFFF usuario, 0xC0000000 a 0xFFFFFFFF kernel. En 64 bits es similar en otros puntos
Dos tipos de direcciones virtuales del kernel
**Kernel logical addresses**
- El espacio virtual "normal" del kernel; memoria que se obtiene con `kmalloc`
- Aca viven la mayoria de las estructuras: tablas de paginas, stacks del kernel por proceso
- **No se puede hacer swap a disco**
- Tienen un **mapeo directo** con la primera parte de la memoria fisica (0xC0000000 -> 0x00000000, 0xC0000FFF -> 0x00000FFF)
    - Es facil traducir de una a otra, se tratan casi como fisicas
    - Si un bloque es contiguo en el espacio logico tambien lo es en memoria fisica -> apto para **DMA** y otras operaciones que lo requieren
**Kernel virtual addresses**
- Se obtienen con `vmalloc`, que devuelve una region virtualmente contigua
- Normalmente no contiguas en memoria fisica (no aptas para DMA), pero es mas facil alocar -> se usan para buffers grandes
- En 32 bits permiten al kernel acceder a mas de ~1GB de memoria; con 64 bits la necesidad es menor

[23.6]`Linux: estructura de la tabla de paginas`
- x86 provee una tabla multinivel administrada por hardware, una por proceso
- El SO arma los mapeos, apunta un registro privilegiado al inicio del directory y el hardware hace el resto; el SO interviene al crear/eliminar procesos y en context switches
- Cambio importante: paso de 32 a 64 bits. Los sistemas de 64 bits usan una **tabla de cuatro niveles**
- Solo se usan los 48 bits mas bajos: los 16 mas altos no se usan, los 12 mas bajos son el offset (paginas de 4KB) y quedan **36 bits** para traduccion (P1 | P2 | P3 | P4 | offset)
- A medida que crezcan las memorias se habilitaran mas bits: cinco y luego seis niveles

[23.7]`Linux: huge pages`
x86 soporta paginas de 4KB, **2MB y 1GB**; Linux permite usarlas (huge pages)
- Reducen la cantidad de mapeos en la tabla, pero el beneficio principal es el **mejor comportamiento del TLB**: menos entradas para cubrir mucha memoria
- Algunas aplicaciones con memoria grande gastan ~10% de los ciclos atendiendo TLB misses
- Otros beneficios: camino mas corto en un TLB miss y alocacion rapida en algunos escenarios
Adopcion **incremental**
1. Al principio solo se podia pedir explicitamente (mmap() o shmget()) para las pocas aplicaciones que lo necesitaban (bases de datos)
2. Mas tarde se agrego **transparent huge page support**: el SO busca automaticamente oportunidades de usar huge pages (2MB, en algunos 1GB) sin modificar las aplicaciones
Costos
- Fragmentacion interna (paginas grandes poco usadas)
- El swap no funciona bien con huge pages (puede amplificar mucho el I/O)
- El overhead de alocacion puede ser malo en algunos casos
*Tip: incrementalismo; introducir soporte especializado, aprender de sus pros y contras, y recien despues agregar soporte generico*

[23.8]`Linux: la page cache`
Para reducir el costo de acceder al almacenamiento persistente, se usa cache agresiva. La page cache de Linux es **unificada** y mantiene paginas de tres fuentes
- Archivos mapeados en memoria
- Datos y metadatos de archivos en dispositivos (via read() y write() al file system)
- Paginas de heap y stack de cada proceso (**memoria anonima**, porque no hay archivo debajo sino swap)
- Se guardan en una hash table para lookup rapido
Seguimiento de estado
- Distingue entradas clean y **dirty**; los datos dirty se escriben periodicamente al backing store (archivo o swap) por threads de background (**pdflush**), tras un tiempo o si hay demasiadas paginas dirty (parametros configurables)
**Reemplazo: 2Q modificado**
- LRU estandar puede ser saboteado: si un proceso accede repetidamente a un archivo grande (casi del tamano de la memoria o mayor), LRU saca todo lo demas y no sirve de nada retener partes de ese archivo
- Solucion: dos listas y memoria dividida entre ellas
    - Primer acceso -> **inactive list** (A1 en el paper original)
    - Re-referencia -> se promueve a la **active list** (Aq en el original)
    - Los candidatos a reemplazo se toman de la inactive list
    - Periodicamente se mueven paginas del fondo de la active a la inactive, manteniendo la active en ~2/3 del total
- Se usa una aproximacion de LRU (parecida al reloj) porque el LRU perfecto es caro
- Ventaja: los accesos ciclicos a archivos grandes quedan confinados a la inactive list y no expulsan paginas utiles de la active list

[23.9]`Linux: memory-mapping`
*Aside: la ubicuidad del memory-mapping*
- `mmap()` sobre un file descriptor devuelve un puntero al inicio de una region virtual donde parece estar el contenido del archivo; se accede con simples dereferencias
- Los accesos a partes no traidas aun generan page faults y el SO las carga (demand paging)
- Todo proceso Linux usa archivos mapeados aunque main() no llame a mmap(): asi se carga el codigo del ejecutable y de las librerias compartidas
- pmap muestra los mapeos (ej. tcsh): codigo del binario (r-x), heap ([anon], rw), libc, libcrypt, libtinfo, el dynamic linker (ld.so) y el stack

[23.10]`Linux: seguridad y buffer overflows`
La gran diferencia entre VM modernos y viejos como VAX/VMS es el **enfasis en seguridad**
**Buffer overflow**
- Un bug permite inyectar datos arbitrarios en el address space del objetivo (ej. `strcpy(dest_buffer, input)` sin limite)
- Normalmente causa un crash, pero un atacante puede armar la entrada para inyectar su propio codigo y tomar control
- Si el ataque es contra el SO -> **privilege escalation** (codigo de usuario obtiene derechos de kernel)
**NX bit** (No-eXecute, en Intel XD)
- Impide ejecutar codigo de paginas con ese bit seteado en la PTE (ej. el stack) -> el codigo inyectado no se puede ejecutar
**Return-Oriented Programming (ROP)**
- Aunque no se pueda inyectar codigo, existen trozos de codigo (**gadgets**) en el address space del programa (por ejemplo en la libreria C)
- El atacante sobreescribe el stack para que la direccion de retorno apunte a un gadget seguido de un return, encadenando muchos gadgets para ejecutar codigo arbitrario
- Su forma anterior es el ataque **return-to-libc**
**ASLR** (address space layout randomization)
- El SO randomiza la ubicacion de codigo, stack y heap, lo que dificulta armar la secuencia de ROP
- Ejemplo: imprimir la direccion de una variable del stack da un valor distinto en cada ejecucion
- Tambien se aplica al kernel: **KASLR**

[23.11]`Linux: Meltdown y Spectre`
Ataques descubiertos en 2018 que pusieron en duda las protecciones fundamentales del hardware y el SO
- Explotan la **speculative execution**: la CPU adivina que instrucciones se ejecutaran y las ejecuta antes; si se equivoca, deshace los efectos sobre el estado arquitectural
- Problema: la especulacion deja rastros en caches del procesador, branch predictors, etc., que pueden exponer memoria que se creia protegida por la MMU
- Defensa: **KPTI (kernel page-table isolation)**: en lugar de mapear todo el kernel en cada proceso, se deja un minimo y se usa una tabla de paginas del kernel aparte; al entrar al kernel hay que cambiar de tabla
- Costo: **rendimiento** (cambiar de tablas es caro)
- KPTI no resuelve todo; apagar la especulacion no tiene sentido porque los sistemas correrian miles de veces mas lento
*Los costos de la seguridad: conveniencia y rendimiento*

[23.12]
- Se vieron dos sistemas de VM de arriba a abajo (VAX/VMS y Linux)
- Linux hereda muchas ideas del pasado: COW lazy en fork(), demand zeroing (mapeando /dev/zero), un swap daemon en background
- Referencias para profundizar: el paper de Levy y Lipman sobre VAX/VMS, y libros sobre el kernel y el VM de Linux (algo desactualizados)
