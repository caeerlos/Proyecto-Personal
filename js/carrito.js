// (Inicio de js/carrito.js)

// 1. Selección de Elementos del DOM (incluyendo los necesarios para el header)
const contadorHeader = document.getElementById('carrito-contador'); // Para el contador en el header
const listaCarritoModal = document.getElementById('lista-carrito');
const totalCarritoModal = document.getElementById('total-carrito');
const finalizarBtnModal = document.getElementById('btn-finalizar');
const botonesAgregarProducto = document.querySelectorAll('.add-to-cart'); // Botones "Añadir al carrito"

// 2. Constantes y Carga Inicial del Carrito desde localStorage
const NOMBRE_KEY_LOCAL_STORAGE = 'betaGarCarrito'; // Usamos una clave específica
let carrito = JSON.parse(localStorage.getItem(NOMBRE_KEY_LOCAL_STORAGE)) || [];

// 3. Función para Guardar el Carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem(NOMBRE_KEY_LOCAL_STORAGE, JSON.stringify(carrito));
}

// 4. Lógica para los botones "Añadir al carrito" (reemplaza parte del script HTML eliminado)
// Esta sección se encarga de lo que hacía el document.querySelectorAll('.add-to-cart').forEach en tu HTML
botonesAgregarProducto.forEach(btn => {
    btn.addEventListener('click', () => {
        const nombre = btn.dataset.name;
        const precio = parseFloat(btn.dataset.price);

        const itemExistente = carrito.find(item => item.nombre === nombre);

        if (itemExistente) {
            itemExistente.cantidad += 1; // Incrementa cantidad si ya existe
        } else {
            carrito.push({ nombre, precio, cantidad: 1 }); // Añade nuevo item con cantidad 1
        }
        // Después de modificar el array 'carrito', actualizamos todo
        actualizarVisualizacionYGuardarCarrito();
    });
});

// 5. Función para Actualizar el Contador del Header (reemplaza updateCartCount() del HTML)
// Esta función se encarga de actualizar el número en el ícono del carrito en el header
function actualizarContadorDelHeader() {
    const cantidadTotalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorHeader.textContent = cantidadTotalItems;
    contadorHeader.style.display = cantidadTotalItems > 0 ? 'inline-block' : 'none';
}

// 6. Función para Renderizar el Contenido del Modal del Carrito
function renderizarContenidoModal() {
    listaCarritoModal.innerHTML = ''; // Limpiar lista actual
    let totalGeneral = 0;

    if (carrito.length === 0) {
        listaCarritoModal.innerHTML = '<li class="list-group-item">Tu carrito está vacío.</li>';
    } else {
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            // (Aquí va el innerHTML para cada item del carrito en el modal, como te mostré antes)
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="fw-semibold text-dark" style="flex-basis: 50%;">${item.nombre}</div>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-primary disminuir-item" data-index="${index}">−</button>
                        <span class="badge bg-primary rounded-pill">${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-primary aumentar-item" data-index="${index}">+</button>
                        <span class="ms-2 fw-bold" style="min-width: 70px; text-align: right;">$${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                        <button class="btn btn-sm btn-danger eliminar-item ms-2" data-index="${index}">&times;</button>
                    </div>
                </div>
            `;
            listaCarritoModal.appendChild(li);
            totalGeneral += item.precio * item.cantidad;
        });
    }
    totalCarritoModal.textContent = totalGeneral.toLocaleString('es-CL');

    // Actualizar enlace de WhatsApp
    let mensajeWhatsApp = 'Hola! Me gustaría pedir las siguientes correas:\n';
    carrito.forEach(item => {
        mensajeWhatsApp += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-CL')}\n`;
    });
    mensajeWhatsApp += `Total: $${totalGeneral.toLocaleString('es-CL')}`;
	finalizarBtnModal.href = `https://wa.me/56949760364?text=${encodeURIComponent(mensajeWhatsApp)}`;
    finalizarBtnModal.style.display = carrito.length > 0 ? 'block' : 'none';
}

// 7. Delegación de Eventos para botones (+, -, eliminar) DENTRO del modal
listaCarritoModal.addEventListener('click', (event) => {
    const target = event.target;
    // Asegurarse que el data-index se obtiene del botón correcto
    const botonConIndex = target.closest('[data-index]');
    if (!botonConIndex) return; // Si no se hizo clic en algo con data-index, salir

    const index = parseInt(botonConIndex.dataset.index);

    if (target.classList.contains('aumentar-item')) {
        carrito[index].cantidad += 1;
    } else if (target.classList.contains('disminuir-item')) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1); // Elimina si la cantidad llega a 0
        }
    } else if (target.classList.contains('eliminar-item')) {
        carrito.splice(index, 1);
    }
    // Después de modificar el array 'carrito', actualizamos todo
    actualizarVisualizacionYGuardarCarrito();
});

// 8. Función Orquestadora para Actualizar Todo y Guardar
function actualizarVisualizacionYGuardarCarrito() {
    renderizarContenidoModal();         // Actualiza el modal
    actualizarContadorDelHeader();      // Actualiza el contador del header
    guardarCarritoEnLocalStorage();     // Guarda en localStorage
}

// 9. Llamada Inicial para Configurar el Carrito al Cargar la Página
// Esto asegura que el contador del header y el modal reflejen el carrito guardado
actualizarVisualizacionYGuardarCarrito();

// (Fin de js/carrito.js)