document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  document.querySelector('.sale-table').addEventListener('click', async (e) => {

    const ventas = JSON.parse(localStorage.getItem('salesList'));

    if (e.target.closest('.btn-td.details-btn')) {
      e.preventDefault();

      const row = e.target.closest('tr');
      const codigoVenta = row.cells[1].textContent;

      const ventaEncontrada = ventas.find(v => v.codigo == codigoVenta);

      try {
        let response = await fetch(`http://localhost:8080/api/gavi/detalle-venta/${ventaEncontrada.id}`, {
          method: 'GET'
        })

        if (response.ok) {

          if (response.status == 204) {
            localStorage.setItem('detailList', "");
          }

          const detalle = await response.json();

          localStorage.setItem('detailList', JSON.stringify(detalle));

          openModal();
          renderizarDetalles();
        }
      } catch (error) {
        console.log(error);

      }
    }
  })
})

function renderizarDetalles() {
  const detalleList = JSON.parse(localStorage.getItem('detailList') || []);
  let table = document.querySelector('.detail-table tbody');
  let detailRow = '';

  if (detalleList.length < 1) {
    detailRow += ``;
    table.innerHTML = detailRow;
  } else {
    detalleList.forEach(detail => {
      detailRow += `
        <tr>
          <td>${detail.venta.fecha}</td>
          <td>${detail.venta.codigo}</td>
          <td>${detail.producto.codigo}</td>
          <td>${detail.producto.nombre}</td>
          <td>${detail.cantidad}</td>
          <td>${detail.precioUnitario}</td>
          <td>${detail.subtotal}</td>
        </tr>
      `;

      table.innerHTML = detailRow;
    });
  }
}

const modalContent = document.querySelectorAll('.modal')[0];
const modal = document.querySelectorAll('.content-modal')[0];
const open = document.querySelectorAll(".btn-td")[0];
const close = document.querySelectorAll('.close')[0];

function openModal() {
  modalContent.style.opacity = "1";
  modalContent.style.visibility = "visible";
  modal.classList.toggle('modal-close');
}

if (close) {
  close.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.toggle('modal-close');
    setTimeout(() => {
      modalContent.style.opacity = "0";
      modalContent.style.visibility = "hidden";
    }, 800);
  });
}

if (modalContent) {
  modalContent.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target == modalContent) {
      modal.classList.toggle('modal-close');
      setTimeout(() => {
        modalContent.style.opacity = "0";
        modalContent.style.visibility = "hidden";
      }, 600);
    }
  });
}