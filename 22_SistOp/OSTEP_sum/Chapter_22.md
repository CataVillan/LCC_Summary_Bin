## Beyond Physical Memory: Policies
# Chapter 22

# Key words
- Replacement Policy
- Memory Pressure
- Cache Management
- Cache Hit / Cache Miss
- Hit Rate / Miss Rate
- AMAT (Average Memory Access Time)
- Optimal Policy (MIN / OPT)
- FIFO
- Random
- LRU (Least-Recently-Used)
- LFU (Least-Frequently-Used)
- MRU / MFU
- Belady's Anomaly
- Stack Property
- Compulsory Miss (Cold-start)
- Capacity Miss
- Conflict Miss
- Principle of Locality
- Spatial Locality
- Temporal Locality
- Workload
- Clock Algorithm
- Use Bit (Reference Bit)
- Dirty Bit (Modified Bit)
- Page Selection Policy
- Demand Paging
- Prefetching
- Clustering
- Thrashing
- Working Set
- Admission Control
- Out-of-Memory Killer
- Scan Resistance (ARC)

# Conceptos de Hardware
- Physical Memory
- Disk
- SSD
- Hardware Cache
- Set-associativity
- Page Table
- Use bit / Dirty bit (seteados por hardware)
- Time field por pagina

# Funciones / Formulas
- AMAT = T_M + (P_Miss * T_D)
- P_Hit + P_Miss = 1.0
- Hit rate = Hits / (Hits + Misses)
- valgrind --tool=lackey --trace-mem=yes ls
- paging-policy.py (simulador de la tarea)

# Idea General

`¿Como decide el SO que pagina sacar de memoria cuando esta llena?`
La memoria principal puede verse como una **cache** de las paginas virtuales del sistema. El objetivo de la politica de reemplazo es **minimizar los misses** (las veces que hay que traer una pagina desde disco) o, dicho al reves, maximizar los hits.
**Optimal**
- Punto de comparacion: reemplaza la pagina que se usara mas lejos en el futuro (no implementable)
**Politicas simples**
- FIFO y Random: faciles de implementar, pero no usan informacion
**Politicas con historia**
- LRU y LFU usan recencia o frecuencia; se aproximan con el algoritmo del reloj

*El costo de un acceso a disco es tan alto que incluso un miss rate muy chico domina el tiempo total*

# Repaso teorico

[22.0]`El problema`
Cuando hay mucha memoria libre un page fault es facil: se toma una pagina de la free list. Cuando queda poca, hay **memory pressure** y el SO debe sacar paginas para hacer lugar a las que se usan activamente.
*Decidir que pagina sacar es la politica de reemplazo (replacement policy), una de las decisiones mas importantes de los primeros sistemas de memoria virtual*

[22.1]`Cache Management y AMAT`
- Objetivo: minimizar cache misses = minimizar cuantas veces se trae una pagina de disco
- **AMAT = T_M + (P_Miss * T_D)** donde T_M es el costo de acceder a memoria, T_D el costo de acceder a disco y P_Miss la probabilidad de miss (0.0 a 1.0)
- Siempre se paga el acceso a memoria; en un miss se paga ademas el de disco
Ejemplo: direcciones de 12 bits, paginas de 256 bytes -> VPN de 4 bits + offset de 8 bits (16 paginas virtuales)
- Referencias: 0x000, 0x100, ..., 0x900 (primeras diez paginas)
- Todas las paginas estan en memoria salvo la 3 -> hit, hit, hit, miss, hit x6
- Hit rate = 90%, miss rate = 10% (P_Miss = 0.1)
- Con T_M = 100ns y T_D = 10ms: AMAT = 100ns + 0.1 * 10ms = ~1ms
- Con hit rate de 99.9% (P_Miss = 0.001): AMAT = ~10.1 microsegundos (unas 100 veces mas rapido)
- Si el hit rate se acerca al 100%, AMAT se acerca a 100ns
*Incluso un miss rate chico se domina por el costo del disco: hay que evitar la mayor cantidad de misses posible*

[22.2]`Politica optima (Belady, MIN)`
Reemplaza la pagina que sera accedida **mas lejos en el futuro** -> produce la menor cantidad posible de misses
- Es dificil (imposible en un SO general) de implementar porque requiere conocer el futuro
- Sirve como **punto de comparacion** en simulaciones: decir "80% de hit rate" no significa nada solo, pero "80% frente a un optimo de 82%" si
Traza de ejemplo: referencias 0, 1, 2, 0, 1, 3, 0, 3, 1, 2, 1 con cache de 3 paginas
- Los primeros 3 misses son **compulsory (cold-start)**: la cache empieza vacia
- Al referenciar 3 hay que reemplazar: se evita sacar 0 y 1 (se usan pronto) y se saca la **2**
- Luego al referenciar 2 se saca la 3 (0 tambien hubiera servido)
- Resultado: 6 hits y 5 misses -> hit rate = 6/11 = **54.5%** (85.7% ignorando los misses compulsory)
*Aside: tipos de misses (las 3 C)*
- Compulsory (cold-start): primera referencia al item, la cache esta vacia
- Capacity: la cache se quedo sin espacio y hubo que sacar algo
- Conflict: por limites de donde se puede ubicar un item en una cache de hardware (set-associativity); **no ocurre en la cache de paginas del SO** porque es totalmente asociativa

[22.3]`Politica simple: FIFO`
Las paginas entran en una cola; al reemplazar se saca la que entro **primero**
- Ventaja: muy simple de implementar
- En la misma traza: 36.4% de hit rate (57.1% ignorando compulsory) -> bastante peor que OPT
- Problema: no puede determinar la importancia de las paginas; saca la pagina 0 aunque haya sido muy accedida, solo porque fue la primera en entrar
*Aside: Belady's Anomaly*
- Con FIFO y la secuencia 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 el hit rate **empeora** al pasar de una cache de 3 a una de 4 paginas
- LRU no sufre esto porque tiene la **stack property**: una cache de tamano N+1 incluye el contenido de una de tamano N, entonces el hit rate solo puede mantenerse o mejorar
- FIFO y Random no cumplen la stack property

[22.4]`Otra politica simple: Random`
Elige una pagina al azar para reemplazar
- Simple de implementar pero no intenta ser inteligente
- En el ejemplo anda algo mejor que FIFO y peor que OPT
- Sobre 10.000 corridas con distintas semillas: mas del 40% de las veces logra 6 hits (igual que OPT), otras veces 2 hits o menos
*El resultado depende enteramente de la suerte*

[22.5]`Usando historia: LRU`
FIFO y Random pueden sacar una pagina importante que esta por volver a usarse. Se usa el pasado para predecir el futuro:
- **Frecuencia**: si una pagina fue accedida muchas veces, no conviene sacarla -> **LFU**
- **Recencia**: mientras mas recientemente se accedio una pagina, mas probable que se use pronto -> **LRU**
- Se basan en el **principio de localidad**
*Aside: tipos de localidad*
- **Espacial**: si se accede a la pagina P, es probable que se acceda a P-1 o P+1
- **Temporal**: las paginas accedidas recientemente probablemente se vuelvan a acceder pronto
- Es una heuristica, no una regla obligatoria; hay programas casi aleatorios sin localidad
En la traza de ejemplo LRU saca la 2 y luego la 0, y ambas decisiones son correctas -> iguala a OPT (el ejemplo esta "cocinado")
Los opuestos **MFU** y **MRU** en general (no siempre) funcionan mal porque ignoran la localidad

[22.6]`Ejemplos de workloads`
Workload sin localidad: 100 paginas unicas, 10.000 accesos aleatorios, cache de 1 a 100 paginas
- Todas las politicas realistas (LRU, FIFO, Random) rinden igual; el hit rate lo determina el tamano de la cache
- Cuando la cache es lo bastante grande para todo el workload, todas convergen a 100%
- OPT rinde notablemente mejor
Workload 80-20: 80% de las referencias van al 20% de las paginas (hot)
- Random y FIFO andan razonablemente bien, **LRU mejor** porque retiene las paginas hot
- OPT sigue mejor: la historia no es perfecta
- Un pequeno aumento de hit rate importa mucho si cada miss es muy costoso
Looping sequential: 50 paginas accedidas en secuencia (0 a 49) y se repite, 10.000 accesos
- Es el **peor caso para LRU y FIFO**: sacan justo las paginas mas viejas, que son las que se van a usar primero
- Incluso con una cache de 49 paginas el hit rate es **0%**
- Random rinde mejor (no llega a OPT pero tiene hit rate mayor a 0) y no tiene comportamientos raros en casos limite
- Comun en aplicaciones reales como bases de datos

[22.7]`Implementando algoritmos historicos`
Implementar LRU perfecto exige, en **cada acceso a memoria**, actualizar una estructura para mover la pagina al lado MRU -> puede degradar mucho el rendimiento (FIFO solo toca su lista al agregar o sacar)
- Con ayuda de hardware: actualizar un campo de tiempo por pagina en cada acceso, y al reemplazar escanear todos los campos para encontrar la LRU
- Problema: con muchas paginas (4GB de memoria con paginas de 4KB = 1 millon de paginas) el scan es prohibitivamente caro
*Crux: dado que LRU perfecto es caro, ¿se puede aproximar y obtener un comportamiento parecido?*

[22.8]`Aproximando LRU: el algoritmo del reloj`
Requiere un **use bit** (reference bit) por pagina
- El hardware lo pone en 1 cada vez que se referencia la pagina (lectura o escritura)
- El hardware **nunca** lo pone en 0: eso es responsabilidad del SO
Clock algorithm (Corbato)
1. Las paginas estan en una lista circular; una "aguja" apunta a una pagina
2. Al reemplazar, se mira el use bit de la pagina P a la que apunta la aguja
3. Si es 1 -> P se uso recientemente: se pone en 0 y la aguja avanza a P+1
4. Si es 0 -> se elige como victima
5. En el peor caso se recorre todo el conjunto limpiando todos los bits
- Cualquier metodo que limpie periodicamente los use bits y distinga entre 1 y 0 sirve
- No rinde tanto como LRU perfecto pero es mejor que las politicas que no consideran historia
- Tiene la ventaja de no escanear repetidamente toda la memoria

[22.9]`Considerando paginas dirty`
Una pagina modificada (**dirty**) debe escribirse a disco para poder sacarla, lo cual es caro; una pagina **clean** se puede reutilizar sin I/O
- El hardware incluye un **modified bit (dirty bit)**, seteado cada vez que se escribe la pagina
- El reloj se modifica para buscar primero paginas que no se usaron **y** estan clean; si no hay, paginas sin usar pero dirty, y asi sucesivamente
*Los SO prefieren sacar paginas clean antes que dirty*

[22.10]`Otras politicas de VM`
- **Page selection policy**: cuando traer una pagina a memoria
    - **Demand paging**: se trae la pagina cuando se accede a ella (caso comun)
    - **Prefetching**: se trae antes de tiempo si hay buena probabilidad de uso (ej. si se trae la pagina de codigo P, probablemente se use P+1)
- **Politica de escritura a disco**: en vez de escribir de a una, se juntan varias escrituras pendientes y se hacen de una sola vez -> **clustering / grouping**, eficiente porque el disco hace mejor una escritura grande que muchas chicas

[22.11]`Thrashing`
Cuando la demanda de memoria de los procesos supera la memoria fisica disponible, el sistema esta paginando constantemente
- Estrategias de sistemas viejos: **admission control** -> no correr un subconjunto de procesos para que los **working sets** (paginas usadas activamente) de los restantes entren en memoria (mejor hacer menos trabajo bien que todo mal)
- Enfoque drastico (algunas versiones de Linux): el **out-of-memory killer** elige un proceso que consume mucha memoria y lo mata (puede matar algo critico, como el X server)

[22.12]
- Los sistemas modernos agregan retoques a las aproximaciones de LRU como el reloj; por ejemplo la **scan resistance** de algoritmos como ARC, que evitan el peor caso de LRU (looping sequential)
- Durante muchos anos la importancia de los algoritmos de reemplazo disminuyo, porque paginar a disco era tan caro que la mejor solucion era "comprar mas memoria"
- Los SSD basados en Flash cambiaron esa relacion y llevaron a un renacimiento de estos algoritmos
