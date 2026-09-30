## Paging: Smaller Tables
# Chapter 20

# Key words
- Linear Page Table
- Page Table Entry (PTE)
- Virtual Page Number (VPN)
- Physical Frame Number (PFN)
- Offset
- Bigger Pages
- Multiple Page Sizes
- Internal Fragmentation
- External Fragmentation
- Hybrid Approach
- Segmentation
- Base / Bounds
- Multi-level Page Table
- Page Directory
- Page Directory Entry (PDE)
- Page Directory Index
- Page Table Index
- Sparse Address Space
- Time-Space Trade-off
- Inverted Page Table
- Hash Table
- Swapping Page Tables
- Kernel Virtual Memory

# Conceptos de Hardware
- MMU
- TLB
- TLB Hit
- TLB Miss
- Hardware-managed TLB
- PTBR (Page Table Base Register)
- PDBR (Page Directory Base Register)
- Base Register
- Bounds Register
- Valid Bit
- Protection Bits
- Physical Memory

# Funciones / Formulas
- SN = (VirtualAddress & SEG_MASK) >> SN_SHIFT
- VPN = (VirtualAddress & VPN_MASK) >> VPN_SHIFT
- AddressOfPTE = Base[SN] + (VPN * sizeof(PTE))
- PDEAddr = PageDirBase + (PDIndex * sizeof(PDE))
- PTEAddr = (PDE.PFN << SHIFT) + (PTIndex * sizeof(PTE))
- PhysAddr = (PTE.PFN << SHIFT) + offset

# Idea General

`¿Cómo hacemos que las tablas de páginas ocupen menos memoria?`
Las tablas de páginas lineales (arrays simples indexados por VPN) son demasiado grandes y hay una por proceso. Este capitulo presenta distintas estructuras de datos para reducir ese costo, y que cuesta cada una.
**Paginas mas grandes**
- Reducen la tabla, pero generan fragmentacion interna
**Hibrido (paginacion + segmentacion)**
- Una tabla de paginas por segmento
**Tablas multinivel**
- Convierten la tabla lineal en algo parecido a un arbol
**Tablas invertidas**
- Una unica tabla para todo el sistema

*Las tablas de paginas son solo estructuras de datos: se pueden hacer mas chicas o mas grandes, mas rapidas o mas lentas*

# Repaso teorico

[20.0]`El problema: tablas lineales demasiado grandes`
Espacio de direcciones de 32 bits (2^32 bytes), paginas de 4KB (2^12) y PTE de 4 bytes
- Cantidad de paginas virtuales: 2^32 / 2^12 = 2^20 (~1 millon)
- Tamano de la tabla: 2^20 * 4 bytes = 4MB
- Hay una tabla por proceso: con 100 procesos activos son cientos de MB solo en tablas
*Objetivo: achicar las tablas de paginas sin perder funcionalidad*

[20.1]`Solucion simple: paginas mas grandes`
Con paginas de 16KB: VPN de 18 bits + offset de 14 bits
- 2^18 entradas * 4 bytes = 1MB por tabla (4 veces menos, igual que el aumento del tamano de pagina)
- Problema: **fragmentacion interna** -> se asignan paginas grandes pero se usan solo partes, y la memoria se llena de paginas desperdiciadas
- Por eso la mayoria de los sistemas usan paginas chicas: 4KB (x86) u 8KB (SPARCv9)
*Aside: Multiple Page Sizes*
- Muchas arquitecturas (MIPS, SPARC, x86-64) soportan varios tamanos de pagina
- Una aplicacion puede pedir una pagina grande (ej. 4MB) para una estructura muy usada (bases de datos) y consumir una sola entrada de TLB
- La razon principal NO es ahorrar espacio de tabla sino reducir la presion sobre el TLB
- Complica el manejo de memoria virtual del SO

[20.2]`Enfoque hibrido: paginacion + segmentos`
Idea de Multics (Jack Dennis): combinar paginacion y segmentacion
- Problema de la tabla lineal: la mayor parte esta llena de entradas invalidas (espacio libre entre heap y stack)
- Solucion: **una tabla de paginas por segmento logico** (codigo, heap, stack)
- El registro **base** ya no apunta al segmento sino a la **tabla de paginas de ese segmento**
- El registro **bounds** indica cuantas paginas validas tiene el segmento (fin de la tabla)
Ejemplo: direccion virtual de 32 bits, paginas de 4KB, los 2 bits mas altos indican el segmento (00 sin usar, 01 codigo, 10 heap, 11 stack)
- Formato de la direccion: | Seg (2 bits) | VPN | Offset |
- En un TLB miss el hardware usa SN para elegir el par base/bounds y arma la direccion de la PTE
- En un context switch hay que cambiar estos registros (cada proceso tiene 3 tablas)
- Si se accede mas alla del bounds -> excepcion (probable terminacion del proceso)
*Problemas del hibrido*
- Sigue dependiendo de segmentacion (poco flexible): un heap grande pero poco usado sigue desperdiciando tabla
- Vuelve la **fragmentacion externa**: las tablas tienen tamano arbitrario (multiplos de PTE), es mas dificil encontrarles lugar en memoria
*Tip: usar hibridos combina lo mejor de dos ideas, pero no todos los hibridos son buena idea (Zeedonk)*

[20.3]`Tablas de paginas multinivel`
Idea: eliminar las regiones invalidas de la tabla en lugar de mantenerlas en memoria
1. Cortar la tabla lineal en unidades del tamano de una pagina
2. Si una pagina entera de PTEs es invalida, no se asigna esa pagina de la tabla
3. Una nueva estructura, el **page directory**, indica donde esta cada pagina de la tabla (o que esta completamente invalida)
*Page Directory Entry (PDE)*: minimo un valid bit y un PFN
- PDE valida = al menos una PTE de esa pagina de la tabla es valida
- PDE invalida = el resto de la entrada no esta definido
Ventajas
- El espacio de tabla es proporcional al espacio de direcciones realmente usado (soporta espacios dispersos)
- Cada trozo de la tabla entra en una pagina, asi el SO puede tomar la proxima pagina libre (no hace falta memoria contigua como en la tabla lineal)
- El page directory agrega un nivel de indireccion que permite ubicar las paginas de la tabla donde sea
Costos
- En un TLB miss hacen falta **2 accesos a memoria** (uno al directory y otro a la PTE) contra 1 de la tabla lineal
- Mayor complejidad del lookup (hardware o SO)
- Es un ejemplo de **time-space trade-off**: tabla mas chica pero TLB miss mas caro (con TLB hit el rendimiento es identico)
*Tip: si queres que algo sea mas rapido, normalmente pagas con espacio*

`Ejemplo detallado (2 niveles)`
Espacio de 16KB, paginas de 64 bytes -> direccion de 14 bits: VPN de 8 bits + offset de 6 bits
- Tabla lineal: 2^8 = 256 entradas * 4 bytes = 1KB
- 1KB / 64 bytes = 16 paginas de tabla, cada una con 16 PTEs
- Page directory: 16 entradas -> se necesitan 4 bits del VPN para indexarlo (los 4 mas altos)
- Los otros 4 bits del VPN son el Page Table Index
- VPN 0 y 1 = codigo, 4 y 5 = heap, 254 y 255 = stack; el resto invalido
- Se asignan solo 3 paginas (1 directory + 2 de tabla) en vez de 16
Traduccion de 0x3F80 (11 1111 1000 0000), primer byte del VPN 254
- PD Index = 1111 -> entrada 15 del directory -> apunta a PFN 101
- PT Index = 1110 -> entrada 14 de esa pagina -> PFN 55 (0x37)
- PhysAddr = (55 << 6) + 000000 = 00 1101 1100 0000 = 0x0DC0

`Mas de dos niveles`
Si el page directory tambien es demasiado grande, se lo divide y se agrega otro nivel arriba
- Ejemplo: espacio de 30 bits, paginas de 512 bytes -> VPN de 21 bits + offset de 9 bits
- Caben 512 / 4 = 128 PTEs por pagina -> 7 bits para el Page Table Index
- Quedan 14 bits para el directory -> 2^14 entradas de 4 bytes = 128 paginas (ya no entra en una)
- Solucion: dividir en PD Index 0 (7 bits) | PD Index 1 (7 bits) | Page Table Index (7 bits) | Offset
- Se consulta el directory superior con PD Index 0, luego el segundo nivel con el PFN obtenido + PD Index 1, y finalmente la PTE

`Control flow con TLB`
- Primero siempre se consulta el TLB; si hay hit se forma la direccion fisica sin tocar la tabla
- Solo en un TLB miss se hace el lookup multinivel: PDE (si invalida -> SEGMENTATION_FAULT), luego PTE (si invalida -> SEGMENTATION_FAULT, si sin permisos -> PROTECTION_FAULT)
- Si todo es valido: TLB_Insert + RetryInstruction
*Costo tipico de la tabla de dos niveles: 2 accesos extra a memoria en un TLB miss*

[20.4]`Tablas de paginas invertidas`
En lugar de una tabla por proceso, **una sola tabla con una entrada por pagina fisica** del sistema
- Cada entrada dice que proceso usa esa pagina fisica y que pagina virtual de ese proceso le corresponde
- Encontrar la entrada correcta requiere una busqueda; un scan lineal seria caro, por eso se arma una **hash table** encima
- Ejemplo: PowerPC
*Las tablas de paginas son solo estructuras de datos*

[20.5]`Swapping de las tablas de paginas a disco`
Hasta ahora se asumio que las tablas viven en memoria fisica del kernel
- Aun asi pueden ser demasiado grandes para entrar completas
- Algunos sistemas ponen las tablas en **memoria virtual del kernel** y permiten mandar partes a disco cuando hay presion de memoria (se ve en el caso de estudio VAX/VMS)

[20.6]
- Las tablas reales no son solo arrays lineales sino estructuras mas complejas
- El trade-off es tiempo vs espacio: cuanto mas grande la tabla, mas rapido el TLB miss (y al reves)
- En sistemas con poca memoria conviene estructuras chicas; con mucha memoria y muchas paginas activas puede convenir una tabla mas grande y rapida
- Con TLBs administrados por software se abre todo el espacio de estructuras posibles
