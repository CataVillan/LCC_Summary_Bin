//en la consola del Navegador

console.log("Hola");

//Esto permite probar pequeños fragmentos de código sin crear archivos

//TIPOS DE DATOS

//tipado dinamico


let x = 10;
let name = "admin";
let active = true;
let nothing = null;


typeof x   //para consultar tipo de dato



//STRINGS


let username = "admin";

let username = 'admin';


"Hello " + username   --> Hello admin


//Template literals


let username = "admin";

`Hello ${username}`      --> Hello admin


para construir URLs


let username = "admin";

fetch(`/check?username=${username}`);



// if / else


if (condition) {
    // código
} else {
    // otro código
}


if (password === "secret") {
    showFlag();
} else {
    showError();
}



// Bucles


for (let i = 0; i < 10; i++) {
    console.log(i);
}



let i = 0;

while (i < 10) {
    console.log(i);
    i++;
}


let users = ["admin", "root", "guest"];

for (let user of users) {
    console.log(user);
}



//FUNCIONES


function suma(a, b) {
    return a + b;
}


suma(3, 5);


//ARROW FUNTIONS


const suma = (a, b) => {
    return a + b;
};


const suma = (a, b) => a + b;


fetch("/")
    .then(response => response.text())
    .then(data => console.log(data));



//ARRAY


let numbers = [10, 20, 30, 40];

numbers[0]  --> 10


//Longitud

numbers.length  --> 4

//Agregar elementos

numbers.push(50);


//Eliminar el ultimo

numbers.pop();



let users = ["admin", "root", "guest"];

for (let user of users) {
    console.log(user);
}




//OBJETOS


let user = {
    username: "admin",
    role: "user",
    id: 534
};


//acceder a sus propiedades


user.username   --> admin

user["username"] --> admin

user.role  --> user

//las respuestas de APIs suelen convertirse en objetos JavaScript





/JSON
//JavaScript Object Notation

//utilizado para intercambiar datos entre cliente y servidor


{
    "id": 534,
    "username": "admin",
    "role": "admin"
}


//convertir un string JSON a un objeto con


JSON.parse()

let text = '{"username":"admin","role":"admin"}';

let data = JSON.parse(text);



data.username  --> admin

data.role  --> admin




//JSON.stringify()

//Hace el proceso contrario.


let user = {
    username: "admin",
    role: "admin"
};

JSON.stringify(user);  --> {"username":"admin","role":"admin"}



JSON.parse()
JSON -> objeto JavaScript

JSON.stringify()
objeto JavaScript -> JSON


//muy importante al trabajar con APIs



//EN EL NAVEGADOR

Cuando visitamos una página web normalmente tenemos:


HTML define la estructura

CSS define la apariencia

JavaScript define comportamiento y logica


<button id="login">Login</button>


document.getElementById("login");

//sum

// Variables


let x = 10;
const y = 20;


// Strings


let name = "admin";

"Hello " + name;

`Hello ${name}`;


// Condicional

 .
if (x === 10) {
    console.log("OK");
}


// Array


let users = ["admin", "root", "guest"];

users[0];
users.length;

users.push("test");


// Objeto


let user = {
    username: "admin",
    role: "admin"
};

user.username;
user["role"];


// JSON


JSON.parse(text);
JSON.stringify(object);


// DOM


document.title;

document.body;

document.getElementById("id");

document.querySelector(".class");


// Cookies


document.cookie;


// Local Storage


localStorage.getItem("token");

localStorage.setItem("token", "abc");

localStorage.removeItem("token");


// URL


window.location.href;

window.location.pathname;


// GET


fetch("/api/users");

// GET + respuesta JSON


fetch("/api/users")
    .then(r => r.json())
    .then(data => console.log(data));


// async/await


async function test() {
    let response = await fetch("/api/users");
    let data = await response.json();

    console.log(data);
}

test();


//POST


fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: "admin",
        password: "1234"
    })
});


