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
