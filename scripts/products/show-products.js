
document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();
  const productsList = await getProducts();
  renderProducts(productsList);
})

function renderProducts(productsList) {
  let table = document.querySelector('.product-table tbody');
  let productRow = '';

  if (productsList.length < 1) {
    productRow += ``;
    table.innerHTML = productRow;
  } else {
    productsList.forEach(product => {
      productRow += `
        <tr>
          <td>${product.codigo}</td>
          <td>${product.nombre}</td>
          <td>${product.categoria}</td>
          <td>${product.cantidad}</td>
          <td>${product.precio}</td>
          <td>
            <a class="btn-td edit-btn" href="edit-product.html">
              <span class="material-symbols-rounded table-btn">edit</span>
            </a>
            <a class="btn-td remove-btn" href="#">
              <span class="material-symbols-rounded table-btn">remove</span>
            </a>
          </td>
        </tr>
      `;

      table.innerHTML = productRow;
    });
  }
}

async function getProducts() {
  try {
    let response = await fetch('http://localhost:8080/api/gavi/productos', {
      method: 'GET'
    });

    if (response.ok) {

      if (response.status == 204) {
        localStorage.setItem('productsList', "");
      }

      newProductsList = await response.json();

      localStorage.setItem('productsList', JSON.stringify(newProductsList));

      return newProductsList;
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  
  const productCode = document.querySelector('#product-code').value;
  const productName = document.querySelector('#product-name').value;
  const productsList = JSON.parse(localStorage.getItem('productsList'));
  const searchForm = document.querySelector('.form-search');
  
  //buscar un producto por código
  if (productCode != "" && productCode != null) {
    const foundProduct = productsList.filter(product =>
      product.codigo.toLowerCase().includes(productCode)
    );
    
    if (foundProduct != null || foundProduct.length < 0) {
      searchForm.reset();
      renderProducts(foundProduct);
    } else {
      renderProducts([]);
    }

  } 
  
  if (productName != "" && productName != null) { //buscar producto por nombre
    const foundProduct = productsList.filter(product =>
      product.nombre.toLowerCase().includes(productName)
    );
    
    if (foundProduct != null || foundProduct.length < 0) {
      searchForm.reset();
      renderProducts(foundProduct);
    } else {
      renderProducts([]);
    }
  }

})