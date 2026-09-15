//No se declaran tipos obligatoriamente

//ejemplo de funcion sum

def suma(a, b):
    return a + b

x = suma(2, 3)
print(x)

//STRINGS

username = "admin"

print(username)
print(username.upper())
print(username.lower())
print(len(username))
print(username.startswith("adm"))

//F-STRINGS

user = "admin"
id = 42

print(f"Usuario: {user}, ID: {id}")

//utiles para construir requests, payloads, comandos, etc


//LIST

users = ["admin", "guest", "test"]

print(users[0])

for user in users:
    print(user)

//agregar

users.append("root")

//eliminar

users.remove("guest")

//longitud

len(users)

//stu comun

for i, user in enumerate(users):
    print(i, user)



//DICTIONARIES
//util para trabajar con APIs/JSON

user = {
    "username": "admin",
    "id": 42,
    "role": "admin"
}

//acceder

print(user["username"])
print(user["role"])

//modificar

user["role"] = "user"

//recorrer

for key, value in user.items():
    print(key, value)


user.get("email") //si la clave no existe devuelve None en vez de tirar un error




//FUNCIONES

def check_user(username):
    if username == "admin":
        return True

    return False

def check_user(username, role="user"):

//muchas cosas se pueden simplificar




//MODULOS

import random

print(random.randint(1, 100))


import os

print(os.getcwd())


import sys

print(sys.argv)



//ej
import sys

name = sys.argv[1]

print(f"Hola {name}")

// ejecutando python3 script.py Bokkie
// devuelve
// Hola Bokkie



//REQUESTS

//libreira importante para HTTP: requests   <-- hay que instalarla

import requests

response = requests.get("https://example.com")

print(response.status_code)
print(response.text)


//ej

import requests

url = "https://example.com"

response = requests.get(url)

if response.status_code == 200:
    print("OK")



//POST

import requests

url = "https://example.com"

response = requests.get(url)

if response.status_code == 200:
    print("OK")


//Headers

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(url, headers=headers)

//Cookies

cookies = {
    "session": "abcdef123456"
}

response = requests.get(url, cookies=cookies)


//Giardar sesiones

session = requests.Session()

response = session.get(url)
response = session.post(login_url, data=data)



//JSON

//comodo para tranajar copn APIs

//si el server responde
{
    "username": "admin",
    "role": "admin",
    "id": 534
}

//se pude convertir

data = response.json()

print(data["username"])
print(data["role"])
print(data["id"])

//o generar JSON

data = {
    "username": "admin",
    "role": "admin"
}



//AUTOMATIZACION ejemplo

//probar una lista de valores

users = [
    "admin",
    "guest",
    "test",
    "root"
]

for user in users:
    response = requests.get(
        url,
        params={"username": user}
    )

    print(user, response.status_code)

//params genera automaticamente la query string



//MANEJOR DE ERRORES

try:
    response = requests.get(url)
except requests.RequestException as e:
    print(f"Error: {e}")


try:
    x = int(input("Número: "))
except ValueError:
    print("No ingresaste un número")




//ARCHIVOS

with open("users.txt") as file:
    for line in file:
        username = line.strip()
        print(username)


with open("output.txt", "w") as file:
    file.write("resultado\n")




//LIST COMPRENHENSIONS

//en lugar de

numbers = []

for i in range(10):
    numbers.append(i * 2)

//se puede escribir

numbers = [i * 2 for i in range(10)]

//y

even = [x for x in numbers if x % 2 == 0]



//COSAS UTILES PARA PROB&existe

import random

numbers = [random.randint(1, 100) for _ in range(1000)]


import statistics

print(statistics.mean(numbers))
print(statistics.median(numbers))
print(statistics.stdev(numbers))



//NumPy

import numpy as np

data = np.array([1, 2, 3, 4, 5])

print(np.mean(data))
print(np.std(data))


//Pandas     para datos/tablas

import pandas as pd

df = pd.read_csv("datos.csv")

print(df.head())
print(df.describe())


//Matplotlib      para graficos

import matplotlib.pyplot as plt

plt.hist(data)
plt.show()







