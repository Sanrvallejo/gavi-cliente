//comprobar que las contraseñas coincidan
const inputContrasena = document.querySelector('#contrasena');
const inputContrasenaRespetida = document.querySelector('#contrasena2');

inputContrasena.addEventListener('input', () => {
  const contrasena = document.querySelector('#contrasena').value;

  let comprobacion = inputContrasenaRespetida.value;

  if (contrasena !== comprobacion) {
    inputContrasenaRespetida.style.borderColor = "red";
    inputContrasenaRespetida.style.borderWidth = "3px";
  }else {
    inputContrasenaRespetida.style.borderColor = "#22aa46";
    inputContrasenaRespetida.style.borderWidth = "3px";
  }
});

inputContrasenaRespetida.addEventListener('input', () => {
  const contrasena = document.querySelector('#contrasena').value;

  let comprobacion = inputContrasenaRespetida.value;

  if (contrasena !== comprobacion) {
    inputContrasenaRespetida.style.borderColor = "red";
    inputContrasenaRespetida.style.borderWidth = "3px";
  }else {
    inputContrasenaRespetida.style.borderColor = "#22aa46";
    inputContrasenaRespetida.style.borderWidth = "3px";
  }
});



