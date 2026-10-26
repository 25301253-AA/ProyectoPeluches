document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

  const formPedido = document.querySelector('#formPedido');

  if (formPedido) {
    const selectPeluche = document.querySelector('#selectPeluche');
    const inputCantidad = document.querySelector('#inputCantidad');
    const txtTotal = document.querySelector('#txtTotal');
    const btnReset = document.querySelector('#btnReset');

    function calcularTotal() {
      const precioBase = parseFloat(selectPeluche.value) || 0;
      const cantidad = parseInt(inputCantidad.value) || 1;
      const radioTamano = document.querySelector('input[name="radioTamano"]:checked');
      const costoTamano = radioTamano ? parseFloat(radioTamano.value) : 0;

      let costoExtras = 0;
      document.querySelectorAll('.extra-check:checked').forEach(cb => {
        costoExtras += parseFloat(cb.value);
      });

      const totalFinal = precioBase > 0 ? (precioBase + costoTamano + costoExtras) * cantidad : 0;
      if (txtTotal) txtTotal.textContent = `$${totalFinal.toFixed(2)} MXN`;
