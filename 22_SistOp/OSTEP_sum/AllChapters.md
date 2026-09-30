## Introduction to Operating Systems
# Chapter 2

# Key words
- Operating System (OS)
- Virtualization
- Virtual Machine
- Resource Manager
- Physical Resource
- Virtual Resource
- CPU Virtualization
- Memory Virtualization
- Address Space
- Virtual Address Space
- Concurrency
- Persistence
- File System
- I/O (Input/Output)
- System Call
- API (Application Programming Interface)
- Standard Library
- Process
- Thread
- Policy
- Mechanism
- Abstraction
- Protection
- Isolation
- Reliability
- Security

# Conceptos de Hardware
- Processor
- CPU
- Memory
- Physical Memory
- DRAM
- Disk
- SSD
- Device
- Device Driver
- Hardware Support
- Interrupt
- Trap
- User Mode
- Kernel Mode

# Funciones
- malloc()
- open()
- write()
- close()
- pthread_create()
- pthread_join()

# Idea General

`¿Que es un sistema operativo y cual es su funcion dentro de una computadora?`
Un sistema operatico existe principalmente para virtualizar recursos fisicos y hacer que la computadora sea mas facil de utilizar
**Virtualizacion**
- Como transformar la CPU, memoria y distpositivos en recursos virtuales mas faciles de usar
**Concurrencia**
- Como manejar multiples actividades que ocurren simultaneamente
**Persistencia**
- Como almacenar datos de forma permanente

se puede ver al sistema operativo como una capa de software que abstrae el hardware y administra recursos para que los porgramas puedan ejecutarse de forma segura, eficiente y conveniente

# Repaso teorico

[2.0]`¿Que hace un programa?`
El procesador obtiene una isntruccion -> La decodifica -> La ejecuta -> x100..000 veces por segundo
[Esto corresponde al modelo clasico de Von Neumann]
*El usuario no interacta directamente con el hardware, sino mediante el sistema operativo*
[2.0.1]`El sistema operativo como maquina virtual`
El sistema operativo toma recursos fisicos y los convierte en versiones virtuales mas faciles de usar
*El SO puede verse como una maquina virtual*
[2.0.2]`El sistema operativo como administrador de recursos`
Ademas de virtualizar, el SO administra recursos compartidos:
- CPU
- Memotia
- Disco
y debe decidir
- quien usa que recurso
- cuando
- durante cuanto tiempo
*A esto se lo denomina Resource Manager*
[2.1]`Virtualizacion de CPU`
Aunque existe una sola CPU fisica, el SO crea la ilucion de que michos porgramas se ejecutan simultaneamente
ejecutar un proceso -> interrumpirlo -> ejecutar otro -> repetir rapidamente
*El usuario percibe paralelismo aunque exista un solo procesador*
[2.2]`Virtualizacion de la memoria`
Cada proceso cree poseer su propia memoria privada. Incluso cuando dos programas muestran la misma direccion virtualm, realmente estan accediendo a registros fisicos diferentes
*Address Space -> vision privada de memoria que tiene cada proceso*
[2.3]`Concurrencia`
Cuando carias activodades ocurren simultaneamente aparecen nuevos problemas
El ejemplo dle contador muestra que dos hilos incrementando una variable compartida pueden producir resultados incorrectos.
La razon:
    - una operacion aparentemente simple puede requerir varias instrucciones
    - esas instrucciones pueden intervalarsese entre distindtos hilos
*El gran porblema: COmo construir porgrmaas concurrentes correctos?*
[2.4]`Persistencia`
La memoria es volatil, [si se corta la energia los datos desaparecen] , por eso existen dispositivos de persistencia como los discos duros o SSDs. El software que administra todo esto es el *File System*
*El sistema de archivos garantiza almacenamiento permanente, confidencialidad y eficiencia*
[2.5]`Objetivos de dise;o`
Se mencionan varios objetivos:
- Abstraccion: ocultar complekidad y facilitar el usuario
- Rendimiento: minimizar costos de tiempo y espacio
- Proteccion y aislamiento: evitar que un porgrama da;r a otros o al propio SO
- Confiabilidad: mantener el sistema funcionando correctamente
- Seguridad: proteger el sistema contra aplicacions maliciosas
[2.6]`Evolucion historica`
*Primera etapa* OS como bibliotecas de funciones
*Segunda etapa* Aparecen:
- proteccion
- system calls
- user mode
- kernel mode
*Tercera etapa* Multiprogramacion:
- varios programas en memoria
- mejor aprovechamiento de CPU
*UNIX* Introduce muchas ideas modernas y simplifica dise;os anteriores
*Linux y sistemas modernos* Recuperan y extienden los principios clasicos de UNIX

















## The Abstraction: The Process
# Chapter 4

# Key words
- Process
- Program
- CPU Virtualization
- Time Sharing
- Space Sharing
- Machine State
- Address Space
- Registers
- Program Counter (PC)
- Instruction Pointer (IP) = (PC)
- Stack Pointer
- Stack
- Heap
- I/O (Input/Output)
- File Descriptor
- Standard Input
- Standard Output
- Standard Error

# Conceptos de sobre el dise;o del SO
- Mechanism      -> Responde al [como]
- Policy         -> Responde al [cual]
- Policy-Mechanism Separation
- Scheduling
- Scheduler
- Context Switch

[La separacion entre politica y mecanismo es una idea de dise;o importante: el mecanismo responde como se hace, mientras que la politica responde que decision se toma. Esto permite modificar decisiones sin redise;ar toda la maquinaria]

# Operaciones sobre procesos Process API
- Create
- Destroy
- Wait
- Miscellaneous Control
- Status

# Creacion de un procesos
- Process Creation
- Program Loading
- Executable Format
- Static Data
- Eager Loading
- Lazy Loading
- Entry Point
- main()
- argc
- argv
- malloc()
- free()

# Estados del procesos
Los tres estados principales separacion
**Running** el proceso esta ejecutandose en la CPU
**Ready** esta preparando para ejecutrarse, pero no fue elegido todavia
**Blocked** esta esperando algun evento
Transiciones de estado
- Scheduled: Ready -> Running
- Descheduled: Running -> Ready
- I/O initiated: Running -> Blocked
- I/O completed: Blocked -> Ready

# Idea General
El SO transforma programas en porceso y vistualiza la CPU para dar la ilucion de qeu muchos porgramas pueden ejecutarse simultaneamente, administrando el estado de cada uno y decidiendo cual se ejecuta en cada momento
`¿Como proporcionar la ilucion de que existen muchas CPU cuando en realidad existen una o unas pocas CPU fisicas?`
*La respuesta se encuentra en la Vistualizacion de la CPU*
el sistema operativo ejecuta un proceso, lo detiene, guarda su estado y luego puede ejecutar otro. De esta manera, meiante el [tiempo compartido] , muchos porcesos parecen estar ejecutandose simultanemtente

[Programa almacenado -> el SO lo prepara -> se convierte en porceso -> el proceso cambia de estaodo -> el SO guarda su informacion -> comparte la CPU con otros proceso -> el usuario percibe ejecucion inmediata]

# Repaso teorico
[4.0]`¿Que hace un proceso?`
Un proceso es un programa en ejecucion que posee un estado
proceso = estado de memoria + estado de CPU + estado de I/O
- estado de memoria: adrress space del proceso
- estado de CPU: registros
- estado de I/O: archivos abiertos/descriptores de archiovs/info in-Out

















## Interlude: Process API
# Chapter 5

# Key words
- Process
- PID (Process Identifier)
- Parent Process
- Child Process
- Shell
- Fork
- Exec
- Wait
- File Descriptor
- Redirection
- Pipe
- Signal
- User
- Superuser (root)

# Conceptos de Hardware
- CPU (compartida entre procesos mediante el scheduler)
- Kernel Stack (por proceso)
- Registros (guardados/restaurados en cada creación o cambio de proceso)

# Funciones
- fork()
- wait()
- waitpid()
- exec() / execvp()
- open()
- close()
- kill()
- signal()
- pipe()

# Idea General

`¿Como crea y controla el sistema operativo los procesos?`
UNIX ofrece una forma muy particular (y algo extra;a) de crear procesos: la combinacion de dos system calls, fork() y exec(), junto con wait() para esperar a que un proceso termine

*fork()*
- Crea una copia casi identica del proceso que la invoca
*exec()*
- Reemplaza el codigo y la memoria del proceso actual por el de un nuevo programa
*wait()*
- Permite a un proceso padre esperar a que su hijo termine su ejecucion

La separacion entre fork() y exec() no es casualidad: permite que el shell modifique el entorno del proceso hijo (redirecciones, pipes, etc) despues de crearlo pero antes de que ejecute el nuevo programa

# Repaso teorico

[5.1]`El system call fork()`
fork() crea un nuevo proceso (el hijo) que es una copia casi exacta del proceso que lo llamo (el padre)
- El padre recibe como retorno el PID del hijo
- El hijo recibe como retorno el valor 0
- Si fork() falla, retorna un valor negativo
*El orden de ejecucion entre padre e hijo despues del fork() no esta determinado: depende del scheduler*

[5.2]`El system call wait()`
Permite que el proceso padre se bloquee hasta que el hijo termine su ejecucion
- Sin wait(), el orden de impresion de mensajes entre padre e hijo es no determinista
- Con wait(), se garantiza que el hijo termine antes de que el padre continue
*wait() (o su variante mas completa waitpid()) introduce determinismo en la ejecucion*

[5.3]`El system call exec()`
Se utiliza quando se quiere correr un programa distinto al que esta corriendo actualmente
- No crea un nuevo proceso, transforma al proceso actual en uno nuevo
- Carga el codigo y los datos estaticos del nuevo programa, reinicializa heap, stack, etc
- Si exec() tiene exito, nunca retorna al codigo que lo llamo
*execvp() es una de las variantes; recibe el nombre del programa y sus argumentos*

[5.4]`Por que separar fork() y exec()?`
Esta separacion es lo que permite construir un shell de UNIX
- El shell hace fork() para crear un hijo
- Antes de hacer exec(), el hijo puede modificar su entorno (por ejemplo, redirigir su salida estandar a un archivo)
- Luego el hijo hace exec() para correr el programa pedido
*Esto habilita funcionalidades como la redireccion (>) y los pipes (|), sin tener que modificar los programas que se ejecutan*

[5.5]`Redireccion y pipes`
La redireccion (ej: wc archivo.c > salida.txt) se logra cerrando el descriptor de salida estandar y abriendo el archivo destino antes del exec()
- UNIX busca descriptores libres empezando desde el 0
*Los pipes (con el system call pipe()) conectan la salida de un proceso con la entrada de otro, permitiendo encadenar comandos (ej: grep foo archivo | wc -l)*

[5.6]`Control de procesos y usuarios`
- El system call kill() permite enviar se;ales a un proceso (parar, terminar, etc)
- signal() permite que un proceso capture y maneje se;ales de forma personalizada
- Cada proceso pertenece a un usuario, y en general un usuario solo puede controlar sus propios procesos
*El superusuario (root) puede controlar los procesos de cualquier usuario y ejecutar comandos privilegiados como shutdown*

[5.7]`Herramientas utiles`
- ps: muestra los procesos en ejecucion
- top: muestra el consumo de CPU y recursos de los procesos
- kill / killall: envian se;ales a procesos para terminarlos o controlarlos
## Mechanism: Limited Direct Execution
# Chapter 6

# Key words
- Virtualizacion de CPU
- Limited Direct Execution (LDE)
- User Mode
- Kernel Mode
- System Call
- Trap
- Trap Table
- Trap Handler
- Return-from-trap
- Timer Interrupt
- Context Switch
- Scheduler
- Cooperative Scheduling
- Non-Cooperative Scheduling

# Conceptos de Hardware
- Procesador (modos de ejecucion: user / kernel)
- Registros generales
- Program Counter (PC)
- Kernel Stack
- Timer Device

# Funciones
- exit()
- swtch() (context switch, en xv6)

# Idea General

`¿Como se virtualiza la CPU de manera eficiente sin perder el control del sistema?`
La tecnica central es la ejecucion directa limitada (Limited Direct Execution)

*Direct Execution*
- Correr el programa directamente sobre el CPU, sin intervencion, para lograr velocidad
*Limited*
- Restringir lo que el programa puede hacer, para que el SO mantenga el control

Se deben resolver dos problemas: como restringir operaciones peligrosas (proteccion), y como recuperar el control del CPU cuando sea necesario (para poder cambiar de proceso)

# Repaso teorico

[6.1]`Ejecucion directa basica`
El SO carga el programa en memoria, prepara el stack, limpia registros, y salta a main()
*Sin limites, este esquema es rapido pero inseguro: el proceso podria hacer lo que quisiera*

[6.2]`Problema 1: Operaciones restringidas`
No se puede dejar que cualquier proceso haga I/O o acceda a recursos libremente
- Se introduce el modo usuario (restringido) y el modo kernel (sin restricciones)
- Para pedir servicios privilegiados, el proceso ejecuta un system call, que dispara una instruccion trap
- El trap salta a un lugar predefinido del kernel (el trap handler) y eleva el privilegio a modo kernel
- Al terminar, se ejecuta un return-from-trap que vuelve a modo usuario
*El kernel configura, al bootear, una trap table que le indica al hardware que codigo ejecutar ante cada tipo de evento (system call, interrupcion, etc)*
*El numero de system call (no una direccion) es lo que el proceso especifica, como forma de proteccion*

[6.3.1]`Problema 2: Cambiar entre procesos`
Si un proceso esta corriendo, el SO no esta corriendo; por lo tanto el SO necesita una forma de recuperar el control
[Enfoque cooperativo]
- El SO confia en que los procesos cedan el CPU voluntariamente (mediante system calls o al hacer algo ilegal)
- Problema: un proceso con un loop infinito puede monopolizar el CPU (unica solucion: reiniciar la maquina)
[Enfoque no cooperativo]
- Se usa un timer interrupt: el hardware genera una interrupcion cada cierto tiempo
- Esto le devuelve el control al SO sin importar si el proceso coopera o no
*El timer interrupt es fundamental para que el SO mantenga el control del sistema*

[6.3.2]`Guardar y restaurar contexto (context switch)`
Cuando el SO decide cambiar de proceso, ejecuta un context switch
- Guarda los registros del proceso actual (en su kernel stack o en su estructura de proceso)
- Restaura los registros del proximo proceso a ejecutar
- Cambia el stack pointer al kernel stack del nuevo proceso
*Hay dos tipos de guardado de registros: el implicito (hecho por el hardware al interrumpir) y el explicito (hecho por el SO al hacer el switch entre procesos)*

[6.4]`Concurrencia durante el manejo de interrupciones`
Puede ocurrir una interrupcion mientras se maneja otra, o durante un system call
- Una solucion simple: deshabilitar interrupciones mientras se procesa una interrupcion
- Tambien se usan esquemas de locking para proteger estructuras internas del kernel
*Este tema se profundiza en la seccion de concurrencia del libro*

[6.5]`Resumen`
La ejecucion directa limitada permite correr procesos de forma rapida (ejecucion directa) sin perder el control (limites impuestos por hardware y SO)
- Modo usuario / modo kernel
- System calls mediante trap y return-from-trap
- Timer interrupt para recuperar el control sin cooperacion
- Context switch para cambiar entre procesos
## Scheduling: Introduction
# Chapter 7

# Key words
- Scheduling
- Workload
- Turnaround Time
- Response Time
- FIFO / FCFS
- Convoy Effect
- SJF (Shortest Job First)
- STCF (Shortest Time-to-Completion First)
- Preemption
- Round Robin
- Time Slice (Quantum)
- Fairness
- Overlap

# Conceptos de Hardware
- CPU (recurso a repartir entre jobs)
- Timer Interrupt (habilita la preemption)

# Idea General

`¿Como decide el SO que proceso ejecutar en cada momento?`
Se estudian distintas politicas (disciplinas) de scheduling, partiendo de supuestos simplificados sobre los jobs que se van relajando a lo largo del capitulo

[Supuestos iniciales del workload]
- Todos los jobs duran lo mismo
- Todos llegan al mismo tiempo
- Corren hasta terminar (no preemption)
- Solo usan CPU (no hacen I/O)
- Se conoce de antemano cuanto va a durar cada uno

[Metricas]
- Turnaround Time: tiempo de finalizacion menos tiempo de llegada
- Response Time: tiempo desde que el job llega hasta que se ejecuta por primera vez
*Rendimiento (turnaround) y capacidad de respuesta (response time) suelen estar en tension*

# Repaso teorico

[7.3]`FIFO / FCFS`
El algoritmo mas simple: se ejecutan los jobs en el orden en que llegaron
- Funciona bien si todos los jobs duran lo mismo
- Si un job largo llega antes que varios cortos, se produce el convoy effect: los jobs cortos quedan esperando detras del largo
*Facil de implementar, pero vulnerable a jobs de distinta duracion*

[7.4]`SJF (Shortest Job First)`
Se relaja el supuesto de que todos los jobs duran igual: se ejecuta primero el job mas corto
- Mejora mucho el turnaround time promedio frente a FIFO cuando hay jobs de distinta duracion
- Sigue siendo no preemptivo: si un job largo ya empezo, los cortos que llegan despues deben esperar
*SJF es optimo en turnaround time si todos los jobs llegan al mismo tiempo*

[7.5]`STCF / PSJF (Shortest Time-to-Completion First)`
Se relaja el supuesto de que los jobs llegan todos juntos y de que corren hasta el final
- Es una version preemptiva de SJF: si llega un job mas corto, se interrumpe el que esta corriendo
- Resuelve el problema de los jobs cortos que llegan tarde y quedan atrapados detras de uno largo
*STCF es optimo en turnaround time bajo estos supuestos, pero no considera el response time*

[7.6]`Response Time y Round Robin`
STCF es malo para response time: un job puede esperar mucho antes de correr por primera vez
- Round Robin (RR) ejecuta cada job por un time slice (quantum) y pasa al siguiente, repitiendo el ciclo
- RR mejora mucho el response time, pero empeora el turnaround time (a veces peor que FIFO)
*Existe un trade-off inherente: optimizar response time (RR) empeora turnaround, y viceversa (SJF/STCF)*
*El tama;o del time slice es clave: muy corto mejora response time pero aumenta el costo de context switching (se soluciona parcialmente con amortizacion)*

[7.8]`Incorporando I/O`
Se relaja el supuesto de que los jobs no hacen I/O
- Cuando un job hace I/O, queda bloqueado y el CPU deberia usarse para otro job mientras tanto
- Una practica comun es tratar cada rafaga de CPU (entre I/Os) como un "sub-job" independiente
*Esto permite superponer (overlap) computo de un proceso con I/O de otro, mejorando la utilizacion del sistema*

[7.9]`El problema de no conocer la duracion de los jobs`
El ultimo supuesto a relajar es el mas dificil: en la practica el SO no sabe cuanto va a durar un job
*Esto motiva el desarrollo de la Multi-Level Feedback Queue (MLFQ), tema del proximo capitulo*
## Scheduling: The Multi-Level Feedback Queue
# Chapter 8

# Key words
- MLFQ (Multi-Level Feedback Queue)
- Queue / Priority Level
- Allotment
- Priority Boost
- Starvation
- Gaming the Scheduler
- Round Robin (dentro de cada cola)
- Voo-doo Constant
- nice (advice al scheduler)

# Conceptos de Hardware
- Timer Interrupt (permite la preemption entre colas)

# Idea General

`¿Como construir un scheduler que optimice turnaround y response time sin conocer de antemano la duracion de los jobs?`
MLFQ resuelve esto observando el comportamiento pasado de los procesos para predecir su comportamiento futuro

[Multiples colas]
- Cada una con una prioridad distinta
[Feedback]
- La prioridad de un job cambia segun como se comporta (si usa mucho CPU baja de prioridad, si cede el CPU seguido se mantiene alta)

De esta forma, MLFQ intenta aproximarse a SJF (bueno para turnaround) sin conocer la duracion de los jobs, y ademas favorece a los procesos interactivos (bueno para response time)

# Repaso teorico

[8.1]`Reglas basicas`
- Regla 1: si Prioridad(A) > Prioridad(B), corre A
- Regla 2: si Prioridad(A) = Prioridad(B), A y B corren en Round Robin
*Un job de mayor prioridad (cola mas alta) siempre corre antes que uno de menor prioridad*

[8.2.1]`Primer intento: como cambiar la prioridad`
Se introduce el concepto de allotment: cuanto tiempo puede pasar un job en un nivel antes de bajar de prioridad
- Regla 3: un job nuevo entra siempre en la cola de mayor prioridad
- Regla 4a: si un job usa todo su allotment corriendo, baja de prioridad
- Regla 4b: si un job cede el CPU antes de agotar su allotment (por ejemplo, por I/O), se mantiene en el mismo nivel
*Un job largo va bajando de a poco hasta la cola mas baja; un job corto/interactivo puede terminar sin bajar mucho, aproximando asi a SJF*

[8.2.2]`Problemas del primer intento`
- Starvation: si hay demasiados jobs interactivos, los jobs largos pueden no recibir CPU nunca
- Gaming the scheduler: un proceso puede hacer I/O justo antes de agotar su allotment para mantenerse siempre en alta prioridad y acaparar el CPU
- Cambios de comportamiento: un job que pasa de CPU-bound a interactivo queda "atrapado" en baja prioridad
*Estos tres problemas motivan las reglas siguientes*

[8.3]`Segundo intento: priority boost`
- Regla 5: cada cierto periodo S, todos los jobs vuelven a la cola de mayor prioridad
*Esto evita la starvation (los jobs largos eventualmente corren) y permite que un job que cambio su comportamiento sea tratado de nuevo como interactivo*
*El valor de S es un voo-doo constant: si es muy alto puede haber starvation, si es muy bajo los jobs interactivos no reciben su parte justa*

[8.4]`Tercer intento: mejor contabilidad`
- Regla 4 (reemplaza a 4a y 4b): una vez que un job usa su allotment completo en un nivel (sin importar cuantas veces cedio el CPU), baja de prioridad
*Esto evita el gaming del scheduler, ya que ahora importa el tiempo total usado en el nivel, no la cantidad de veces que se cedio el CPU*

[8.5]`Ajuste (tuning) de MLFQ`
- Cantidad de colas, duracion del time slice por cola, duracion del allotment y frecuencia del priority boost son parametros a ajustar
- Las colas de alta prioridad suelen tener time slices cortos (jobs interactivos); las de baja prioridad, time slices largos (jobs CPU-bound)
- Algunos sistemas (Solaris) usan tablas de configuracion; otros (FreeBSD) usan formulas matematicas
- nice permite que el usuario de una pista (advice) al scheduler sobre la prioridad deseada de un proceso
*No hay una unica configuracion correcta: depende del workload y requiere experiencia y ajuste*

[8.6]`Resumen de reglas finales`
- Regla 1: Prioridad(A) > Prioridad(B) -> corre A
- Regla 2: Prioridad(A) = Prioridad(B) -> Round Robin
- Regla 3: job nuevo entra en la cola mas alta
- Regla 4: al agotar el allotment en un nivel, baja de prioridad
- Regla 5: cada periodo S, todos los jobs vuelven a la cola mas alta
*MLFQ es usado (en variantes) por BSD UNIX, Solaris y Windows NT y sucesores*
## Scheduling: Proportional Share
# Chapter 9

# Key words
- Proportional-Share Scheduling (Fair-Share)
- Lottery Scheduling
- Ticket
- Ticket Currency
- Ticket Transfer
- Ticket Inflation
- Stride Scheduling
- Stride / Pass Value
- CFS (Completely Fair Scheduler)
- vruntime
- sched_latency
- min_granularity
- nice (en CFS)
- Red-Black Tree
- EEVDF

# Conceptos de Hardware
- Timer Interrupt (usado por CFS para chequeos periodicos)

# Funciones
- getrandom() (usada conceptualmente en lottery scheduling)

# Idea General

`¿Como repartir el CPU en proporciones especificas entre los procesos, en vez de optimizar turnaround o response time?`
Se estudian tres enfoques de scheduling proporcional (fair-share)

[Lottery Scheduling]
- Usa aleatoriedad: cada proceso tiene tickets, y se sortea cual corre
[Stride Scheduling]
- Version deterministica: cada proceso avanza segun su stride (inverso a sus tickets)
[CFS (Completely Fair Scheduler)]
- El scheduler proporcional realmente usado en Linux durante muchos anios, basado en vruntime

# Repaso teorico

[9.1]`Tickets`
Los tickets representan la proporcion de CPU que deberia recibir un proceso
- Si A tiene 75 tickets y B 25 (de un total de 100), A deberia recibir 75% del CPU y B el 25%
*El sorteo se hace cada cierto tiempo, eligiendo un numero al azar entre los tickets totales*

[9.2]`Mecanismos de tickets`
- Ticket Currency: un usuario puede repartir sus tickets entre sus propios jobs en su propia "moneda", que luego se convierte a moneda global
- Ticket Transfer: un proceso puede transferir temporalmente sus tickets a otro (util en escenarios cliente/servidor)
- Ticket Inflation: un proceso puede aumentar o disminuir temporalmente sus propios tickets (solo tiene sentido entre procesos que confian entre si)

[9.3]`Implementacion de lottery scheduling`
Se mantiene una lista de procesos con sus tickets; se sortea un numero y se recorre la lista sumando tickets hasta superar ese numero
*Es simple de implementar, solo requiere un buen generador de numeros aleatorios*
*La aleatoriedad da correccion probabilistica, no exacta: con jobs cortos la equidad (fairness) puede ser baja, mejora cuanto mas tiempo compiten los jobs*

[9.5]`Asignacion de tickets`
El problema de como asignar tickets a cada job queda abierto
*Una alternativa es confiar en que cada usuario reparta sus propios tickets, pero esto no resuelve el problema de fondo*

[9.6]`Stride Scheduling`
Alternativa deterministica a lottery scheduling
- Cada proceso tiene un stride, inversamente proporcional a sus tickets
- Se mantiene un pass value por proceso, que se incrementa en su stride cada vez que corre
- Siempre corre el proceso con menor pass value
*Logra las proporciones exactas (no probabilisticas), pero requiere estado global: agregar un proceso nuevo (con que pass value arranca?) es dificil*
*Lottery scheduling no tiene este problema porque no requiere estado global por proceso*

[9.7.1]`CFS: operacion basica`
CFS reparte el CPU de forma equitativa usando vruntime (tiempo de ejecucion virtual acumulado)
- Siempre se elige para correr el proceso con menor vruntime
- sched_latency determina, dividido por la cantidad de procesos, el time slice de cada uno
- min_granularity evita que el time slice sea demasiado chico cuando hay muchos procesos
*CFS no usa un time slice fijo como RR, sino uno dinamico basado en sched_latency y la cantidad de procesos activos*

[9.7.2]`CFS: prioridades (nice)`
CFS permite dar mas o menos CPU a un proceso mediante el valor nice (-20 a +19, default 0)
- Valores negativos: mayor prioridad (mas peso); valores positivos: menor prioridad
- El peso de cada proceso se usa tanto para calcular su time slice como la velocidad a la que crece su vruntime
*Un proceso con mas peso acumula vruntime mas lento, por lo que puede correr mas tiempo antes de ser reemplazado*

[9.7.3]`CFS: estructura de datos`
Los procesos activos se guardan en un red-black tree, ordenados por vruntime
- Insertar, borrar y buscar el minimo son operaciones O(log n)
- Los procesos dormidos (bloqueados por I/O) no estan en el arbol
*Al despertar, un proceso dormido recibe el vruntime minimo del arbol, para evitar que monopolice el CPU pero tambien para evitar starvation*

[9.8]`Resumen y evolucion`
- Lottery: aleatorio, simple, sin estado global, aproximado
- Stride: deterministico, exacto, requiere estado global
- CFS: eficiente y escalable, el mas usado en la practica durante muchos anios
*Desde Linux 6.6, el scheduler por defecto paso a ser EEVDF (Earliest Eligible Virtual Deadline First), otro enfoque de scheduling proporcional*
*Los schedulers proporcionales no manejan muy bien el I/O y dejan abierto el problema de como asignar tickets/prioridades; por eso otros schedulers (como MLFQ) siguen siendo utiles*
## The Abstraction: Address Spaces
# Chapter 13

# Key words
- Address Space
- Virtual Address
- Physical Address
- Virtual Address Space
- Physical Memory
- Multiprogramming
- Time Sharing
- Process
- Code Segment
- Heap Segment
- Stack Segment
- Transparency
- Efficiency
- Protection
- Isolation
- Virtualizacion de la Memoria

# Conceptos de Hardware
- Physical Memory
- Disk
- Register

# Idea General

`¿Como logra el sistema operativo darle a cada programa la ilusion de tener su propia memoria privada?`
El sistema operativo crea una abstraccion llamada *Address Space*, que es la vision que tiene un programa en ejecucion de la memoria del sistema. Detras de esta ilusion, el SO (con ayuda del hardware) traduce las direcciones virtuales que genera el programa en direcciones fisicas reales, multiplexando la memoria fisica entre varios procesos al mismo tiempo.

# Repaso teorico

[13.1]`Los primeros sistemas`
En las primeras computadoras no existia una verdadera abstraccion de memoria
- El SO era una biblioteca de rutinas ubicada al comienzo de la memoria fisica (por ejemplo, desde la direccion 0)
- Un unico proceso ocupaba el resto de la memoria fisica
*No habia ilusion alguna: el usuario veia la memoria fisica tal cual era*

[13.2]`Multiprogramacion y Time Sharing`
Con el tiempo, las maquinas eran costosas y se busco compartirlas de forma mas eficiente
- *Multiprogramacion*: varios procesos listos para ejecutar, el SO cambia entre ellos (por ejemplo cuando uno hace I/O), aumentando el aprovechamiento de la CPU
- *Time Sharing*: fue un paso mas alla, permitiendo que muchos usuarios interactuaran con la maquina al mismo tiempo, esperando respuestas rapidas
Una primera forma de implementar time sharing era correr un proceso, guardar todo su estado (incluida toda la memoria) en disco, cargar el de otro proceso, y repetir
- *Problema*: guardar toda la memoria en disco es demasiado lento
La solucion fue dejar los procesos en memoria mientras se cambia entre ellos, lo cual exige resolver el problema de la *proteccion*: evitar que un proceso lea o escriba la memoria de otro

[13.3]`El Address Space`
Se define el *Address Space* como la vision que tiene un programa en ejecucion de la memoria del sistema
Contiene todo el estado de memoria del programa:
- *Code*: las instrucciones del programa (parte estatica, tamaño fijo, no crece)
- *Stack*: lleva registro de en que punto de la cadena de llamadas a funciones esta el programa; alli se guardan variables locales, parametros y valores de retorno
- *Heap*: memoria dinamica administrada por el usuario (la que se obtiene con malloc() en C o new en lenguajes orientados a objetos)
Convencionalmente, el codigo se ubica al principio del address space, el heap justo despues (creciendo hacia abajo) y el stack al final (creciendo hacia arriba), dejando espacio libre entre ambos para que puedan crecer
*Importante: el programa no esta realmente en las direcciones 0 a N; esas direcciones son virtuales y el SO decide en que parte de la memoria fisica se cargan realmente*

`EL CRUX: COMO VIRTUALIZAR LA MEMORIA`
¿Como puede el SO construir esta abstraccion de un address space privado y potencialmente grande para multiples procesos en ejecucion, todos compartiendo una unica memoria fisica?
Cuando el SO hace esto decimos que esta *virtualizando la memoria*: el programa cree estar cargado en una direccion particular (por ejemplo 0) y tener un espacio de direcciones grande, pero la realidad fisica es completamente distinta.

[13.4]`Objetivos de la Virtualizacion de Memoria (VM)`
- *Transparencia*: el SO debe implementar la memoria virtual de forma invisible para el programa; el programa se comporta como si tuviera su propia memoria fisica privada
- *Eficiencia*: la virtualizacion debe ser eficiente tanto en tiempo (no hacer mas lentos a los programas) como en espacio (no gastar demasiada memoria en estructuras de soporte); para lograrlo se necesita soporte de hardware (por ejemplo TLBs)
- *Proteccion*: el SO debe asegurar que ningun proceso pueda acceder o afectar la memoria de otro proceso ni la del propio SO

*Principio de Aislamiento (Isolation)*
- Si dos entidades estan correctamente aisladas, una puede fallar sin afectar a la otra
- El SO aisla los procesos entre si y protege al propio SO de los procesos
- Algunos SO modernos (microkernels) llevan el aislamiento mas alla, separando incluso partes del SO entre si

[13.5]`Resumen`
Se introduce la memoria virtual como una de las abstracciones principales del SO
- El address space contiene todas las instrucciones y datos de un programa, referenciados mediante direcciones virtuales
- El SO, con ayuda del hardware, traduce esas direcciones virtuales en direcciones fisicas reales
- Esto se hace para muchos procesos a la vez, protegiendolos entre si y protegiendo al SO
*Toda direccion que un programa de usuario puede ver (por ejemplo, al imprimir un puntero) es una direccion virtual; solo el SO y el hardware conocen la verdadera ubicacion fisica*
## Interlude: Memory API
# Chapter 14

# Key words
- Memory API
- Stack Memory
- Automatic Memory
- Heap Memory
- Buffer Overflow
- Uninitialized Read
- Memory Leak
- Dangling Pointer
- Double Free
- Garbage Collector
- Library Call
- System Call
- Break (Program Break)
- Anonymous Memory Region

# Funciones
- malloc()
- free()
- calloc()
- realloc()
- sizeof()
- strcpy()
- strdup()
- brk()
- sbrk()
- mmap()

# Idea General

`¿Como se administra la memoria en un programa C/UNIX, y que errores comunes hay que evitar?`
UNIX ofrece interfaces simples para pedir y liberar memoria dinamica. Aunque simples, su uso incorrecto es una fuente enorme de errores (segmentation faults, leaks, corrupcion de memoria). Entender bien malloc() y free(), y las herramientas para depurarlos (gdb, valgrind), es fundamental para escribir software robusto.

# Repaso teorico

[14.1]`Tipos de Memoria`
En un programa en C existen dos tipos de memoria
- *Stack Memory (automatica)*: el compilador la administra por vos; se reserva al entrar a una funcion y se libera al salir

void func() {
    int x; // se declara en el stack
}

- *Heap Memory*: vos administras explicitamente su reserva y liberacion; util para datos que deben vivir mas alla de la invocacion de una funcion

void func() {
    int *x = (int *) malloc(sizeof(int));
}

*Nota*: en la linea de malloc, ocurren dos reservas: el puntero x se reserva en el stack, y el entero al que apunta se reserva en el heap

[14.2]`La llamada malloc()`

#include <stdlib.h>
void *malloc(size_t size);

- Devuelve un puntero a la memoria reservada (exito) o NULL (fallo)
- El parametro size_t indica la cantidad de bytes solicitados
- Se recomienda usar sizeof() para calcular el tamaño correctamente:

double *d = (double *) malloc(sizeof(double));

- *Cuidado con sizeof() sobre punteros*: `sizeof(x)` sobre un puntero devuelve el tamaño del puntero (4u 8 bytes), no el tamaño reservado
- *Cuidado con strings*: usar `malloc(strlen(s) + 1)` para dejar lugar al caracter de fin de cadena

[14.3]`La llamada free()`

int *x = malloc(10 * sizeof(int));
free(x);

- Recibe unicamente el puntero devuelto por malloc()
- El tamaño de la region no se pasa como parametro: la biblioteca de asignacion de memoria debe rastrearlo internamente

[14.4]`Errores comunes`
- *Olvidar reservar memoria*: usar un puntero sin inicializar (ej. strcpy a un puntero no asignado) provoca segmentation fault
- *No reservar suficiente memoria (buffer overflow)*: reservar menos espacio del necesario; puede funcionar "por suerte" o causar fallas de seguridad graves
- *Olvidar inicializar la memoria reservada*: lleva a lecturas de valores indefinidos (uninitialized read)
- *Olvidar liberar memoria (memory leak)*: en programas de larga duracion (como el propio SO) esto lleva a agotar la memoria disponible
  - *Aside*: en programas de corta duracion, cuando el proceso termina el SO recupera toda su memoria automaticamente, por lo que un leak no siempre es catastrofico, aunque sigue siendo mala practica
- *Liberar memoria antes de tiempo (dangling pointer)*: usar memoria ya liberada puede provocar crashes o corromper datos
- *Liberar memoria repetidamente (double free)*: comportamiento indefinido, suele causar crashes
- *Llamar a free() incorrectamente*: pasarle un puntero que no proviene de malloc() es peligroso

*Herramientas para encontrar estos errores*: gdb (debugger) y valgrind (detector de errores de memoria)

[14.5]`Soporte del sistema operativo`
- malloc() y free() **no son system calls**, son *library calls*: la biblioteca de malloc administra el espacio dentro del address space virtual del proceso
- **brk()**: cambia la ubicacion del "break" (el final del heap); recibe la nueva direccion del break
- **sbrk()**: similar, pero recibe un incremento
- *Nunca deben llamarse directamente*: son usadas internamente por la biblioteca de malloc
- **mmap()**: permite obtener memoria del SO creando una region anonima (no asociada a ningun archivo), que puede tratarse tambien como heap

[14.6]`Otras llamadas`
- **calloc()**: reserva memoria y ademas la inicializa en cero
- **realloc()**: agranda una region ya reservada, copiando el contenido anterior a la nueva region mas grande y devolviendo el nuevo puntero

[14.7]`Resumen`
Se presentaron las interfaces basicas de administracion de memoria en UNIX/C
*Asignar memoria es la parte facil; saber cuando, como e incluso si liberarla es la parte dificil*
## Mechanism: Address Translation
# Chapter 15

# Key words
- Address Translation
- Limited Direct Execution (LDE)
- Hardware-based Address Translation
- Base Register
- Bounds Register (Limit Register)
- Dynamic Relocation
- Static Relocation
- Memory Management Unit (MMU)
- Free List
- Process Control Block (PCB)
- Internal Fragmentation
- Exception / Trap
- Privileged Mode / Kernel Mode
- User Mode

# Conceptos de Hardware
- CPU
- Registro Base
- Registro de Limite (Bounds)
- MMU

# Idea General

`¿Como logra el hardware traducir eficientemente cada direccion virtual generada por un proceso en una direccion fisica, manteniendo control y proteccion?`
La tecnica se llama *address translation*: en cada acceso a memoria (fetch de instruccion, load o store), el hardware transforma la direccion virtual en una direccion fisica. El SO configura el hardware (registros base y bounds) para que esta traduccion sea correcta y seguir manteniendo el control sobre el uso de la memoria.

# Repaso teorico

[15.1]`Suposiciones iniciales`
Para simplificar el primer analisis se asume que
- El address space de cada proceso se ubica de forma contigua en memoria fisica
- El address space es mas chico que la memoria fisica
- Todos los address spaces tienen el mismo tamaño

[15.2]`Ejemplo introductorio`
Se analiza una secuencia de codigo que carga un valor de memoria, le suma 3, y lo vuelve a guardar

128: movl 0x0(%ebx), %eax   ; carga el valor en la direccion apuntada por ebx
132: addl $0x03, %eax       ; suma 3
135: movl %eax, 0x0(%ebx)   ; guarda el resultado

El programa "cree" que su address space empieza en 0, pero el SO en realidad lo ubica en otra parte de la memoria fisica (por ejemplo, a partir de 32KB)
*El problema: como reubicar el proceso de forma transparente para el mismo*

[15.3]`Reubicacion dinamica basada en hardware (Base y Bounds)`
Se necesitan dos registros de hardware por CPU:
- **Base register**: direccion fisica donde comienza el address space del proceso
- **Bounds (limit) register**: tamaño del address space (o la direccion fisica final, segun la convencion)

**Formula de traduccion:**

physical address = virtual address + base

El hardware primero revisa que la direccion virtual este dentro de los limites (bounds); si no lo esta, se genera una excepcion y el proceso es terminado
*A esta tecnica se la llama dynamic relocation, porque la reubicacion ocurre en tiempo de ejecucion*

**Ejemplo de traducciones** (address space de 4KB cargado en la direccion fisica 16KB):

| Virtual Address | Physical Address     |
|------------------|----------------------|
| 0                | 16 KB                |
| 1 KB             | 17 KB                |
| 3000             | 19384                |
| 4400             | Fault (fuera de rango)|

*Aside: Software-based relocation*
Antes del soporte de hardware, algunos sistemas usaban *static relocation*: un loader reescribia las direcciones del ejecutable al momento de cargarlo
- No ofrece proteccion real (un proceso podria generar direcciones invalidas)
- Es dificil reubicar el proceso una vez cargado

[15.4]`Soporte de hardware necesario (resumen)`
- Dos modos de CPU: *user mode* y *kernel (privileged) mode*
- Registros base y bounds (parte de la MMU)
- Circuito para traducir direcciones y verificar limites
- Instrucciones privilegiadas para modificar base y bounds
- Instrucciones privilegiadas para registrar manejadores de excepciones
- Capacidad de generar excepciones ante accesos ilegales

[15.5]`Responsabilidades del sistema operativo`
- *Gestion de memoria*: al crear un proceso, buscar espacio libre (usando una *free list*) y marcarlo como usado; al terminar el proceso, devolver ese espacio a la free list
- *Gestion de base y bounds*: al hacer un *context switch*, el SO debe guardar los valores de base/bounds del proceso saliente (en su PCB) y restaurar los del proceso entrante
- *Manejo de excepciones*: el SO instala manejadores en el arranque; cuando un proceso hace un acceso fuera de rango, el SO tipicamente lo termina
- Es posible mover el address space de un proceso detenido de un lugar a otro de la memoria fisica, simplemente copiando los datos y actualizando el registro base guardado

[15.6]`Resumen`
Se extiende la idea de *limited direct execution* con el mecanismo de *address translation*
- Gracias al hardware, el SO puede controlar cada acceso a memoria de un proceso, asegurando que se mantenga dentro de los limites de su address space
- El esquema de base y bounds (o dynamic relocation) es eficiente y ofrece proteccion, pero tiene un problema: *internal fragmentation*
- El espacio entre el stack y el heap dentro del slot asignado queda desperdiciado, aunque no se use
*Este problema motiva el proximo mecanismo: la segmentacion*
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
Las traducciones del TLB solo son validas para el proceso que las genero. Si no se hace nada, un proceso podria usar por error traducciones de otro proceso (mismo VPN, distintols )
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
