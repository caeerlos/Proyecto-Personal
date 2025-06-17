// Contenido para cargador.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("Cargador.js: DOMContentLoaded disparado."); // Pista A
    const pantallaCarga = document.getElementById('pantalla-carga');
    
    if (pantallaCarga) {
        console.log("Cargador.js: Pantalla de carga encontrada."); // Pista B
        setTimeout(function() {
            console.log("Cargador.js: Añadiendo clase 'oculta' AHORA."); // Pista C
            pantallaCarga.classList.add('oculta');
        }, 2000); // Oculta después de 1000ms (1 segundo). Ajusta este tiempo.
    } else {
        console.error("Cargador.js: ERROR - No se encontró el div #pantalla-carga."); // Pista D
    }
});

    // Para mostrar la pantalla de carga ANTES de ir a una nueva página interna
    const enlacesInternos = document.querySelectorAll('a[href^="/"], a[href^="."]'); // O una selección más específica de tus enlaces de menú
    
    enlacesInternos.forEach(function(enlace) {
        if (enlace.hostname === window.location.hostname || !enlace.hostname) { // Solo enlaces internos
            if (!enlace.hash && enlace.target !== '_blank' && !enlace.href.startsWith('mailto:') && !enlace.href.startsWith('tel:')) { // Excluir anclas, _blank, mailto, tel
                enlace.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Si el enlace es a la misma página o es solo un href="#" no hacemos nada
                    if (href === window.location.pathname + window.location.search + window.location.hash || href === '#') {
                        return;
                    }

                    // Muestra la pantalla de carga
                    if (pantallaCarga) {
                        pantallaCarga.classList.remove('oculta');
                    }
                    // Pequeña demora para que se vea la pantalla de carga antes de navegar
                    // Si no la quieres muy larga, puedes quitar este setTimeout y que la siguiente página
                    // se encargue de ocultarla con su propio setTimeout.
                    // setTimeout(function() {
                    //     window.location.href = href;
                    // }, 100); // Pequeña demora
                });
            }
        }
    });