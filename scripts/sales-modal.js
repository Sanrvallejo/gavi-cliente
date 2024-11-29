const modalContent = document.querySelectorAll('.modal')[0];
const modal = document.querySelectorAll('.content-modal')[0];
const open = document.querySelectorAll(".btn-td")[0];
const close = document.querySelectorAll('.close')[0];

if (open) {
  open.addEventListener('click', (e) => {
    e.preventDefault()
    modalContent.style.opacity = "1";
    modalContent.style.visibility = "visible";
    modal.classList.toggle('modal-close');
  });
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