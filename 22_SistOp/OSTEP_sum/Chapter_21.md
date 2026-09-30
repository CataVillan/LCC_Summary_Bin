## Beyond Physical Memory: Mechanisms
# Chapter 21

# Key words
- Swap Space
- Swapping
- Page Fault
- Page-Fault Handler
- Present Bit
- Page-Replacement Policy
- Evict / Page Out
- Page In
- Memory Overlays
- Multiprogramming
- Blocked State
- High Watermark (HW)
- Low Watermark (LW)
- Swap Daemon / Page Daemon
- Clustering
- Background Work
- Transparency

# Conceptos de Hardware
- Hard Disk Drive
- SSD (Flash-based)
- Memory Hierarchy
- Page Table Entry (PTE)
- Valid Bit
- Protection Bits
- PFN
- Disk Address
- TLB Miss
- Hardware-managed TLB
- Software-managed TLB
- Exception / Trap
- I/O

# Funciones / Herramientas
- FindFreePhysicalPage()
- EvictPage()
- DiskRead(PTE.DiskAddr, PFN)
- RetryInstruction()
- RaiseException(PAGE_FAULT)
- vmstat
- swapon / swapoff
- mem.c (programa de la tarea)

# Idea General

`¿Como puede el SO usar un dispositivo mas grande y lento para dar la ilusion de un espacio de direcciones virtual enorme?`
Hasta ahora se asumia que todos los espacios de direcciones de todos los procesos entran en memoria fisica. Este capitulo relaja esa suposicion: se agrega un nivel mas a la jerarquia de memoria (el disco) para guardar las paginas que no se estan usando.
**Swap space**
- Espacio reservado en disco para mover paginas
**Present bit**
- Indica si la pagina esta en memoria o en disco
**Page fault**
- El SO trae la pagina desde disco cuando el proceso la necesita

*Todo ocurre de forma transparente para el proceso: cree que tiene su propia memoria privada y contigua*

# Repaso teorico

[21.0]`Por que queremos un espacio de direcciones grande`
- Conveniencia y facilidad de uso: no hay que preocuparse de si los datos entran en memoria
- Contraste: los sistemas viejos usaban **memory overlays**, donde el programador movia manualmente codigo y datos hacia y desde memoria
- La **multiprogramacion** casi exigia poder sacar paginas de memoria, ya que las maquinas viejas no podian tener todas las paginas de todos los procesos a la vez
- El dispositivo lento no tiene que ser un disco duro: puede ser un SSD basado en Flash
*Combinacion de multiprogramacion + facilidad de uso = querer usar mas memoria de la que hay fisicamente*

[21.1]`Swap Space`
Espacio del disco reservado para mover paginas de un lado a otro
- Se hace swap **out** de memoria hacia el swap y swap **in** desde el swap hacia memoria
- Se lee y escribe en unidades del tamano de pagina
- El SO debe recordar la **direccion en disco** de cada pagina
- El tamano del swap determina la cantidad maxima de paginas que el sistema puede tener en uso
Ejemplo (Fig. 21.1): memoria fisica de 4 paginas y swap de 8 bloques
- Proc 0, 1 y 2 comparten la memoria fisica con solo algunas paginas adentro
- Proc 3 tiene todas sus paginas en disco (no esta corriendo)
- Un bloque de swap queda libre
*Swap no es el unico lugar en disco usado: las paginas de codigo de un binario (ej. ls) estan en el sistema de archivos y el SO puede reutilizar ese frame sabiendo que puede volver a cargarlas desde el binario*

[21.2]`El Present Bit`
Se necesita informacion extra en cada PTE
- **present = 1** -> la pagina esta en memoria fisica y todo sigue como antes
- **present = 0** -> la pagina esta en disco
Recordatorio de un acceso a memoria
1. El hardware extrae el VPN y busca en el TLB
2. TLB hit -> arma la direccion fisica y accede a memoria (caso comun, rapido)
3. TLB miss -> usa el PTBR para buscar la PTE; si es valida y esta presente, extrae el PFN, lo instala en el TLB y reintenta la instruccion
Si la pagina no esta presente se produce un **page fault**
*Aside: terminologia. "Page fault" es raro porque es un acceso legal (la pagina esta mapeada, solo que no esta en memoria fisica); tecnicamente seria un "page miss". Se llama fault porque el hardware hace lo mismo que ante cualquier situacion que no sabe manejar: transferir el control al SO mediante una excepcion*

[21.3]`El Page Fault`
- Tanto con TLB por hardware como por software, si la pagina no esta presente **el SO se encarga** (page-fault handler)
- Casi todos los sistemas manejan los page faults por software
*Aside: por que el hardware no maneja los page faults*
- Los faults a disco son lentos: el overhead de correr software es minimo frente al I/O
- El hardware tendria que entender el swap space y como emitir I/Os al disco
Como sabe el SO donde esta la pagina
- Se usa la PTE: los bits que normalmente guardan el PFN pueden guardar la **direccion en disco**
Pasos al servir un page fault
1. El SO busca la direccion en disco en la PTE y emite el pedido de lectura
2. Mientras dura el I/O el proceso queda en estado **blocked** y el SO puede correr otros procesos (overlap de I/O y ejecucion = aprovechamiento de la multiprogramacion)
3. Al completar el I/O el SO marca la pagina como presente y actualiza el PFN de la PTE
4. Se reintenta la instruccion (puede haber un TLB miss, luego un ultimo reintento con TLB hit)

[21.4]`Que pasa si la memoria esta llena`
Lo anterior asume que hay memoria libre para traer la pagina
- Si no la hay, el SO primero debe **sacar (page out)** una o mas paginas
- Elegir la pagina a sacar es la **page-replacement policy**
- Elegir mal puede hacer que el programa corra a velocidad de disco en lugar de velocidad de memoria (10.000 a 100.000 veces mas lento)
*Las politicas se estudian en el capitulo 22; aca solo importa que existen y se construyen sobre estos mecanismos*

[21.5]`Control flow del page fault`
Tres casos posibles en un TLB miss (Fig. 21.2, hardware)
1. La pagina es **valida y esta presente**: se toma el PFN de la PTE, se inserta en el TLB y se reintenta
2. La pagina es **valida pero no esta presente**: se levanta PAGE_FAULT y corre el handler del SO
3. La pagina es **invalida** (bug del programa): el hardware hace trap, el SO probablemente termina el proceso. Ningun otro bit de la PTE importa
Si la pagina esta presente pero no se tienen permisos -> PROTECTION_FAULT
Que hace el SO ante un page fault (Fig. 21.3, software)
1. Busca un frame fisico libre: PFN = FindFreePhysicalPage()
2. Si no hay ninguno (PFN == -1) ejecuta el algoritmo de reemplazo: EvictPage()
3. Emite el I/O: DiskRead(PTE.DiskAddr, PFN) (duerme hasta que termine)
4. Actualiza la PTE: present = True y PTE.PFN = PFN
5. RetryInstruction()

[21.6]`Cuando ocurren realmente los reemplazos`
Esperar a que la memoria este completamente llena no es realista; el SO mantiene un poco de memoria libre de forma proactiva
- **High Watermark (HW)** y **Low Watermark (LW)**
- Cuando hay menos de LW paginas libres, corre un **thread en background** (swap daemon o page daemon) que saca paginas hasta que haya HW paginas libres, y luego se duerme
Ventaja: al hacer varios reemplazos juntos aparecen optimizaciones
- **Clustering / grouping**: agrupar varias paginas y escribirlas de una sola vez al swap, lo que reduce los tiempos de seek y de rotacion del disco
Cambio en el control flow: en vez de hacer el reemplazo directamente, el handler verifica si hay paginas libres; si no, avisa al thread de background y espera a que este libere paginas para despertarse
*Tip: hacer trabajo en background permite agrupar operaciones, mejora la latencia percibida (ej. buffer de escrituras a archivos), a veces evita el trabajo por completo (si se borra el archivo) y aprovecha los tiempos ociosos*

[21.7]
- Se agrega el **present bit** a las estructuras de tabla de paginas para saber si la pagina esta en memoria
- Si no esta, corre el **page-fault handler** del SO, que arregla la transferencia disco -> memoria (quizas reemplazando antes otra pagina)
- Todo esto es **transparente** para el proceso: ve memoria privada y contigua, aunque las paginas esten en lugares arbitrarios de la memoria fisica o en disco
- En el peor caso una sola instruccion puede tardar muchos milisegundos

