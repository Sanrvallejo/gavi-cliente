//cerrar sesión
const btnLogout = document.querySelector('.logout');

btnLogout.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
})