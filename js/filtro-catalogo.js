// Contenido para js/filtro-catalogo.js
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const marcaFiltro = params.get('marca'); // Obtiene el valor del parámetro 'marca'

    const todosLosProductos = document.querySelectorAll('#catalogo .product-card-minimal'); // Selecciona las tarjetas directamente

    if (marcaFiltro) { // Si hay un filtro de marca en la URL
        document.querySelectorAll('#catalogo .product-category').forEach(function(categorySection) {
            categorySection.style.display = 'none'; // Oculta las secciones de categoría si las tienes
        });
         // También podrías querer cambiar el título de la página del catálogo
        const tituloCatalogo = document.querySelector('#catalogo h2'); // Asegúrate que este selector siga siendo el correcto para tu título
		if (tituloCatalogo) {
		if (marcaFiltro === 'apple') {
        tituloCatalogo.textContent = 'Correas para Apple Watch'; // ¡AQUÍ ESTÁ EL CAMBIO!
		} else if (marcaFiltro === 'huawei') {
        // Para Huawei, podrías querer algo como 'Correas para Huawei Watch' o mantener el actual
        tituloCatalogo.textContent = 'Correas para Huawei Watch'; // O 'Correas para Huawei Watch'
		} else if (marcaFiltro === 'samsung') {
        // Para Samsung
        tituloCatalogo.textContent = 'Correas para Samsung Galaxy Watch'; // O como prefieras
		} else {
        // Título genérico para otras marcas no especificadas arriba
        // Esta línea pone la primera letra en mayúscula, ej. "xiaomi" -> "Xiaomi"
        let nombreMarcaFormateado = marcaFiltro.charAt(0).toUpperCase() + marcaFiltro.slice(1);
        tituloCatalogo.textContent = 'Correas para ' + nombreMarcaFormateado;
			}
		}


        todosLosProductos.forEach(function(producto) {
            const marcaProducto = producto.getAttribute('data-marca');
            // Dentro de todosLosProductos.forEach en filtro-catalogo.js:
			if (marcaProducto === marcaFiltro) {
			producto.closest('.col').style.display = 'block'; // CAMBIADO a '.col'
			} else {
			producto.closest('.col').style.display = 'none';  // CAMBIADO a '.col'
			}
        });
    } else {
        // Si no hay filtro, muestra todos los productos (ya deberían estar visibles por defecto)
        // y todas las secciones de categoría si las tienes.
        document.querySelectorAll('#catalogo .product-category').forEach(function(categorySection) {
            categorySection.style.display = 'block';
        });
        todosLosProductos.forEach(function(producto) {
		producto.closest('.col').style.display = 'block'; // CAMBIADO a '.col'
		});
        const tituloCatalogo = document.querySelector('#catalogo h2');
        if (tituloCatalogo) {
             tituloCatalogo.textContent = 'Nuestro Catálogo'; // Título por defecto
        }
    }
});