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

















