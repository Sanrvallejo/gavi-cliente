document.addEventListener('DOMContentLoaded', async (e) => {

  document.querySelector('.product-table').addEventListener('click', async (e) => {
    if (e.target.closest('.btn-td.remove-btn')) {
      e.preventDefault();

      const fila = e.target.closest("tr");
      if (fila) {
        const codigoProducto = fila.cells[0].textContent.trim();
        const productsList = JSON.parse(localStorage.getItem('productsList')) || [];

        const productoEncontrado = productsList.find(product =>
          product.codigo.toLowerCase() === codigoProducto.toLowerCase()
        );

        if (productoEncontrado) {
          localStorage.setItem('editProduct', JSON.stringify(productoEncontrado));
          eliminarProduto(productoEncontrado.id);
          window.location.href = 'products.html';
        } else {
          alert("Producto no encontrado");
        }
      } else {
        alert("Error al obtener la fila");
      }
    }
  })
})

async function eliminarProduto(idProducto) {
  try {
    let response = await fetch(`http://localhost:8080/api/gavi/eliminar-producto/${idProducto}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      alert(`Producto con ID ${idProducto} eliminado correctamente.`);
    } else {
      alert(`Error al eliminar el producto`);
    }
  } catch (error) {
    console.error(`Error en la solictud: ${error.message}`);
  }
}