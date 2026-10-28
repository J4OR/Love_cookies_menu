// Año actual en el pie de página
document.getElementById("anio").textContent = new Date().getFullYear();

// Menú móvil
const boton = document.querySelector(".menu-boton");
const menu = document.getElementById("menu");
if (boton && menu) {
  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
  }));
}

const navMovil = document.querySelector(".nav-movil");
if (navMovil) {
  navMovil.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      navMovil.querySelectorAll("a").forEach((item) => item.classList.remove("activo"));
      enlace.classList.add("activo");
    });
  });
}

// Modal de producto
const modalProducto = document.getElementById("modal-producto");
const modalImagen = document.getElementById("modal-producto-imagen");
const modalTitulo = document.getElementById("modal-producto-titulo");
const modalDescripcion = document.getElementById("modal-producto-descripcion");
const modalPrecio = document.getElementById("modal-producto-precio");
const cerrarModal = document.querySelector(".modal-producto__cerrar");

function abrirModalProducto(card) {
  if (!modalProducto || !modalImagen || !modalTitulo || !modalDescripcion || !modalPrecio) return;

  modalImagen.src = card.dataset.image;
  modalImagen.alt = card.dataset.name;
  modalTitulo.textContent = card.dataset.name;
  modalDescripcion.textContent = card.dataset.description;
  modalPrecio.textContent = card.dataset.price;
  modalProducto.classList.add("activo");
  modalProducto.setAttribute("aria-hidden", "false");
}

function cerrarModalProducto() {
  if (!modalProducto) return;
  modalProducto.classList.remove("activo");
  modalProducto.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".tarjeta").forEach((card) => {
  const botonTarjeta = card.querySelector(".tarjeta__boton");
  if (!botonTarjeta) return;

  botonTarjeta.addEventListener("click", () => abrirModalProducto(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirModalProducto(card);
    }
  });
});

if (cerrarModal) {
  cerrarModal.addEventListener("click", cerrarModalProducto);
}

if (modalProducto) {
  modalProducto.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true" || event.target === modalProducto) {
      cerrarModalProducto();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalProducto && modalProducto.classList.contains("activo")) {
    cerrarModalProducto();
  }
});
