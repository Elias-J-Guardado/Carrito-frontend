const modal = document.querySelector('#modal');
const abrirModal = document.querySelector('#abrir-carrito');
const cerrarModal = document.querySelector('#cerrarModal');
const carrito = document.querySelector('#carrito');
const listaLibros = document.querySelector('#productos');
const contenedorCarrito = document.querySelector('.tbody-scroll');
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const comprar = document.querySelector('#comprar')
let productosCarrito = [];

cargarAddEventListeners();

function cargarAddEventListeners() {
    listaLibros.addEventListener('click', agregarLibro);

    carrito.addEventListener('click', eliminarCarrito);

    comprar.addEventListener('click', comprarbtn);

    vaciarCarrito.addEventListener('click', ()=>{
        productosCarrito = [];
        limpiarHtml();
        SincStorage();
    })

    document.addEventListener('DOMContentLoaded', () =>{
        llamarLocalStorage();
    });

     abrirModal.addEventListener('click', () => {
        modal.showModal();
    })

    cerrarModal.addEventListener('click', () => {
        modal.close();
    })
}

function comprarbtn(e) {
    e.preventDefault();
    alert(`tempralmente la opción de comprar no está disponible`);
}


function agregarLibro(e) {
    e.preventDefault()
    if (e.target.classList.contains('carrito-btn')) {
        const libroSeleccionado = e.target.closest('.card');

        leerDatosLibro(libroSeleccionado);
    }
}

function eliminarCarrito(e) {
    e.preventDefault()

    const btnEliminar = e.target.closest('.eliminar-btn');
    if (btnEliminar) {
        const libroId = btnEliminar.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(libro => libro.id !== libroId);
        carritoHTLM();
    }

    // if (e.target.classList.contains('.eliminar-btn')) {
    //     const libroId = e.target.getAttribute('data-id');
    //     productosCarrito = productosCarrito.filter( libro => libro.id !== libroId);
    //     carritoHTLM();
    // }
}


function leerDatosLibro(libro) {
    // console.log(libro)
    const infoLibro = {
        imagen: libro.querySelector('img').src,
        titulo: libro.querySelector('h4').textContent,
        precio: libro.querySelector('.precio').textContent,
        id: libro.querySelector('.carrito-btn').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = productosCarrito.some(libro => libro.id === infoLibro.id);
    if (existe) {
        const libros = productosCarrito.map(libro => {
            if (libro.id === infoLibro.id) {
                libro.cantidad++;
                return libro;
            }else{
                return libro;
            }
        });
        productosCarrito = [...libros];
    }else{
        productosCarrito = [...productosCarrito, infoLibro];
    }

    console.log(productosCarrito);

    carritoHTLM();
}

function SincStorage() {
    localStorage.setItem('producto', JSON.stringify(productosCarrito))
}

function llamarLocalStorage() {
    productosCarrito = JSON.parse(localStorage.getItem('producto') || []);
    carritoHTLM();
}

function carritoHTLM() {
    limpiarHtml();

    productosCarrito.forEach(libro => {
        const { imagen, titulo, precio, id, cantidad } = libro;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" alt=${titulo} width="100"/></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="eliminar-btn" data-id="${id}">
                    <i class="fas fa-trash"></i>
                </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);

    });
    SincStorage();
}

function limpiarHtml() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}