## Interlude: Memory API
# Chapter 14 & notas Chapter 16

# Key Words
- Stack Smashing for fun&profit
- Phrack
- Hacking
- Base/Limit
- Segmentacion
- Segmentacion Interna
- Paginacion
- Politicas
- Slab
- Binary block
- BRK
- Multisegmento (chapter 16)
- Paginacion (Chapter _?_)
- ROP (Return Oriented Programming)
- Canarios
- ASLR Address Space Layout Randomization
- Reallocation table
- Page Table
- CR3

# Conceptos de Hardware

# Fuciones

# Idea General

# Repaso Teorico

# Notas de clase (03/09)

[Las Ciencias de la Computacion es a la computadora lo que la astronomia es al telecospio]
                    -Dijkstra
`¿Is C low-level?`

Virtual
Fisica

F = V + base
if(V>=Limit){
    trap();
}
Los procesos no pueden salir de su base-limite -> si lo hacen salta trap

Politicas/Decsioan de donde deberia ir el proggrama en la memoria
    |----> es importante
                MEMORIA
|\\\\\\\|______|\\\\\\\|_____|\\\\\\\\\|

Si tengo un |\\\| y lo tenog que ubicar, donde lo hago? <-- *POLITICA*

Posibles politicas (pueden ser cualqueira)
- Ramdom fit
- Best fit
- Wordt fit <--- Ok??
- Size fit (?)

Pedir memoria es malo (((???)))

_3 bits de permisos para segmentos: RWX_  [ ej: 001 : 110 : 111 ]
 0/1         0/1         0/1
 |           |           |
 R -> Read   W -> Write  X -> Execute(lectura_too)
 |           |           |
 LDUR       STUR         Fetch

 *Mem***
 ________
 | PC   |
 |X_0   |
 |  ... |
 |X_31  |
 --------
 |Base  |
 |Limit |
 |RWE   |
 --------
 |BaseS |  <---|
 |LimitS|  <---|--11_ (Stack)
 |RWE_S |  <---|
 --------
 |BaseH |
 |LimitH|   (Heap)
 |RWE_H |
 --------

*Return Oriented Programming*
secuencais de returns que utilizan peque;os snippets de codigo que ya estaban en la memorua del programa

[Tecnica para prevenir ataques de corrupcion de memoria]
*Canarios*
Marcas que se dejan en la memoria que lee cada tanto. Sirven para detecta problemas
*Stack no ejecutable*
Impide que se ejecute código malicioso ubicado en la memoria de la pila (stack) del sistema
*ASLR Address Space Layout Randomization*

Las direcciones de memoria no dicen (saben?) a que segmento accede
El proc neceseta sumarle las bases y checkear los limites
Entonces `¿Como se hace?` nidea algo del stack y el heap indiferenciables
No le preguntas la direccion a nadie porque en principio no estan interpretadas (son cualquiera )
[Soluciones]
*INTEL (implicito)*
Las isntrucciones estan planificadas para que accedan a especificos segmenos
*VAXS (Explicito)*
la dir de memotia codifica las dir de segmentos con los bits mas signidcativps (creo que no es asi)

Los bits del address puedo saber ede que segmentos se esta hablando
estos bits son los indices de *Mem***
(tabla de relocalizacion)


exploits aleatorios que rompen cosas <-- malo para los de seguridad

[Direccion de Crecimiento del STACK]
En el caso del stack, el limite esta arriba de la base (la transformacio matematica es trivial) Es una convension de que la base inicia el final del stack y el limite las memorias hacia arriba

**Paginacion**
Todos los segmentos tienen el mismo tama;o, el problema es que ahora se general un rpoblema de fragmentacion interno

Segmentos de tama;o fijo con:
- Segmentacion explicita  --> bits mas altos de la dir, se divide en dos: indice de la talba de pagias y offsides
- Tabla de segmentos de RAM -->

_Estandar de la pagina 4K desde 1970_ (cambia en cada arquitectura)

Se tienen un monton de segmenotso de igual tama;o indexados
se incluye un nuevo registro (CR3) con la dir base de esa tabla, este registro apunta a la direccion base de la table *Page Table*

Ahora ya no es necesario el limite --> nos ahorramos informacion























