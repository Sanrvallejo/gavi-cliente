document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();
  const usuario = JSON.parse(localStorage.getItem('loggedInUser'));

  try {
    let response = await fetch(`http://localhost:8080/api/gavi/ventas/${usuario.id}`, {
      method: 'GET'
    })
  
    if (response.ok) {

      if (response.status == 204) {
        localStorage.setItem('salesList', "");
      }

      const newSalesList = await response.json();

      localStorage.setItem('salesList', JSON.stringify(newSalesList));

      renderizarProductos(newSalesList);
    }
  } catch (error) {
    console.log(error);
  }
})

function renderizarProductos() {
  const salesList = JSON.parse(localStorage.getItem('salesList') || []);
  let table = document.querySelector('.sale-table tbody');
  let saleRow = '';

  if (salesList.length < 1) {
    saleRow += ``;
    table.innerHTML = saleRow;
  } else {
    salesList.forEach(sale => {
      saleRow += `
        <tr>
          <td>${sale.fecha}</td>
          <td>${sale.codigo}</td>
          <td>${sale.metodoPago}</td>
          <td>${sale.total}</td>
          <td>
            <a class="btn-td details-btn" href="#">
              <span class="material-symbols-rounded">
                view_list
              </span>
            </a>
          </td>
        </tr>
      `;

      table.innerHTML = saleRow;
    });
  }
}