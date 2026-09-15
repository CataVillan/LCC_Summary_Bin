## Free-SpaceManagement
# Chapter 17

# Key words
- Free-Space Management
- External Fragmentation
- Internal Fragmentation
- Free List
- Splitting
- Coalescing
- Header (de bloque asignado)
- Magic Number
- Best Fit
- Worst Fit
- First Fit
- Next Fit
- Segregated List
- Slab Allocator
- Buddy Allocation
- Compaction

# Funciones
- malloc()
- free()
- mmap()
- sbrk()

# Idea General

`¿Como debe administrarse el espacio libre cuando los pedidos de memoria son de tamaño variable?`
Cuando el espacio libre se divide en unidades de tamaño fijo, administrarlo es sencillo (simplemente una lista de unidades libres). El problema se vuelve mas dificil e interesante cuando las unidades son de tamaño variable, como ocurre en una biblioteca de asignacion de memoria a nivel usuario (malloc/free) o en el SO cuando administra memoria fisica para segmentacion. Alli aparece la *external fragmentation*: el espacio libre total puede alcanzar, pero al estar fragmentado en pedazos pequeños y no contiguos, un pedido puede fallar igual.

# Repaso teorico

[17.1]`Suposiciones`
- Interfaz basica: `void *malloc(size_t size)` y `void free(void *ptr)`
- La biblioteca no recibe el tamaño en free(), por lo que debe poder deducirlo a partir del puntero
- La estructura que administra el espacio libre se llama *free list*
- Nos enfocamos en *external fragmentation* (mas interesante que la interna)
- Una vez entregada la memoria, no puede reubicarse (no hay compaction posible en malloc de usuario, a diferencia de lo que puede hacer el SO con segmentacion)
- Se asume una region contigua de bytes administrada por el allocator (aunque puede crecer, por ejemplo via sbrk())

[17.2]`Mecanismos de bajo nivel`

**Splitting y Coalescing**
- Ejemplo de heap de 30 bytes: 10 libres, 10 usados, 10 libres -> free list con dos nodos
- *Splitting*: si se pide menos espacio del que ofrece un bloque libre, el allocator parte el bloque en dos: uno para satisfacer el pedido, y el resto queda libre en la lista
- *Coalescing*: al liberar un bloque, si sus vecinos en memoria tambien estan libres, se combinan (mergean) en un unico bloque mas grande, evitando fragmentar la lista innecesariamente

**Tracking del tamaño de regiones asignadas**
- Los allocators guardan un *header* justo antes del bloque entregado al usuario

typedef struct {
    int size;
    int magic;
} header_t;

- Al llamar a free(ptr), la biblioteca calcula la direccion del header con aritmetica de punteros:

void free(void *ptr) {
    header_t *hptr = (header_t *) ptr - 1;

}

- El *magic number* sirve como chequeo de integridad (sanity check)
- *Detalle importante*: cuando el usuario pide N bytes, el allocator busca en realidad un bloque de tamaño N + tamaño del header

**Embeber la free list dentro del espacio libre**
- La lista libre se construye *dentro* del propio espacio libre (no se puede usar malloc() para los nodos de la lista de malloc!)

typedef struct __node_t {
    int size;
    struct __node_t *next;
} node_t;

- Ejemplo con heap de 4096 bytes obtenido via mmap(): se inicializa un unico nodo con `size = 4096 - sizeof(node_t)`
- A medida que se hacen pedidos, la lista se va dividiendo (splitting) y, al liberar, se reinsertan nodos que pueden requerir coalescing para no fragmentar innecesariamente la lista

**Crecimiento del heap**
- Si el heap se queda sin espacio, el allocator puede simplemente fallar (devolver NULL)
- O bien pedir mas memoria al SO mediante una syscall (ej. sbrk()), que mapea nuevas paginas fisicas al address space del proceso

[17.3]`Estrategias basicas de asignacion`

- **Best Fit**: recorre toda la lista y devuelve el bloque libre mas chico que aun asi sea suficientemente grande
  - *Ventaja*: reduce el desperdicio de espacio
  - *Desventaja*: requiere recorrer toda la lista (costoso)
- **Worst Fit**: al reves, busca el bloque mas grande y entrega desde ahi lo pedido, dejando el resto libre
  - Tambien requiere recorrido completo y en la practica tiene mal desempeño (mas fragmentacion, mismos costos)
- **First Fit**: devuelve el primer bloque suficientemente grande que encuentra
  - *Ventaja*: rapido, no requiere busqueda exhaustiva
  - *Desventaja*: puede "ensuciar" el comienzo de la lista con objetos chicos; se suele mantener la lista ordenada por direccion para facilitar el coalescing
- **Next Fit**: como first fit, pero recuerda donde quedo la ultima busqueda y continua desde ahi, distribuyendo mejor las busquedas a lo largo de la lista

**Ejemplo comparativo** (free list con bloques de tamaño 10, 30 y 20; pedido de 15):
- *Best fit* -> usa el bloque de 20 (el mas ajustado), queda un resto de 5
- *Worst fit* -> usa el bloque de 30 (el mas grande), queda un resto de 15
- *First fit* -> en este ejemplo se comporta igual que worst fit, pero con menor costo de busqueda

[17.4]`Otros enfoques`
- **Segregated Lists**: se reserva una lista separada para pedidos de un tamaño popular especifico; el resto de los pedidos van a un allocator general
  - Reduce la fragmentacion y acelera pedidos comunes
  - Ejemplo: *Slab Allocator* (Jeff Bonwick, usado en Solaris) crea "object caches" para objetos frecuentes del kernel (locks, inodes, etc.), y ademas mantiene los objetos liberados en estado ya inicializado, evitando costos repetidos de inicializacion/destruccion
- **Buddy Allocation**: la memoria libre se piensa como un bloque de tamaño 2^N; ante un pedido, se divide recursivamente por la mitad hasta llegar al bloque mas chico que aun sea suficiente
  - Facilita muchisimo el coalescing: al liberar, se revisa si el bloque "buddy" tambien esta libre y se fusionan recursivamente
  - Desventaja: puede sufrir *internal fragmentation* al solo entregar bloques de tamaño potencia de dos
- **Otras ideas**: estructuras mas avanzadas como arboles balanceados, splay trees, o allocators especializados para sistemas multiprocesador (ej. Hoard, jemalloc)

[17.5]`Resumen`
Se presentaron los mecanismos y politicas basicas de los allocators de memoria, presentes tanto en bibliotecas a nivel usuario como en el propio SO
*No existe un algoritmo "perfecto": todos son un compromiso entre velocidad, uso de espacio y grado de fragmentacion segun el patron de pedidos*
