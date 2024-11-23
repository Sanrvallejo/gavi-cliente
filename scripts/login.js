const btnLogin = document.querySelector('.send');

btnLogin.addEventListener('click', async (e) => {
  e.preventDefault();

  const emailIngresado = document.querySelector('#email').value;
  const passwordIngresada = document.querySelector('#password').value;

  const loginDto = {
    email: emailIngresado,
    password: btoa(passwordIngresada)
  }

  try {
    let response = await fetch('http://localhost:8080/api/gavi/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDto)
    });

    if (!response.ok) {
      console.log(response);
      alert("Correo electrónico y contraseña incorrectos. Verifique los datos.")
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const usuarioLogin = await response.json();
    console.log(usuarioLogin);
    localStorage.setItem("loggedInUser", JSON.stringify(usuarioLogin));
    window.location.href = "home.html";

  } catch (error) {
    console.error("Error:", error);
    throw new Error('Error en la solicitud');
  }
  
})