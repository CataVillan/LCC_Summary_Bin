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
