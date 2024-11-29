document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('loggedInUser'));

  //seleccionar los elementos del DOM
  const sectionHead = document.querySelector('h2');
  const userName = document.querySelector('#user-name');
  const userEmail = document.querySelector('#user-email');
  const userPassword = document.querySelector('#user-password')
  const modalContent = document.querySelector('.modal');
  const modal = document.querySelector('.content-modal');
  const open = document.querySelector('#btn-send');
  const close = document.querySelector('.close');
  const btnEdit = document.querySelector('#btn-edit');

  //renderizar los datos en la vista
  sectionHead.textContent = `Perfil de ${usuario.nombre}`;
  userName.value = usuario.nombre;
  userEmail.value = usuario.email;

  //manipular modal 21-42
  open.addEventListener('click', (e) => {
    e.preventDefault();
    modalContent.style.opacity = "1";
    modalContent.style.visibility = "visible";
    modal.classList.remove('modal-close');
  });

  //cerrar
  close.addEventListener('click', cerrarModal);
  modalContent.addEventListener('click', (e) => {
    if (e.target === modalContent) cerrarModal();
  });

  function cerrarModal() {
    modal.classList.add('modal-close');
    setTimeout(() => {
      modalContent.style.opacity = "0";
      modalContent.style.visibility = "hidden";
    }, 600);
  }

  btnEdit.addEventListener('click', async (e) => {
    e.preventDefault();

    //TODO: comprobar contraseña editada

    const passVerify = document.querySelector('#pass-verify').value;
    if (usuario.password === btoa(passVerify)) {
      try {
        await editarUsuario(usuario.id, {
          nombre: userName.value,
          email: userEmail.value,
          password: btoa(userPassword.value),
        });
      } catch (error) {
        alert("Error al editar el usuario: " + error.message);
      }
    } else {
      alert('Petición denegada. Contraseña incorrecta.');
    }
  });
});

//petición para editar usuario
async function editarUsuario(id, usuarioEditado) {
  try {
    const response = await fetch(`http://localhost:8080/api/gavi/usuario-editado/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioEditado),
    });

    if (response.ok) {
      alert('Usuario editado correctamente');
      window.location.href = 'profile.html';
      localStorage.setItem('loggedInUser', JSON.stringify(await response.json()));
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Error al editar el usuario');
    }
    
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert('Error en la solicitud: ' + error.message);
    throw error;
  }
}
