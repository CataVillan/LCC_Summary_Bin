## Paging: Introduction
# Chapter 18

# Key words
- Paging
- Page
- Page Frame
- Page Table
- Page Table Entry (PTE)
- Virtual Page Number (VPN)
- Physical Frame Number (PFN / PPN)
- Offset
- Valid Bit
- Protection Bits
- Present Bit
- Dirty Bit
- Reference Bit (Accessed Bit)
- Linear Page Table
- Page Table Base Register (PTBR)
- Sparse Address Space

# Conceptos de Hardware
- MMU
- Page Table Base Register

# Idea General

`¿Como podemos virtualizar la memoria dividiendola en unidades de tamaño fijo, evitando los problemas de la segmentacion?`
La idea se llama *paginacion*: en vez de dividir el address space en segmentos logicos de tamaño variable (codigo, heap, stack), se lo divide en unidades de tamaño fijo llamadas *paginas*. De forma correspondiente, la memoria fisica se ve como un arreglo de *page frames* de ese mismo tamaño fijo. Esto evita la external fragmentation y da mucha flexibilidad, aunque introduce nuevos problemas de espacio y velocidad.

# Repaso teorico

[18.1]`Ejemplo introductorio y vision general`
- Un address space de 64 bytes se divide en 4 paginas de 16 bytes (paginas 0, 1, 2 y 3)
- La memoria fisica se divide en *page frames* del mismo tamaño (por ejemplo, 8 frames de 16 bytes = 128 bytes de memoria fisica)
- Las paginas del address space se ubican en frames fisicos que no tienen por que ser contiguos ni estar en orden

**Ventajas de la paginacion:**
- *Flexibilidad*: no se hacen suposiciones sobre como crecen heap y stack
- *Simplicidad en la gestion del espacio libre*: el SO simplemente mantiene una free list de frames fisicos libres, y toma los que necesite

**Page Table**
- Estructura por proceso que guarda las traducciones de cada pagina virtual a su frame fisico correspondiente
- Ejemplo: (VP0 -> PF3), (VP1 -> PF7), (VP2 -> PF5), (VP3 -> PF2)
- *Es una estructura por proceso* (salvo excepciones como la inverted page table)

**Traduccion de direcciones**
La direccion virtual se divide en dos partes:

| VPN | Offset |

- **VPN (Virtual Page Number)**: identifica la pagina dentro del address space
- **Offset**: identifica el byte dentro de esa pagina

*Ejemplo*: address space de 64 bytes (6 bits), paginas de 16 bytes (4 bits de offset) -> 2 bits de VPN
Direccion virtual 21 = binario `010101` -> VPN = `01` (pagina 1), offset = `0101` (byte 5)
Si la page table indica VP1 -> PF7 (binario 111), la direccion fisica final es `1110101` (117 en decimal)
*El offset nunca se traduce: identifica el mismo byte relativo dentro de la pagina, tanto virtual como fisica*

[18.2]`¿Donde se guardan las page tables?`
- Las page tables pueden ser enormes: para un address space de 32 bits con paginas de 4KB, se necesita un VPN de 20 bits -> 2^20 traducciones por proceso
- Con 4 bytes por PTE, esto implica **4MB por proceso** solo para la page table; con 100 procesos, 400MB solo en traducciones
- Por esto, la page table del proceso corriendo *no* se guarda en registros especiales de la MMU: se guarda en memoria fisica (administrada por el SO)

[18.3]`¿Que contiene una entrada de la page table (PTE)?`
- La estructura mas simple es la *linear page table*: un simple arreglo indexado por el VPN
- Contenido tipico de una PTE:
  - **Valid bit**: indica si la traduccion es valida; permite marcar como invalido el espacio no usado entre heap y stack (soporte de sparse address spaces sin gastar memoria fisica)
  - **Protection bits**: permisos de lectura, escritura, ejecucion
  - **Present bit**: si la pagina esta en memoria fisica o fue swapeada a disco
  - **Dirty bit**: si la pagina fue modificada desde que se cargo
  - **Reference (accessed) bit**: si la pagina fue accedida recientemente (util para politicas de reemplazo)
- *Ejemplo real*: la PTE de x86 no distingue un bit "valid" separado de un bit "present": si Present=0, el hardware genera un trap y el SO decide si la pagina es invalida o simplemente no esta presente (fue swapeada)

[18.4]`Paginacion: tambien lenta`
Cada acceso a memoria requiere, en principio, un acceso extra a la page table antes del acceso real

VPN     = (VirtualAddress & VPN_MASK) >> SHIFT
PTEAddr = PageTableBaseRegister + (VPN * sizeof(PTE))
PTE     = AccessMemory(PTEAddr)
if (PTE.Valid == False)      -> SEGMENTATION_FAULT
elif (!CanAccess(PTE.Prot))  -> PROTECTION_FAULT
else:
    offset   = VirtualAddress & OFFSET_MASK
    PhysAddr = (PTE.PFN << SHIFT) | offset
    Register = AccessMemory(PhysAddr)

*Esto agrega una referencia extra a memoria por cada acceso, pudiendo duplicar (o mas) el tiempo de ejecucion*

[18.5]`Trace de memoria (ejemplo resumido)`
Un simple loop que inicializa un arreglo genera, por cada iteracion:
- Fetches de instruccion (cada uno con su propio acceso a la page table)
- El acceso explicito de escritura al arreglo (tambien con su propio acceso a la page table)
*Esto demuestra que incluso un codigo trivial genera muchisimos accesos adicionales a memoria por causa de la paginacion*

[18.6]`Resumen`
La paginacion resuelve el problema de la external fragmentation (al usar unidades de tamaño fijo) y da mucha flexibilidad para soportar address spaces dispersos
Sin embargo, aparecen dos problemas centrales a resolver en los proximos capitulos:
- **Espacio**: las page tables pueden ocupar demasiada memoria
- **Velocidad**: cada acceso a memoria requiere una referencia extra a la page table
