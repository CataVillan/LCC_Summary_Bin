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
