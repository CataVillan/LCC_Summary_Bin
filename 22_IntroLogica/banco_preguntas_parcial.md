# Banco de Preguntas — Primer Parcial
## Introducción a la Lógica y la Computación (Posets, Reticulados, Álgebras de Boole)

Este banco está armado para simular el estilo del parcial: una parte de V o F /
selección múltiple, y una parte de ejercicios de desarrollo. Al final está la
**clave de respuestas** con justificación breve, para que puedas autoevaluarte
sin verla antes de intentar responder.

---

## PARTE A — Verdadero o Falso

Para cada afirmación, indicá si es VERDADERA o FALSA. Si es falsa, pensá un
contraejemplo.

1. Si R es una relación de equivalencia sobre A, entonces R no es una relación de orden sobre A.
2. Si R no es una relación de equivalencia sobre A, entonces R es una relación de orden sobre A.
3. Toda relación reflexiva y transitiva es una relación de orden parcial.
4. Sea (A, ≤) un poset y a, b ∈ A. Si a ≰ b entonces b ≤ a.
5. (N, |) es una cadena.
6. (N, ≤) es una cadena.
7. Para todo n ∈ N, Dn con la relación de divisibilidad es una cadena.
8. Si ≤ es un orden total entonces no es un orden parcial.
9. Si ≤ es un orden parcial entonces no puede ser un orden total.
10. Para todo poset (P, ≤) y todo S ⊆ P, (S, ≤|S) es un subposet de (P, ≤).
11. Para todo reticulado L y todo S ⊆ L, S es un subuniverso de L.
12. ({1, 3, 6, 4, 12}, |) es un subreticulado de (D12, |).
13. Sea (P, ≤) un poset y m ∈ P. Si m es máximo entonces es maximal.
14. Sea (P, ≤) un poset y m ∈ P. Si m es maximal entonces es máximo.
15. Sea (P, ≤) un poset y m ∈ P. Si m es el único minimal entonces es mínimo.
16. Sea (P, ≤) un poset finito y m ∈ P. Si m es el único maximal entonces es máximo.
17. Todo poset finito tiene al menos un elemento maximal.
18. Todo poset (no necesariamente finito) tiene al menos un elemento maximal.
19. Si P es un poset finito, entonces tiene máximo.
20. Si P es un poset reticulado finito, entonces tiene mínimo.
21. ({1, 2, 3, 5, 30}, |) es un álgebra de Boole.
22. Para todo n ∈ N, Dn es un reticulado distributivo.
23. Para todo n ∈ N, Dn es un álgebra de Boole.
24. Si L es un reticulado distributivo, entonces todo elemento tiene a lo sumo un complemento.
25. Si L es un reticulado distributivo, entonces todo elemento tiene exactamente un complemento.
26. Si L es un reticulado tal que todo elemento tiene a lo sumo un complemento, entonces L es distributivo.
27. En un reticulado acotado (no necesariamente distributivo) el 0 puede tener más de un complemento.
28. En un reticulado distributivo acotado, el único complemento del 0 es el 1.
29. En un álgebra de Boole finita, dos elementos distintos siempre son separados por algún átomo.
30. Si B y B' son álgebras de Boole finitas con la misma cantidad de átomos, entonces son isomorfas.
31. Todo álgebra de Boole finita tiene una cantidad de elementos que es potencia de 2.
32. Un elemento irreducible de un reticulado finito puede cubrir a más de un elemento.
33. Un átomo de un poset con mínimo 0 puede ser igual a 0.
34. (D(P), ⊆) es siempre un reticulado distributivo, para cualquier poset finito P.
35. M3 y N5 son reticulados distributivos.
36. Un reticulado es distributivo si y sólo si no se incrustan en él ni M3 ni N5.
37. Todo subreticulado de un reticulado distributivo es distributivo.
38. Todo subposet de un reticulado distributivo, con el orden restringido, es automáticamente un subreticulado.
39. Si f es un isomorfismo de posets entre P y Q, entonces f preserva supremos e ínfimos (cuando existen).
40. Un isomorfismo de álgebras de Boole queda determinado por su acción sobre los átomos.

---

## PARTE B — Seleccionar sólo las afirmaciones VERDADERAS

(formato similar al parcial: marcá todas las que correspondan)

a. Sea (P, ≤) un poset finito y sea m ∈ P. Si m es el único maximal, entonces es máximo.
b. Si L es un reticulado distributivo, entonces todo elemento tiene exactamente un complemento.
c. Para todo n ∈ N, Dn es un reticulado distributivo.
d. ({1, 2, 3, 5, 30}, |) es un álgebra de Boole.
e. Sea (P, ≤) un poset y sea m ∈ P. Si m es máximo, entonces es maximal.
f. Todo poset finito tiene al menos un maximal.
g. Si P es un poset reticulado finito, entonces tiene mínimo.
h. Sea (P, ≤) un poset reticulado y a, b, c ∈ P tales que a ≤ b. Entonces se da necesariamente alguna de: a ≤ b ≤ c, a ≤ c ≤ b, o c ≤ a ≤ b.
i. (N, |) es una cadena.
j. Para todo poset (P, ≤) y todo S ⊆ P, (S, ≤|S) es un subposet de (P, ≤).
k. Si L es un reticulado distributivo, entonces todo elemento tiene a lo sumo un complemento.
l. Para todo reticulado L y todo S ⊆ P, S es un subuniverso de L.
m. ({1, 3, 6, 4, 12}, |) es un subreticulado de (D12, |).
n. Para todo n ∈ N, Dn es un álgebra de Boole.
o. Si R es una relación de equivalencia sobre A, entonces R no es una relación de orden sobre A.
p. Sea (P, ≤) un poset y sea m ∈ P. Si m es el único minimal, entonces es mínimo.
q. Si P es un poset finito, entonces tiene máximo.
r. Si L es un reticulado tal que todo elemento tiene a lo sumo un complemento, entonces es distributivo.
s. Si R no es una relación de equivalencia sobre A, entonces es una relación de orden sobre A.
t. (D8, |) es una cadena.

---

## PARTE C — Ejercicios de desarrollo

### Ejercicio 1 (Diagrama de Hasse y elementos notables)
Considerá el poset (D24, |) (divisores de 24 con la relación de divisibilidad).

a) Dibujá el diagrama de Hasse.
b) Indicá si tiene máximo y mínimo. ¿Cuáles son?
c) ¿Es reticulado? Justificá.
d) Encontrá sup{4, 6} e ínf{4, 6}.
e) ¿Es una cadena? Justificá.

### Ejercicio 2 (Isomorfismos e incrustaciones)
a) Mostrá que D20 y D45 son isomorfos, dando explícitamente la función.
b) ¿D8 se incrusta en (P({a,b,c}), ⊆)? Si es así, dala explícitamente; si no, justificá por qué no.
c) ¿D12 se incrusta en D60? Justificá.

### Ejercicio 3 (Reticulados distributivos, M3 y N5)
Sea L el reticulado cuyo diagrama de Hasse tiene un mínimo 0, un máximo 1, y tres elementos incomparables entre 0 y 1 (es decir, L ≅ M3).

a) ¿L es distributivo? Justificá usando la definición (leyes distributivas) o el teorema de M3/N5.
b) Encontrá dos elementos de L que tengan más de un complemento.
c) ¿Es L un álgebra de Boole? Justificá.

### Ejercicio 4 (Reticulados acotados y complementados)
Sea L = ({1, 2, 3, 6}, |).

a) Mostrá que L es un reticulado acotado.
b) ¿Es complementado? Para cada elemento, indicá su(s) complemento(s) si existen.
c) ¿Es distributivo?
d) ¿Es álgebra de Boole? Justificá.

### Ejercicio 5 (Álgebras de Boole y átomos)
Considerá el álgebra de Boole B = (D30, |).

a) Encontrá At(B), el conjunto de átomos.
b) Dé explícitamente la función F : B → P(At(B)) definida en el Teorema de Representación, calculando F(x) para cada x ∈ D30.
c) Verificá con un ejemplo concreto que F(x ∧ y) = F(x) ∩ F(y) para dos elementos x, y de tu elección.
d) ¿Cuántos elementos tiene B? Verificá que es una potencia de 2.

### Ejercicio 6 (Teorema de Birkhoff)
Considerá el reticulado L = ({1, 2, 3, 4, 6, 12}, |).

a) Dé el diagrama de Hasse de L.
b) Encontrá Irr(L), el conjunto de elementos irreducibles, con su diagrama de Hasse (Irr(L), |).
c) Sea F : L → D(Irr(L)) la función definida en el Teorema de Birkhoff. Dé explícitamente F(x) para cada x ∈ L.
d) Dé el diagrama de Hasse de (D(Irr(L)), ⊆).
e) ¿Es L un reticulado distributivo? Justificá.
f) ¿Es L un álgebra de Boole? Justificá.

### Ejercicio 7 (Demostración)
Demostrá el siguiente lema, imitando la estrategia vista en clase:

*Sea L un reticulado distributivo con elemento mínimo 0. Sean b1, ..., bn ∈ L
y a un átomo de L. Si a ≤ b1 ∨ ··· ∨ bn, entonces a ≤ bi para algún i,
1 ≤ i ≤ n.*

(Ayuda: pensalo primero para n = 2 usando la ley distributiva, y después generalizá por inducción.)

### Ejercicio 8 (Relaciones y clases de equivalencia)
Sea A = {1, 2, 3, 4, 5, 6} y R la relación "tener el mismo resto al dividir por 3".

a) Mostrá que R es una relación de equivalencia.
b) Encontrá todas las clases de equivalencia.
c) Mostrá que forman una partición de A.
d) ¿[1] = [4]? Justificá con la definición de clase de equivalencia.

### Ejercicio 9 (Cotas, supremo e ínfimo en un poset infinito)
Considerá el poset (Q ∩ [0,2], ≤) (racionales entre 0 y 2, con el orden usual) y el subconjunto S = {x ∈ Q : x² < 2, 0 ≤ x ≤ 2}.

a) ¿S tiene cotas superiores en este poset? Encontrá alguna.
b) ¿Existe sup(S) en (Q ∩ [0,2], ≤)? Justificá por qué sí o por qué no.
c) Contrastá con qué pasaría si trabajáramos en (R ∩ [0,2], ≤) en lugar de los racionales.

### Ejercicio 10 (Subreticulados vs subposets)
Sea L = (P({a,b,c}), ⊆) y S = {∅, {a}, {b}, {a,b,c}}.

a) ¿(S, ⊆) es un subposet de L? Justificá.
b) ¿S es un subuniverso de L (es decir, (S, ⊆) es subreticulado)? Justificá calculando los supremos e ínfimos necesarios.
c) Si no lo es, encontrá el subconjunto más chico que deberías agregar a S para que sí sea un subuniverso.

---

## Clave de respuestas — Parte A

1. **F.** Contraejemplo: la relación identidad (diagonal) sobre A es a la vez de equivalencia y de orden parcial (es reflexiva, simétrica, transitiva y también antisimétrica, ya que sólo relaciona cada elemento consigo mismo).
2. **F.** Que no sea de equivalencia no implica que sea de orden; podría no ser ninguna de las dos cosas.
3. **F.** Falta la antisimetría; reflexiva + transitiva no alcanza (ej. relación total en un conjunto con más de un elemento).
4. **F.** Falso en general: puede haber elementos incomparables (a ≰ b y b ≰ a).
5. **F.** (N, |) no es cadena: 2 y 3 son incomparables.
6. **V.** (N, ≤) es un orden total, por lo tanto cadena.
7. **F.** Contraejemplo: D6 no es cadena (2 y 3 son incomparables).
8. **F.** Un orden total sí es un caso particular de orden parcial (además cumple la condición de comparabilidad total).
9. **F.** Un orden parcial puede además ser total (las cadenas son ejemplo).
10. **V.** Es la definición de subposet, la restricción de una relación de orden a un subconjunto sigue siendo de orden.
11. **F.** No todo subconjunto es cerrado por ∨ y ∧; hay que verificarlo (contraejemplo: {2,4,6,12,16} en D con |).
12. **F.** No es cerrado por ∧: 4 ∧ 6 = mcd(4,6) = 2, que no pertenece al conjunto {1,3,4,6,12}. Por lo tanto no es subreticulado, aunque sí sea subposet.
13. **V.** Máximo implica maximal siempre (para cualquier poset).
14. **F.** Maximal no implica máximo en general (pueden coexistir varios maximales incomparables).
15. **F.** Falso en general (sólo es cierto si el poset es finito).
16. **V.** En un poset finito, si hay un único maximal, es máximo (usa que todo poset finito tiene maximal y se puede probar que todo elemento está por debajo de él).
17. **V.** Es el teorema visto en clase (demostrado por inducción).
18. **F.** Falso para posets infinitos (ej. (N, ≤) no tiene maximal).
19. **F.** Tener maximal(es) no implica tener máximo (pueden ser incomparables).
20. **V.** Como es finito, se puede ir tomando el ínfimo de a pares con todos los elementos del poset (el ínfimo binario existe por ser reticulado); el resultado final es un elemento menor o igual a todos, es decir, el mínimo. Por el mismo argumento también tiene máximo.
21. **F.** No es álgebra de Boole: 30 no es divisible sólo por primos distintos combinados con este conjunto reducido de forma cerrada (el conjunto no es un Dn completo).
22. **V.** Todos los Dn son distributivos (se incrustan en un P(A)).
23. **F.** Sólo si n es producto de primos distintos (libre de cuadrados).
24. **V.** Es el corolario de la propiedad cancelativa.
25. **F.** Puede no tener ninguno.
26. **F.** La recíproca no vale (hay reticulados no distributivos donde igual cada elemento tiene a lo sumo un complemento).
27. **V.** Puede pasar en reticulados no distributivos (ej. M3).
28. **V.** Es cierto en reticulados acotados distributivos (unicidad de complementos).
29. **V.** Es el lema de separación.
30. **V.** Es el corolario del teorema de representación.
31. **V.** Corolario directo del teorema de representación (|B| = 2ⁿ).
32. **F.** Por definición, un irreducible cubre exactamente a un elemento.
33. **F.** Por definición, un átomo es distinto de 0 (a ≠ 0).
34. **V.** Es el corolario visto en clase.
35. **F.** Ni M3 ni N5 son distributivos (son justo los "testigos" de no distributividad).
36. **V.** Es el teorema central del tema.
37. **V.** Es una de las propiedades de preservación de distributividad.
38. **F.** No automáticamente: un subposet reticulado puede tener sup/ínfimo distintos a los del reticulado ambiente (ejemplo: {1,2,3,12} en D12).
39. **V.** Es la proposición vista sobre isomorfismos y preservación de estructura.
40. **V.** Es el corolario correspondiente.

## Clave de respuestas — Parte B

**VERDADERAS: a, c, e, f, g, j, k, t**
**FALSAS: b, d, h, i, l, m, n, o, p, q, r, s**

Justificación breve de cada una (varias son la misma idea que en la Parte A, reformulada):

- a. **V** — poset finito con único maximal ⟹ es máximo.
- b. **F** — un reticulado distributivo garantiza *a lo sumo* un complemento, no *exactamente* uno (puede no tener ninguno).
- c. **V** — todos los Dn son distributivos (se incrustan en algún P(A)).
- d. **F** — ({1,2,3,5,30}, |) es isomorfo a M3 (tres átomos 2,3,5 incomparables entre 1 y 30), y M3 no es distributivo, por lo que no puede ser álgebra de Boole.
- e. **V** — máximo siempre implica maximal.
- f. **V** — todo poset finito tiene al menos un maximal (teorema visto en clase).
- g. **V** — poset reticulado finito siempre tiene mínimo (y máximo).
- h. **F** — contraejemplo en D12: a=2, b=12, c=3. Ninguna de las tres cadenas propuestas se cumple.
- i. **F** — (N, |) no es cadena (2 y 3 son incomparables).
- j. **V** — es la definición de subposet (restringir un orden a un subconjunto siempre da un orden).
- k. **V** — corolario de la propiedad cancelativa en reticulados distributivos.
- l. **F** — no todo subconjunto es subuniverso; hay que chequear cierre por ∨ y ∧.
- m. **F** — 4 ∧ 6 = 2 no está en {1,3,4,6,12}.
- n. **F** — sólo si n es libre de cuadrados (producto de primos distintos).
- o. **F** — la relación identidad es contraejemplo (es equivalencia y orden a la vez).
- p. **F** — sólo vale si el poset es finito; en general el único minimal puede no ser mínimo.
- q. **F** — poset finito puede tener varios maximales incomparables y ningún máximo.
- r. **F** — la recíproca de k no vale (hay reticulados no distributivos donde igual cada elemento tiene a lo sumo un complemento).
- s. **F** — R podría no ser ni equivalencia ni orden.
- t. **V** — D8 = {1,2,4,8} es una cadena (1|2|4|8).

*Nota:* varias afirmaciones de la Parte B repiten, con otra letra, ideas de la Parte A — es intencional, así practicás reconocer el mismo concepto formulado de maneras distintas, como pasa en el parcial real.

---

## Consejos para el parcial

- Repasá bien la diferencia entre **maximal/máximo** y **minimal/mínimo**: la mitad de los errores típicos están ahí.
- Memorizá bien qué implica qué: máximo ⟹ maximal (siempre), pero no al revés salvo que sea el único maximal en un poset finito.
- Para decidir si algo es subreticulado, **siempre chequeá el cierre por ∨ y ∧ para TODOS los pares**, no asumas.
- Para probar que un reticulado NO es distributivo, buscá una incrustación de M3 o N5.
- Para probar que SÍ es distributivo, lo más fácil suele ser incrustarlo en algún Dn o P(A), que ya sabemos que son distributivos.
- En álgebras de Boole finitas: contar átomos es la manera más rápida de saber si dos son isomorfas, y con eso alcanza.
- Practicá calcular explícitamente la función F del Teorema de Birkhoff y del Teorema de Representación de álgebras de Boole — suelen pedirlo como ejercicio de desarrollo.
