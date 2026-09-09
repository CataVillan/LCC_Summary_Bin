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
