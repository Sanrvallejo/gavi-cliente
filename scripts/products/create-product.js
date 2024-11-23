const btnCrear = document.querySelector('#btn-send');
const usuario = JSON.parse(localStorage.getItem("loggedInUser"));

//crear un producto
btnCrear.addEventListener('click', async (e) => {
  e.preventDefault();

  const codigoProducto = document.querySelector('#product-code').value;
  const nombreProducto = document.querySelector('#product-name').value;
  const categoriaProducto = document.querySelector('#product-category').value;
  const cantidadProducto = parseFloat(document.querySelector('#quantity').value);
  const precioProducto = parseFloat(document.querySelector('#product-price').value);
  const usuarioId = usuario.id;

  const nuevoProducto = {
    codigo: codigoProducto,
    nombre: nombreProducto,
    categoria: categoriaProducto,
    cantidad: cantidadProducto,
    precio: precioProducto
  }

  try {
    let response = await fetch(`http://localhost:8080/api/gavi/nuevo-producto/${usuarioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    });

    if (response.ok) {
      alert("Producto creado correctamente");
    } else {
      alert("El producto no fue creado"); 
    }
  } catch (error) {
    throw new Error(error.message);
  }
})

//limpiar campos del formulario
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  const btnClear = document.querySelector('#btn-clean');

  btnClear.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    form.reset();
  })
})
