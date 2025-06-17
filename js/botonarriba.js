// Contenido para botonarriba.js (VERSIÓN CON MÁS DEPURACIÓN)
console.log("Pista 1: Archivo botonarriba.js cargado.");

window.onload = function() {
    console.log("Pista 2: Evento window.onload disparado.");

    var miBoton = document.getElementById("btnVolverArriba");
    
    // Pista 3: Verificamos si el botón fue encontrado
    if (miBoton) {
        console.log("Pista 3: Botón #btnVolverArriba ENCONTRADO en el HTML.", miBoton);

        window.onscroll = function() {
            // Forma más compatible de obtener la posición del scroll vertical
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
            // Pista X: Para ver la posición del scroll (¡esta línea es importante ahora!)
            console.log("Pista X: Scroll detectado, posición actual: " + scrollPos);

            if (scrollPos > 100) { // El umbral para mostrar es 100px
                if (miBoton.style.display !== "block") {
                    console.log("Pista 4: Debería MOSTRAR botón (Scroll > 100px)");
                    miBoton.style.display = "block";
                }
            } else {
                if (miBoton.style.display !== "none") {
                    console.log("Pista 5: Debería OCULTAR botón (Scroll <= 100px)");
                    miBoton.style.display = "none";
                }
            }
        };

        miBoton.onclick = function() {
            console.log("Pista 6: Clic en #btnVolverArriba detectado.");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

    } else {
        // Este mensaje solo aparecería si el botón NO se encuentra al cargar la página.
        console.error("Pista 3 - ERROR: Botón con id 'btnVolverArriba' NO FUE ENCONTRADO en el HTML.");
    }
};