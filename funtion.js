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
    }

    selectPeluche.addEventListener('change', calcularTotal);
    inputCantidad.addEventListener('input', calcularTotal);
    document.querySelectorAll('input[name="radioTamano"]').forEach(r => r.addEventListener('change', calcularTotal));
    document.querySelectorAll('.extra-check').forEach(c => c.addEventListener('change', calcularTotal));

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        setTimeout(() => {
          formPedido.classList.remove('was-validated');
          if (txtTotal) txtTotal.textContent = '$0.00 MXN';
        }, 10);
      });
    }

    formPedido.addEventListener('submit', (e) => {
      e.preventDefault();
      formPedido.classList.add('was-validated');

      if (!formPedido.checkValidity()) {
        Swal.fire({
          icon: 'error',
          title: 'Formulario Incompleto',
          text: 'Por favor, llena correctamente todos los campos obligatorios (*).',
          confirmButtonColor: '#dc3545'
        });
        return;
      }

      const nombre = document.querySelector('#inputNombre').value.trim();
      const pelucheTexto = selectPeluche.options[selectPeluche.selectedIndex].text;
      const totalStr = txtTotal.textContent;

      Swal.fire({
        icon: 'success',
        title: '¡Pedido Registrado con Éxito!',
        html: `
          <div class="text-start fs-6">
            <p><b>¡Gracias, ${nombre}!</b> Hemos registrado tu solicitud.</p>
            <p><b>Producto:</b> ${pelucheTexto}</p>
            <p><b>Total:</b> <span class="text-danger fw-bold">${totalStr}</span></p>
          </div>
        `,
        confirmButtonColor: '#dc3545'
      });

      formPedido.reset();
      formPedido.classList.remove('was-validated');
      if (txtTotal) txtTotal.textContent = '$0.00 MXN';
    });
  }
});