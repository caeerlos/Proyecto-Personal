// Contenido para js/variantes-color.js

function cambiarImagenProducto(idImagen, nuevaRutaImagen, swatchSeleccionado) {
    const imagenProducto = document.getElementById(idImagen);
    if (imagenProducto) {
        imagenProducto.src = nuevaRutaImagen; // Cambia la fuente de la imagen principal
    }

    // Opcional: Marcar el swatch de color como "seleccionado"
    // Primero, quita la clase 'selected' de cualquier otro swatch del mismo producto
    const swatchesHermanos = swatchSeleccionado.parentNode.querySelectorAll('.color-swatch');
    swatchesHermanos.forEach(function(swatch) {
        swatch.classList.remove('selected');
    });
    // Luego, añade la clase 'selected' al swatch en el que se hizo clic
    swatchSeleccionado.classList.add('selected');
}