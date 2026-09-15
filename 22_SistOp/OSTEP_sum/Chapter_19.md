## Paging: Faster Translations (TLBs)
# Chapter 19

# Key words
- TLB (Translation-Lookaside Buffer)
- TLB Hit
- TLB Miss
- Fully Associative Cache
- Hardware-managed TLB
- Software-managed TLB
- Address Space Identifier (ASID)
- TLB Flush
- Spatial Locality
- Temporal Locality
- TLB Coverage
- Replacement Policy (LRU, Random)
- RISC vs. CISC
- Physically-indexed Cache
- Virtually-indexed Cache

# Conceptos de Hardware
- MMU
- TLB
- Page-Table Base Register (PTBR) / CR3 (x86)

# Idea General

`¿Como evitar el costo de acceder a la page table en cada referencia a memoria?`
La paginacion, tal como se vio, requiere un acceso extra a memoria (a la page table) por cada acceso del programa, lo cual es prohibitivamente lento. La solucion es agregar un cache de hardware llamado *TLB (Translation-Lookaside Buffer)*, que guarda las traducciones virtual-a-fisica mas usadas recientemente, evitando en la mayoria de los casos tener que consultar la page table.

# Repaso teorico

[19.1]`Algoritmo basico del TLB`
El TLB es parte de la MMU y funciona como un cache de traducciones populares

VPN = (VirtualAddress & VPN_MASK) >> SHIFT
(Success, TlbEntry) = TLB_Lookup(VPN)
if Success:                     # TLB Hit
    if CanAccess(TlbEntry.ProtectBits):
        PhysAddr = (TlbEntry.PFN << SHIFT) | Offset
        AccessMemory(PhysAddr)
    else:
        RaiseException(PROTECTION_FAULT)
else:                            # TLB Miss
    PTE = AccessMemory(PTEAddr)  # se consulta la page table
    if PTE valida y accesible:
        TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits)
        RetryInstruction()
    else:
        RaiseException(...)

- **TLB Hit**: la traduccion ya esta en el cache, se accede rapido
- **TLB Miss**: hay que consultar la page table (costoso), y luego se actualiza el TLB y se reintenta la instruccion

[19.2]`Ejemplo: acceso a un arreglo`
Arreglo de 10 enteros (4 bytes c/u), address space de 8 bits, paginas de 16 bytes (VPN de 4 bits, offset de 4 bits)
- Secuencia de hits/misses al recorrer el arreglo: `miss, hit, hit, miss, hit, hit, hit, miss, hit, hit`
- **Hit rate** = hits / accesos totales = 70% en este ejemplo
- La razon de tantos hits pese a ser la primera pasada es la *spatial locality*: varios elementos del arreglo caen en la misma pagina
- Si se repite el recorrido del arreglo, se aprovecha ademas la *temporal locality*, logrando un hit rate mucho mayor
- *A mayor tamaño de pagina, menos misses por el mismo motivo de spatial locality*

[19.3]`¿Quien maneja un TLB miss?`
- **Hardware-managed TLB** (ej. Intel x86, arquitecturas CISC clasicas): ante un miss, el hardware mismo recorre la page table, encuentra la traduccion, actualiza el TLB y reintenta la instruccion; requiere que el hardware conozca el formato exacto de la page table
- **Software-managed TLB** (ej. MIPS, SPARC, arquitecturas RISC): ante un miss, el hardware solo genera una excepcion y salta a un trap handler del SO, que busca la traduccion, la inserta en el TLB (con instrucciones privilegiadas) y retorna
  - *Ventaja*: flexibilidad total sobre la estructura de la page table, sin necesitar cambios de hardware
  - *Cuidado*: el propio manejador de TLB miss debe evitar generar un TLB miss infinito (se suelen usar traducciones "wired" siempre validas para el codigo del handler)
- *Diferencia clave en el retorno del trap*: al volver de un TLB miss, se debe **reintentar la misma instruccion** que causo el miss (a diferencia de un system call, donde se continua en la instruccion siguiente)

[19.4]`Contenido de una entrada de TLB`
- El TLB es tipicamente *fully associative*: cualquier traduccion puede estar en cualquier entrada, y el hardware busca en paralelo

| VPN | PFN | otros bits (valid, protection, ASID, dirty, ...) |


[19.5]`Problema: Context Switches`
Las traducciones del TLB solo son validas para el proceso que las genero. Si no se hace nada, un proceso podria usar por error traducciones de otro proceso (mismo VPN, distinto PFN)
- **Solucion 1: flush del TLB en cada context switch** — se marcan todas las entradas como invalidas
  - *Costo*: el nuevo proceso sufrira muchos TLB misses al arrancar
- **Solucion 2: Address Space Identifier (ASID)** — se agrega un campo ASID a cada entrada, permitiendo que el TLB guarde traducciones de varios procesos simultaneamente sin confundirlas
  - El SO debe setear el ASID del proceso actual en un registro privilegiado en cada context switch
- *Caso especial de sharing*: dos procesos distintos pueden tener entradas para VPNs distintos que apuntan al mismo PFN (por ejemplo, codigo compartido), diferenciandose solo por el ASID

[19.6]`Politica de reemplazo`
- **LRU (Least Recently Used)**: aprovecha la localidad, descarta la entrada menos usada recientemente
  - *Caso patologico*: si un programa recorre en loop n+1 paginas con un TLB de tamaño n, LRU falla en absolutamente todos los accesos
- **Random**: descarta una entrada al azar; mas simple y evita los casos patologicos de LRU

[19.7]`Ejemplo real: MIPS R4000`
TLB por software, address space de 32 bits, paginas de 4KB
- VPN de 19 bits (solo la mitad del address space es de usuario)
- PFN de hasta 24 bits (soporta hasta 64GB de RAM fisica)
- **Bit Global (G)**: para paginas compartidas entre todos los procesos (ignora el ASID)
- **ASID (8 bits)**: distingue address spaces
- **Bits de Coherencia (C)**: como se cachea la pagina
- **Dirty bit**, **Valid bit**, **Page mask** (soporte de multiples tamaños de pagina)
- Instrucciones privilegiadas para manejar el TLB: `TLBP` (probar), `TLBR` (leer), `TLBWI` (escribir entrada especifica), `TLBWR` (escribir entrada aleatoria)
- Se reservan algunas entradas del TLB para el propio SO (registro *wired*)

[19.8]`Resumen`
El TLB, como cache de hardware de traducciones de direcciones, permite que la mayoria de los accesos a memoria se resuelvan sin tener que consultar la page table, logrando un rendimiento cercano al de un sistema sin virtualizacion
- **Limitacion**: si un programa accede a mas paginas de las que caben en el TLB en un periodo corto de tiempo, se produce un exceso de misses (*exceeding TLB coverage*), degradando fuertemente el rendimiento (por ejemplo, en bases de datos con estructuras grandes de acceso aleatorio)
- Una solucion futura: soporte de paginas mas grandes para aumentar la cobertura efectiva del TLB
- *Culler's Law*: la memoria RAM no siempre se comporta como "random access" verdadero, ya que el costo de acceder a una pagina depende de si esta o no mapeada en el TLB
