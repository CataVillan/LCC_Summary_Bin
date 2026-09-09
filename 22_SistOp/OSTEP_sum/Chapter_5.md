## Interlude: Process API
# Chapter 5

# Key words
- Process
- PID (Process Identifier)
- Parent Process
- Child Process
- Shell
- Fork
- Exec
- Wait
- File Descriptor
- Redirection
- Pipe
- Signal
- User
- Superuser (root)

# Conceptos de Hardware
- CPU (compartida entre procesos mediante el scheduler)
- Kernel Stack (por proceso)
- Registros (guardados/restaurados en cada creación o cambio de proceso)

# Funciones
- fork()
- wait()
- waitpid()
- exec() / execvp()
- open()
- close()
- kill()
- signal()
- pipe()

# Idea General

`¿Como crea y controla el sistema operativo los procesos?`
UNIX ofrece una forma muy particular (y algo extra;a) de crear procesos: la combinacion de dos system calls, fork() y exec(), junto con wait() para esperar a que un proceso termine

*fork()*
- Crea una copia casi identica del proceso que la invoca
*exec()*
- Reemplaza el codigo y la memoria del proceso actual por el de un nuevo programa
*wait()*
- Permite a un proceso padre esperar a que su hijo termine su ejecucion

La separacion entre fork() y exec() no es casualidad: permite que el shell modifique el entorno del proceso hijo (redirecciones, pipes, etc) despues de crearlo pero antes de que ejecute el nuevo programa

# Repaso teorico

[5.1]`El system call fork()`
fork() crea un nuevo proceso (el hijo) que es una copia casi exacta del proceso que lo llamo (el padre)
- El padre recibe como retorno el PID del hijo
- El hijo recibe como retorno el valor 0
- Si fork() falla, retorna un valor negativo
*El orden de ejecucion entre padre e hijo despues del fork() no esta determinado: depende del scheduler*

[5.2]`El system call wait()`
Permite que el proceso padre se bloquee hasta que el hijo termine su ejecucion
- Sin wait(), el orden de impresion de mensajes entre padre e hijo es no determinista
- Con wait(), se garantiza que el hijo termine antes de que el padre continue
*wait() (o su variante mas completa waitpid()) introduce determinismo en la ejecucion*

[5.3]`El system call exec()`
Se utiliza quando se quiere correr un programa distinto al que esta corriendo actualmente
- No crea un nuevo proceso, transforma al proceso actual en uno nuevo
- Carga el codigo y los datos estaticos del nuevo programa, reinicializa heap, stack, etc
- Si exec() tiene exito, nunca retorna al codigo que lo llamo
*execvp() es una de las variantes; recibe el nombre del programa y sus argumentos*

[5.4]`Por que separar fork() y exec()?`
Esta separacion es lo que permite construir un shell de UNIX
- El shell hace fork() para crear un hijo
- Antes de hacer exec(), el hijo puede modificar su entorno (por ejemplo, redirigir su salida estandar a un archivo)
- Luego el hijo hace exec() para correr el programa pedido
*Esto habilita funcionalidades como la redireccion (>) y los pipes (|), sin tener que modificar los programas que se ejecutan*

[5.5]`Redireccion y pipes`
La redireccion (ej: wc archivo.c > salida.txt) se logra cerrando el descriptor de salida estandar y abriendo el archivo destino antes del exec()
- UNIX busca descriptores libres empezando desde el 0
*Los pipes (con el system call pipe()) conectan la salida de un proceso con la entrada de otro, permitiendo encadenar comandos (ej: grep foo archivo | wc -l)*

[5.6]`Control de procesos y usuarios`
- El system call kill() permite enviar se;ales a un proceso (parar, terminar, etc)
- signal() permite que un proceso capture y maneje se;ales de forma personalizada
- Cada proceso pertenece a un usuario, y en general un usuario solo puede controlar sus propios procesos
*El superusuario (root) puede controlar los procesos de cualquier usuario y ejecutar comandos privilegiados como shutdown*

[5.7]`Herramientas utiles`
- ps: muestra los procesos en ejecucion
- top: muestra el consumo de CPU y recursos de los procesos
- kill / killall: envian se;ales a procesos para terminarlos o controlarlos
