//comprobar que las contraseñas coincidan
const inputContrasena = document.querySelector('#contrasena');
const inputContrasenaRespetida = document.querySelector('#contrasena2');

inputContrasena.addEventListener('input', () => {
  const contrasena = document.querySelector('#contrasena').value;

  let comprobacion = inputContrasenaRespetida.value;

  if (contrasena !== comprobacion) {
    inputContrasenaRespetida.style.borderColor = "red";
    inputContrasenaRespetida.style.borderWidth = "3px";
  } else {
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
  } else {
    inputContrasenaRespetida.style.borderColor = "#22aa46";
    inputContrasenaRespetida.style.borderWidth = "3px";
  }
});

//enviar formulario de registro
const btnSend = document.querySelector('.send');

btnSend.addEventListener('click', async function (event) {
  event.preventDefault();

  if (inputContrasena.value === inputContrasenaRespetida.value) {
    const nombreIngresado = document.querySelector('#nombre').value;
    const correoIngresado = document.querySelector('#correo').value;
    const contrasenaIngresada = document.querySelector('#contrasena').value;

    const usuario = {
      nombre: nombreIngresado,
      email: correoIngresado,
      password: contrasenaIngresada
    }

    try {
      let response = await fetch('http://localhost:8080/api/gavi/nuevo-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
  
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }

    
  } else {
    alert("Compruebe los datos y que las constraseñas coincidan")
  }
  
  window.location.href = "login.html";
})

