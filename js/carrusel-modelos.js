function scrollModelos(direction) {
  const container = document.getElementById('modelos-scroll');
  // Calcula cuánto se va a mover. Usamos el ancho de una tarjeta + el gap.
  // El 250 corresponde al 'width' que definimos en el CSS para .modelo-card.
  // El 16 corresponde a 1rem de 'gap' (asumiendo que 1rem = 16px).
  const scrollAmount = 250 + 16; 
  
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}