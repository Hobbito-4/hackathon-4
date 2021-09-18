/*
¿Volver a resolver una promesa?
¿Cuál es el resultado del siguiente código?*/

let promise = new Promise(
function(resolve, reject) {
resolve(1);
 setTimeout(() => resolve(2), 1000);
});
promise.then(alert);//1 resolve se ignora solo se toma en cuenta reject

//ejercicio 1
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  delay(3000).then(() => alert('runs after 3 seconds'));
  //ejercicio 2
  
  promise.then(f1).catch(f2); // no si hay un error en f1 lo maneja catch
  promise.then(f1, f2);// ocurre un error en ambos

  //ejercicio 3
  async function loadJson(url) {
    let response = await fetch(url);
  
    if (response.status == 200) {
      let json = await response.json(); 
      return json;
    }
  
    throw new Error(response.status);
  }
  
  loadJson('no-such-user.json')
    .catch(alert);

  
//ejerccio 4
class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  
 
  async function demoGithubUser() {
  
    let user;
    while(true) {
      let name = prompt("Ingrese un nombre:", "iliakan");
  
      try {
        user = await loadJson(`https://api.github.com/users/${name}`);
        break; 
      } catch(err) {
        if (err instanceof HttpError && err.response.status == 404) {
         
          alert("No existe tal usuario, por favor reingrese.");
        } else {
          
          throw err;
        }
      }
    }
  
  
    alert(`Nombre completo: ${user.name}.`);
    return user;
  }
  
  demoGithubUser();

//ejercicio 5
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    return 10;
  }
  
  function f() {
   
    wait().then(result => alert(result));
  }
  
  f();
//ejercicio 6
//¿Qué crees que pasará? ¿Se disparará el .catch? Explicea tu respuesta.

new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);//no lo hara ,el error no se genera mientras el ejecutor está corriendo si no despues
//ejercicio 7
function printNumbers(from, to) {
    let current = from;
  
    let timerId = setInterval(function() {
      alert(current);
      if (current == to) {
        clearInterval(timerId);
      }
      current++;
    }, 1000);
  }
  

  printNumbers(5, 10);


  
  function printNumbers(from, to) {
    let current = from;
  
    setTimeout(function go() {
      alert(current);
      if (current < to) {
        setTimeout(go, 1000);
      }
      current++;
    }, 1000);
  }
  

  printNumbers(5, 10);