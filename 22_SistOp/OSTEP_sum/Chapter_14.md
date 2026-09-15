## Interlude: Memory API
# Chapter 14

# Key words
- Memory API
- Stack Memory
- Automatic Memory
- Heap Memory
- Buffer Overflow
- Uninitialized Read
- Memory Leak
- Dangling Pointer
- Double Free
- Garbage Collector
- Library Call
- System Call
- Break (Program Break)
- Anonymous Memory Region

# Funciones
- malloc()
- free()
- calloc()
- realloc()
- sizeof()
- strcpy()
- strdup()
- brk()
- sbrk()
- mmap()

# Idea General

`¿Como se administra la memoria en un programa C/UNIX, y que errores comunes hay que evitar?`
UNIX ofrece interfaces simples para pedir y liberar memoria dinamica. Aunque simples, su uso incorrecto es una fuente enorme de errores (segmentation faults, leaks, corrupcion de memoria). Entender bien malloc() y free(), y las herramientas para depurarlos (gdb, valgrind), es fundamental para escribir software robusto.

# Repaso teorico

[14.1]`Tipos de Memoria`
En un programa en C existen dos tipos de memoria
- *Stack Memory (automatica)*: el compilador la administra por vos; se reserva al entrar a una funcion y se libera al salir

void func() {
    int x; // se declara en el stack
}

- *Heap Memory*: vos administras explicitamente su reserva y liberacion; util para datos que deben vivir mas alla de la invocacion de una funcion

void func() {
    int *x = (int *) malloc(sizeof(int));
}

*Nota*: en la linea de malloc, ocurren dos reservas: el puntero x se reserva en el stack, y el entero al que apunta se reserva en el heap

[14.2]`La llamada malloc()`

#include <stdlib.h>
void *malloc(size_t size);

- Devuelve un puntero a la memoria reservada (exito) o NULL (fallo)
- El parametro size_t indica la cantidad de bytes solicitados
- Se recomienda usar sizeof() para calcular el tamaño correctamente:

double *d = (double *) malloc(sizeof(double));

- *Cuidado con sizeof() sobre punteros*: `sizeof(x)` sobre un puntero devuelve el tamaño del puntero (4u 8 bytes), no el tamaño reservado
- *Cuidado con strings*: usar `malloc(strlen(s) + 1)` para dejar lugar al caracter de fin de cadena

[14.3]`La llamada free()`

int *x = malloc(10 * sizeof(int));
free(x);

- Recibe unicamente el puntero devuelto por malloc()
- El tamaño de la region no se pasa como parametro: la biblioteca de asignacion de memoria debe rastrearlo internamente

[14.4]`Errores comunes`
- *Olvidar reservar memoria*: usar un puntero sin inicializar (ej. strcpy a un puntero no asignado) provoca segmentation fault
- *No reservar suficiente memoria (buffer overflow)*: reservar menos espacio del necesario; puede funcionar "por suerte" o causar fallas de seguridad graves
- *Olvidar inicializar la memoria reservada*: lleva a lecturas de valores indefinidos (uninitialized read)
- *Olvidar liberar memoria (memory leak)*: en programas de larga duracion (como el propio SO) esto lleva a agotar la memoria disponible
  - *Aside*: en programas de corta duracion, cuando el proceso termina el SO recupera toda su memoria automaticamente, por lo que un leak no siempre es catastrofico, aunque sigue siendo mala practica
- *Liberar memoria antes de tiempo (dangling pointer)*: usar memoria ya liberada puede provocar crashes o corromper datos
- *Liberar memoria repetidamente (double free)*: comportamiento indefinido, suele causar crashes
- *Llamar a free() incorrectamente*: pasarle un puntero que no proviene de malloc() es peligroso

*Herramientas para encontrar estos errores*: gdb (debugger) y valgrind (detector de errores de memoria)

[14.5]`Soporte del sistema operativo`
- malloc() y free() **no son system calls**, son *library calls*: la biblioteca de malloc administra el espacio dentro del address space virtual del proceso
- **brk()**: cambia la ubicacion del "break" (el final del heap); recibe la nueva direccion del break
- **sbrk()**: similar, pero recibe un incremento
- *Nunca deben llamarse directamente*: son usadas internamente por la biblioteca de malloc
- **mmap()**: permite obtener memoria del SO creando una region anonima (no asociada a ningun archivo), que puede tratarse tambien como heap

[14.6]`Otras llamadas`
- **calloc()**: reserva memoria y ademas la inicializa en cero
- **realloc()**: agranda una region ya reservada, copiando el contenido anterior a la nueva region mas grande y devolviendo el nuevo puntero

[14.7]`Resumen`
Se presentaron las interfaces basicas de administracion de memoria en UNIX/C
*Asignar memoria es la parte facil; saber cuando, como e incluso si liberarla es la parte dificil*
