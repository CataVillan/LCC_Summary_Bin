# Introducción a la Lógica y la Computación
## Resumen teórico: conceptos, lemas y teoremas clave

---

## Tema 1: Relaciones y Relaciones de Orden

**Relaciones Binarias**
Una relación binaria R de un conjunto A en B se define como un subconjunto del producto cartesiano, es decir: R ⊆ A × B.

**Propiedades de Relaciones sobre un conjunto**
Una relación puede ser reflexiva, simétrica, transitiva o antisimétrica.

**Relaciones de Equivalencia**
Son aquellas relaciones que cumplen ser reflexivas, simétricas y transitivas.

**Clases de Equivalencia y Particiones**
La clase de equivalencia de un elemento a se define como:

    [a] = { b ∈ A : (a,b) ∈ R }

El conjunto de las clases de equivalencia forma una partición del conjunto original, y viceversa: toda partición define una relación de equivalencia.

**Relación de Orden Parcial**
Una relación es de orden parcial si es reflexiva, antisimétrica y transitiva.

---

## Tema 2: Conjuntos Parcialmente Ordenados (Posets)

**Definición**
Un poset es un par (A, R), donde A es un conjunto no vacío y R es una relación de orden parcial sobre A.

**Relación "Cubre" y Diagrama de Hasse**
Se dice que b cubre a a si:
- a ≠ b
- a ≤ b
- no existe ningún c intermedio (tal que a ≤ c ≤ b, con c distinto de a y b)

Los Diagramas de Hasse representan gráficamente esta relación de cubrimiento mediante líneas ascendentes.

**Órdenes Totales (Cadenas)**
Es un poset donde la relación cumple que, para todo par de elementos, o bien a ≤ b o bien b ≤ a.

**Elementos Notables**

- *Máximo / Mínimo:* un elemento es máximo si es mayor o igual que todos los demás; es mínimo si es menor o igual que todos.
- *Maximal / Minimal:* un elemento es maximal si no existe ningún otro elemento mayor que él; es minimal si no existe ninguno menor.
- *Teorema de Existencia:* todo poset finito tiene al menos un elemento maximal y al menos un elemento minimal.

**Cotas, Supremo e Ínfimo**
El supremo es la menor de las cotas superiores de un subconjunto, mientras que el ínfimo es la mayor de sus cotas inferiores.

---

## Tema 3: Reticulados

**Posets Reticulados**
Un poset es reticulado si para todo par de elementos existen tanto el supremo (∨) como el ínfimo (∧).

**Definición Algebraica**
Un reticulado es una terna (L, ∨, ∧) cuyas operaciones cumplen las leyes de:
- Idempotencia
- Conmutatividad
- Absorción
- Asociatividad

**Subreticulados e Isomorfismos**
Un subreticulado es un subconjunto cerrado bajo las operaciones ∨ y ∧.
Un isomorfismo entre reticulados es una función biyectiva que preserva estas operaciones (o el orden, de manera equivalente).

**Reticulados Acotados**
Son aquellos que poseen un primer elemento (0) y un último elemento (1).

**Reticulados Complementados**
Un reticulado acotado es complementado si cada elemento a tiene al menos un complemento b, tal que:

    a ∨ b = 1   y   a ∧ b = 0

**Reticulados Distributivos**
Son aquellos donde la operación ∧ distribuye sobre ∨, y viceversa.

**Teorema de Distributividad**
Un reticulado es distributivo si y sólo si no se incrustan en él los reticulados conocidos como M3 ni N5.

---

## Tema 4: Álgebras de Boole

**Definición**
Un álgebra de Boole es un reticulado acotado, complementado y distributivo.

**Leyes de De Morgan**
En toda álgebra de Boole se cumple que:

    ¬(x ∨ y) = ¬x ∧ ¬y
    ¬(x ∧ y) = ¬x ∨ ¬y

**Átomos**
En un poset con elemento mínimo 0, un átomo es un elemento que cubre al 0.

**Lema de Separación**
Si en un álgebra de Boole finita x ⊄ y (x no es menor o igual que y), entonces existe un átomo a tal que a ≤ x y a ⊄ y.

**Teorema de Representación**
Toda álgebra de Boole finita B es isomorfa al reticulado de partes de sus átomos, representado como (P(At(B)), ⊆).

**Corolario**
La cantidad de elementos de toda álgebra de Boole finita es de la forma 2ⁿ.

---

## Tema 5: Representación de Reticulados Distributivos

**Elementos Irreducibles**
Un elemento es irreducible si cubre exactamente a un único elemento.

**Lema de Separación por Irreducibles**
Si en un reticulado finito x ≠ y, existe un elemento irreducible u que separa dichos elementos.

**Conjuntos Decrecientes**
Un subconjunto D de un poset es decreciente si para todo x ∈ D y todo z ≤ x, se cumple que z ∈ D.

**Teorema de Birkhoff**
Todo reticulado distributivo finito L es isomorfo al conjunto de las familias de subconjuntos decrecientes de sus elementos irreducibles, denotado como (D(Irr(L)), ⊆).
