const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', (e) => {
  e.preventDefault();

  const productCode = document.querySelector('#product-code').value;
  const productName = document.querySelector('#product-name').value;
  const quantity = document.querySelector('#quantity').value;
  const searchForm = document.querySelector('.form-search');
  const productsList = JSON.parse(localStorage.getItem('productsList'));

  //buscar un producto por código
  if (productCode != "" && productCode != null) {
    const foundProduct = productsList.find(product =>
      product.codigo == productCode.toUpperCase()
    );

    if (foundProduct != null) {
      if (foundProduct.cantidad >= quantity) {
        cart(foundProduct, quantity);
        renderProducts();
        searchForm.reset();
      } else {
        alert(`No tiene suficientes productos de ${foundProduct.nombre}`);
      }

    } else {
      alert(`Producto no encontrado`);
    }

  }

  //buscar producto por nombre
  if (productName != "" && productName != null) {
    const foundProduct = productsList.find(product =>
      product.nombre == productName.toUpperCase()
    );

    if (foundProduct != null) {
      if (foundProduct.cantidad >= quantity) {
        cart(foundProduct, quantity);
        renderProducts();
        searchForm.reset();
      } else {
        alert(`No tiene suficientes productos de ${foundProduct.nombre}`);
      }

    } else {
      alert(`Producto no encontrado`);
    }
  }
})

//agregar al carrito
function cart(foundProduct, cant) {
  let carrito = JSON.parse(localStorage.getItem('cart')) || [];
  let cantidad = JSON.parse(localStorage.getItem('quantity')) || [];

  const productIndex = carrito.findIndex(product => product.id === foundProduct.id);

  if (productIndex === -1) {
    carrito.push(foundProduct);
    cantidad.push(cant);

  } else {
    cantidad[productIndex] = parseFloat(cantidad[productIndex]) + parseFloat(cant);
  }

  localStorage.setItem('cart', JSON.stringify(carrito));
  localStorage.setItem('quantity', JSON.stringify(cantidad));
}

function renderProducts() {
  let table = document.querySelector('.product-table tbody');
  const productList = JSON.parse(localStorage.getItem('cart')) || [];
  const cantidad = JSON.parse(localStorage.getItem('quantity')) || [];
  let total = 0;
  let productRow = '';

  if (productList.length < 1) {
    productRow += ``;
    table.innerHTML = productRow;
  } else {
    for (let i = 0; i < productList.length; i++) {
      productRow += `
        <tr>
          <td>${productList[i].codigo}</td>
          <td>${productList[i].nombre}</td>
          <td>${cantidad[i]}</td>
          <td>${productList[i].precio * cantidad[i]}</td>
          <td>
            <a class="btn-td remove-btn" href="#">
              <span class="material-symbols-rounded table-btn">remove</span>
            </a>
          </td>
        </tr>
      `;

      table.innerHTML = productRow;
      total += productList[i].precio * cantidad[i];
    };
  }

  document.querySelector('#total-sale').textContent = total;
}

//eliminar un producto agregado
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  
  document.querySelector('.product-table').addEventListener('click', (e) => {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const cantidad = JSON.parse(localStorage.getItem('quantity')) || [];

    if (e.target.closest('.btn-td.remove-btn')) {
      e.preventDefault();

      const row = e.target.closest('tr');
      const codigoProducto = row.cells[0].textContent;
      
      const productoEncontrado = carrito.find(producto => producto.codigo = codigoProducto);

      const productoIndex = carrito.indexOf(productoEncontrado);

      carrito.splice(productoIndex, 1);
      cantidad.splice(productoIndex, 1);
    
      localStorage.setItem('cart', JSON.stringify(carrito));
      localStorage.setItem('quantity', JSON.stringify(cantidad));
    
      renderProducts();
    }
  })
})

//hacer solicitud de crear venta
document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  const btnPagar = document.querySelector('#send');

  btnPagar.addEventListener('click', async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
    let carrito =  JSON.parse(localStorage.getItem('cart'));
    let cantidad = JSON.parse(localStorage.getItem('quantity'));

    const nuevaVenta = {
      codigo: generarCodigo(),
      total: document.querySelector('#total-sale').textContent,
      metodoPago: document.querySelector('#pay').value
    }

    const ventaDto = {
      venta: nuevaVenta,
      productos: carrito,
      cantidades: cantidad
    }

    let response = await fetch(`http://localhost:8080/api/gavi/nueva-venta/${usuario.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ventaDto)
    })

    if (response.ok) {
      alert('Venta creada correctamente');
    } else {
      alert('La venta no fue creada');
    }

    carrito = [];
    cantidad = [];
    
    localStorage.setItem('cart', JSON.stringify(carrito));
    localStorage.setItem('quantity', JSON.stringify(cantidad));

    renderProducts();
  })
})

function generarCodigo() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';
  for (let i = 0; i < 5; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo.toUpperCase();
}