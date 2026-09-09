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

















