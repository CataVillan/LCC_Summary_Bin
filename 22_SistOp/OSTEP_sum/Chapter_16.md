## Segmentation
# Chapter 16

# Key words
- Segmentation
- Segment
- Base and Bounds (por segmento)
- Sparse Address Space
- External Fragmentation
- Protection Bits
- Fine-grained Segmentation
- Coarse-grained Segmentation
- Segment Table
- Compaction
- Best Fit / Worst Fit / First Fit
- Segmentation Fault

# Conceptos de Hardware
- Registros Base y Bounds (uno por segmento)
- Bit de crecimiento (Grows Positive?)
- Bits de proteccion (Read/Write/Execute)

# Idea General

`¿Como podemos evitar el desperdicio de memoria fisica que genera tener un solo par base/bounds para todo el address space?`
La respuesta es la *segmentacion*: en lugar de un unico par base/bounds para todo el address space, se usa un par por cada segmento logico (codigo, heap, stack). Asi, solo se reserva memoria fisica para las partes realmente usadas del address space, permitiendo soportar *address spaces dispersos (sparse)* de forma mucho mas eficiente.

# Repaso teorico

[16.1]`Segmentacion: generalizacion de base/bounds`
En vez de un solo par base/bounds, se usa un par por cada segmento logico del address space (tipicamente: codigo, heap y stack)
- Cada segmento se puede ubicar de forma independiente en la memoria fisica
- Solo se ocupa memoria fisica por el espacio realmente usado

**Ejemplo de tabla de segmentos:**

| Segmento | Base | Size |
|----------|------|------|
| Code     | 32K  | 2K   |
| Heap     | 34K  | 3K   |
| Stack    | 28K  | 2K   |

*El size register cumple el mismo rol que el bounds register anterior: indica cuantos bytes validos tiene el segmento*

**Ejemplo de traduccion (codigo):** direccion virtual 100 (segmento codigo) -> 100 + 32KB = 32868 (dentro del limite de 2KB, valida)

**Ejemplo de traduccion (heap):** direccion virtual 4200
- El heap empieza en la direccion virtual 4096 (4KB), por lo que el offset dentro del segmento es 4200 - 4096 = 104
- Direccion fisica = base del heap (34K) + offset (104) = 34920
*No se puede simplemente sumar la direccion virtual completa a la base; primero hay que calcular el offset dentro del segmento*

*Aside: el termino "segmentation fault"* proviene justamente de un acceso ilegal en un sistema con segmentacion; el termino persiste incluso en maquinas sin soporte real de segmentacion

[16.2]`¿A que segmento se refiere una direccion?`
- **Enfoque explicito**: se usan los bits mas altos de la direccion virtual para indicar el segmento (usado por ejemplo en VAX/VMS)
  - Con 3 segmentos se necesitan 2 bits para seleccionarlos

Segmento = (VirtualAddress & SEG_MASK) >> SEG_SHIFT
Offset   = VirtualAddress & OFFSET_MASK
if (Offset >= Bounds[Segmento])
    RaiseException(PROTECTION_FAULT)
else
    PhysAddr = Base[Segmento] + Offset

  - Limitacion: al usar los bits altos para elegir segmento, cada segmento queda limitado a un tamaño maximo fijo

- **Enfoque implicito**: el hardware determina el segmento segun *como* se genero la direccion (por ejemplo, si viene del program counter es codigo; si viene del stack/base pointer es stack; cualquier otra es heap)

[16.3]`¿Y el stack?`
El stack crece "hacia atras" (hacia direcciones mas bajas), por lo que su traduccion es distinta
- Se necesita un bit adicional que indique la direccion de crecimiento del segmento (positivo o negativo)

| Segmento | Base | Size (max 4K) | Crece Positivo? |
|----------|------|----------------|------------------|
| Code     | 32K  | 2K             | 1                |
| Heap     | 34K  | 3K             | 1                |
| Stack    | 28K  | 2K             | 0                |

*Ejemplo*: virtual address 15KB debe mapear a physical address 27KB
- Offset "crudo" = 3KB; como crece en negativo, offset real = 3KB - tamaño maximo del segmento (4KB) = -1KB
- Physical address = base (28KB) + offset negativo (-1KB) = 27KB

[16.4]`Soporte para compartir memoria (Sharing)`
Se agregan *protection bits* por segmento (lectura, escritura, ejecucion)
- Un segmento de codigo marcado como read-execute puede compartirse entre multiples procesos sin poner en riesgo el aislamiento
- Si un proceso intenta escribir un segmento de solo lectura, o ejecutar uno no ejecutable, el hardware genera una excepcion

[16.5]`Segmentacion fina vs. gruesa`
- *Coarse-grained*: pocos segmentos grandes (codigo, stack, heap) — el enfoque tipico visto en el capitulo
- *Fine-grained*: muchos segmentos pequeños (por ejemplo, en Multics o en la Burroughs B5000), requiere una *segment table* en memoria para soportar una cantidad grande de segmentos; permite un uso mas flexible de la memoria

[16.6]`Soporte del sistema operativo`
- *Context switch*: los registros de segmento deben guardarse y restaurarse por proceso, igual que con base/bounds
- *Crecimiento de segmentos*: cuando malloc() necesita mas espacio y el heap no alcanza, se hace una llamada al sistema (ej. sbrk()) para pedirle al SO que agrande el segmento; el SO puede rechazar el pedido si no hay memoria fisica suficiente
- *Gestion del espacio libre en memoria fisica*: al tener segmentos de tamaño variable, la memoria fisica libre se fragmenta en huecos pequeños -> **external fragmentation**
  - Ejemplo: 24KB libres en tres bloques no contiguos no permiten satisfacer un pedido de 20KB contiguos
  - **Compaction**: reorganizar los segmentos existentes para dejar un bloque grande libre; es una solucion costosa en tiempo de CPU
  - **Algoritmos de free-list**: best-fit, worst-fit, first-fit, buddy algorithm, entre otros, intentan minimizar la fragmentacion sin eliminarla del todo

[16.7]`Resumen`
La segmentacion mejora la reubicacion dinamica simple al soportar *sparse address spaces* de forma eficiente, evitando desperdiciar memoria en el espacio libre entre segmentos
- Ventaja adicional: permite compartir segmentos de codigo entre procesos
- Problemas: *external fragmentation* (dificil de evitar del todo) y falta de flexibilidad cuando un segmento (por ejemplo, un heap grande pero disperso) no encaja bien en el modelo de segmentos
*Esto motiva la busqueda de una solucion mas flexible: la paginacion*
