## Paging: Faster Translations (TLBs) - NOTAS DE CLASE
# Chapter 19

# Key words
- Paginacion
- CR3
- Two-levels page table
- Sparse/ralo
- Leaky abstraction
- Mibble

# Notas

Todos los procesos mapean al mismo kernel

Hay que evitar cualquier tipo de addrees indirecto para evitar problemas de seguridad

El primer uso de la no inyectividad es para que todos los proceso mapeen un solo kernel (?


PT___0               PT_____0
|    |-----       -->|      |
|    |     |      |  |      |
|    |     |-CR3--|  |      |
|    |               |      |
______               ________
|    |               |      |
____1023             ________
|    |               |      |
------               -----4bx


Implementar una estructura de datos que capture los partes de la memoria vacios

![Imaen de regerenvai](https://upload.wikimedia.org/wikipedia/commons/8/8e/X86_Paging_4K.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original)

Page Directory          Page Table

CR3
|
--->PD___0               PPN____0
|   |    |<--PDE      -->|      |
|PDI|    |______      |  |      |       __________
|-->|    |     |______|  |      |      |PDI|PTI|12|virtual
10  |    |            |->|      |       ---------|-
bits______             PTI____PTE                V
    |    |               |______|___| PPN  |12offset |
    ____1023             ________
    |    |               |      |
    ------               -----1023
32bits/4bytes

Page Directory Entry <- PDE
Page Directory Index <- PDI
                     <- PTE
                     <- PPN

ejem detallado

0x00000000 -> 8bits Direccion Virtual -> paginas de 4k
[Necesito paquetizarlo en las 3 zonas: PDI PTI Offset]
- PDI    -> 10bits
- PTI    -> 10bits
- OFFSET -> 12bits
- TLB

    PDI             PTI          OFFSET
[0000 0000 00][00 0000 0000][0000 0000 0000]

Convertimos una direccion abssoluta en una direccion tridimencional
de 0x00000000 --> tenemos (pDI, PTI, OFFSET) 3 direcciones

ahora tenemos 3 paquetes de informacion
(0000000000) (0000000000) (000000000000)

*Regla de traduccion de virtual a fisica*
uso la direccion, indexo cada indice (de los 3 direcciones) en la tabla

-------------------------AMPLIAR------------------


0x00401000
    PDI             PTI         OFFSET
[0000 0000 01][00 0000 0001][0000 0000 0000]

uso los 20 bits mas significativos (PDI, PTI)  utilizar el esquema de paginacon para pasar de memoria fisica a virtual

el offset pasa directamnete y queda

0x10000000

En general se mapea una pagina virutal completa y una pagina fisica completa
cambia cunado pasa de pagina en pagina


No existe las direcciones fisicas a menos que es estes directaente adentro del procesador e incluso para acceder a ellas hay que estas afuera

Antes de tener direccion fisica, hay que pasar por el MMU

Si se rompe la abstraccion y tenes informacion de la mamotia se puede optimizar y hacer los programas mas rapidos


La 0 page virtual va a estar no mapeada (SIEMPRE)

Cache de memorua virutal y fisica se llama TLB
TLB = translations lookaside buffer. Es algo asi como una tabla con firtual frame number y phisical frame number
   FFN     PFN
|-------|-------|  fully asosiattuve cache
|-------|-------|
|-------|-------|
|-------|-------|
|-------|-------|
|_______|_______|


en el page directoria si tiene un bit de mas qei indica si el tama;o de la pagina es normal 4k o grande 4mb
