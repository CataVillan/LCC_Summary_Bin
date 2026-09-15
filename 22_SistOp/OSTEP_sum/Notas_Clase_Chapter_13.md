## The Abstraction: Addres Space
# Chapter 13

# Key words
- Multiprogramming
- TSS time share system (time sharing)
- Relocalizable
- Fragmentacion extrema
- Isolation
- Transparency
- Politica
- Mecanismo
- Segmentacion


antes, esta era la distribucion de la memoria
0____________
|    OS     |
-------------
|           |
_____________<-- 0xFA84(ej)
|    prg1   |   Se programaba en absoluto y
-------------   en codigo maquina
|           |---> Initial Orders
_____________               |---> Automatic prog (compilar)
|    prd2   |
-------------
|           |
Max----------

`¿Que necesito?`
- Seguridad
- Relocalizacion
- Performance

-En este momento, no existia la *multiprogramming*
-Se crea TSS time share
        `|-->` comienzas a existir problemas de seguridad
los programas estaban armados segun su direccion de memoria, si se mezclaban y cambiaban las direcciones de memoria se generaban problemas (los programas no eran relocalizables)
-Si los programas [no] son [relocalizables], y yo quiero que los programas solo vayan a los espacios vacios <-- IMPOSIBLE
        `|-->` se necesitan tablas de relocalizacion
-En [multiprogramming] los programas deben ser coperativos
        `|-->` un acuerdo de que todos los programas funcionan
        bien y no salen de su espacio de memoria
-Para contemplar los casos de programas que funcionan mal, se solia tomar una desicion de dise;o con Bare Metal
-El software no puede garantizar que los programas no se pisen
    [los programas estan bien, el problema es el compilador]

0KB----------       0KB----------
|   code    |       |   code    |  *brk()* ampliaba la memoria
-------------       -------------   para abajo del stack
|    heap   |       |    stack  | pero el heap no estaba ahi
-------------       -------------   y nada accedia a esa mem
|           |       |    heap   |
|           | --->  -----------*brk()* ahora stack esta limitado
|           |       |           |   pero el heap tiene todo el
-------------       |           |   espacio que tiene
|    stack  |       |           |
nKB---------*brk()* nKB---------

*Memoria normal*
m[1]
*Memoria virtual*
m[v(1)]

`El SO debe ser`
- Eficiente
- Transparency
- Seguro
- Insolado

# Notas de clase

[tiempo de funcionamiendo correcto]
antes las pc tenian un 30% de tiempo de falla (no anda) la tasa de andar era del 70% del tiempo (correr programas decentemente)
*compus de n nueves*
99% -> anda el 99% del tiempo
99.9999% -> anda casi todo el tiempo

[z1/2/3] compus alemanas de la Alemania nazi (primeras compus)

un procesador solo de por si no es una pc, necesita tener RAM

malloc() y free() [no] son system calls, son library calls, existe brk() que amplia el techo de memoria de los programas (amlia el espacio de memoria)

Los programas actuales no suelen ser recursivos ya que el stack esta limitado [ULIMIT -s] define el limite del stack

Agrega dos registros, [base] y [limit]
Ahora a toda direc que emita el programa cuando corre, se le va a sumar la base. Eso lleva el programa de memoria virtual a fisica

Con este regsstro base puedo relocalizar el programa, solucionando el problema de relozalizar.
Basicamente se agrega una capa mas de abstraccion e interaccion


