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
