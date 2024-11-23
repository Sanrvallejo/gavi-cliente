//comprobar el logout
if (!localStorage.getItem("loggedInUser")) {
  alert("Inicie sesión, por favor");
  window.location.href = "login.html"
}

