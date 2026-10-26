document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de animaciones AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ 
      duration: 800, 
      once: true 
    });
  }
  const formPedido = document.querySelector('#formPedido');
  if (formPedido) {
    const selectPeluche = document.querySelector('#selectPeluche');
    const inputCantidad = document.querySelector('#inputCantidad');
    const txtTotal = document.querySelector('#txtTotal');
    const btnReset = document.querySelector('#btnReset');
        // calcular el total dinámicamente en tiempo real
    function calcularTotal() {
      const precioBase = parseFloat(selectPeluche.value) || 0;
      const cantidad = parseInt(inputCantidad.value) || 1;
      // Obtener costo del tamaño seleccionado
      const radioTamano = document.querySelector('input[name="radioTamano"]:checked');
      const costoTamano = radioTamano ? parseFloat(radioTamano.value) : 0;
      // Obtener suma de los adicionales seleccionados
      let costoExtras = 0;
      document.querySelectorAll('.extra-check:checked').forEach(cb => {
        costoExtras += parseFloat(cb.value);
      });
