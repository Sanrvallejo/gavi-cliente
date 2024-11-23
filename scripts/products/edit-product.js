//inputs con valores del producto
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  
  const productoEncontrado = JSON.parse(localStorage.getItem('editProduct'));
  
  const codigoProducto = document.querySelector('#product-code');
  const nombreProducto = document.querySelector('#product-name');
  const categoriaProducto = document.querySelector('#product-category');
  const cantidadProducto = document.querySelector('#quantity');
  const precioProducto = document.querySelector('#product-price');
  
  codigoProducto.value = productoEncontrado.codigo;
  nombreProducto.value = productoEncontrado.nombre;
  categoriaProducto.value = productoEncontrado.categoria;
  cantidadProducto.value = productoEncontrado.cantidad;
  precioProducto.value = productoEncontrado.precio;
  
})

//editar un producto
const btnEditar = document.querySelector('#btn-send');
btnEditar.addEventListener('click', async (e) => {
  e.preventDefault();

  const codigoProducto = document.querySelector('#product-code').value;
  const nombreProducto = document.querySelector('#product-name').value;
  const categoriaProducto = document.querySelector('#product-category').value;
  const cantidadProducto = parseFloat(document.querySelector('#quantity').value);
  const precioProducto = parseFloat(document.querySelector('#product-price').value);

  const productoEditar = {
    codigo: codigoProducto,
    nombre: nombreProducto,
    categoria: categoriaProducto,
    cantidad: cantidadProducto,
    precio: precioProducto
  }

  try {
    let response = await fetch(`http://localhost:8080/api/gavi/producto-editado/${productoEditar.codigo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productoEditar)
    });

    if (response.ok) {
      alert("Producto editado correctamente");
      window.location.href = "products.html";
    } else {
      alert("El producto no fue editado"); 
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
