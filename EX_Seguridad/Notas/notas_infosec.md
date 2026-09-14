
#Inyecciones

0) SQL injection

"SELECT * FROM users WHERE user = '" + input + "'". El input se concatena
directo en el query. (Literalmente lo del northgate bank) 

No estas limitado a solo hacer comentarios, podes inyectar, por ejemplo,
admin'; DELETE {nombre_tabla} -- para borrar la tabla con los datos de 
login. Aunque para esto necesitas saber el nombre de la tabla (o adivinarlo
de alguna forma), es un buen ejemplo de que podes hacer literalmente 
cualquier cosa si podes correr código en el backend.

La única limitación que vas a tener es la de tener la certeza de cosas como
si existe una tabla, de si existe un usuario, etc. Generalmente esto se
resuelve usando fuerza bruta con herramientas como SQL MAP.

1) Command injection

Exactamente el mismo patron que para las otras inyecciones. EJ: Si controlas
los comandos que se corren en la maquina que le pide los datos a la base
de datos => podes pedirle cualquier cosa a la base de datos

2) XSS (Cross-site Scripting attacks)

Insertar un script en medio del código del sitio web. Hay tres tipos de XSS

-Reflected XSS (enviamos script para que nos devuelva algo)
Viaja en la URL o un parametro. Se ejecuta al abrir un link armado. No
persiste en el servidor

maicostore.com/q=gato -> la persona que abre esto abre la pagina
maicostore con el query gato

esto se puede usar para mandar un script por el query, un ejemplo
es muchas tacticas de phishing que usan el query para ejecutar un script
que copia las cookies de tu navegador y se las manda a los estafadores.

-Stored XSS (enviamos script para que se quede cambiando algo de la
página, por ejemplo, que cuando venga otro usuario, en vez de mandarle
su contraseña al sitio web, nos la mande a nosotros)
Se guarda en la base de datos. Se ejecuta para todos los que ven esa pagina.
El más peligroso de los tres.

-Dom-Based 
Nunca toca el servidor. El JS del cliente inserta input sin sanitizar.
innerHTML, document.write, eval son sospechosos.

#Control de Acceso Roto

Vos deberias de poder acceder a tus recursos y los otros a los suyos, pero
nadie a los de los demás. 

-Vulnerable: El server confia ciegamente en todo lo que le dice un usuario
logueado es valido. Por ej le permite a cualquier usuario logueado acceso
a archivos con cualquier id, aunque esos archivos no sean algo que el usuario
tenga que ver
-Seguro: EL server valida si el usuario es dueño del recurso al que accede,
autenticado != autorizado.







