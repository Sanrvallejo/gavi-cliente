document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
  
  const sectionHead = document.querySelector('h2');
  const userName = document.querySelector('#user-name');
  const userEmail = document.querySelector('#user-email');
  const userPassword = document.querySelector('#user-password');

  sectionHead.textContent = `Perfil de ${usuario.nombre}`;

  userName.value = usuario.nombre;
  userEmail.value = usuario.email;
  userPassword.value = usuario.password;
})