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
