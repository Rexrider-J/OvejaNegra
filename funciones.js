/*Permite que se pueda acceder a los formularios de ingresoCliente e ingresoEmpleado desde otras paginas*/
window.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;

    const divCliente = document.getElementById("cliente");
    const divEmpleado = document.getElementById("empleado");

    // Oculta ambos al principio
    if (divCliente) divCliente.style.display = "none";
    if (divEmpleado) divEmpleado.style.display = "none";

    if (hash === "#cliente" && divCliente) {
      divCliente.style.display = "grid";
    } else if (hash === "#empleado" && divEmpleado) {
      divEmpleado.style.display = "grid";
    }
  });
/*Funciona para mostrar el formulario de ingresoCliente e ingresoEmpleado desde alguno de estos.*/
function mostrarFormulario(tipo) {
    document.getElementById("cliente").style.display = "none";
    document.getElementById("empleado").style.display = "none";
  
    if (tipo === "botonCliente") {
      document.getElementById("cliente").style.display = "grid";
    } else if (tipo === "botonEmpleado") {
      document.getElementById("empleado").style.display = "grid";
    }
}
/*Muestra la seccion datos de reserva y oculta la sección seleccionar sucursal de reseva*/
function mostrarDatosDeReserva() {
  const select = document.getElementById('dropdownReservas');
  const seleccion = select.value;
  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (seleccion === "") {
    alert("Debe seleccionar una sucursal antes de continuar.");
    return;
  }

  // Ocultar primera sección
  document.getElementById('seleccionSucursalDeReserva').style.display = 'none';

  // Mostrar segunda sección
  document.getElementById('datosDeReserva').style.display = 'grid';
}

// Guarda la sucursal seleccionada
function guardarSeleccionSucursal(valor) {
  sessionStorage.setItem('sucursalSeleccionada', valor);

  //Si se encuentra en la pagina reservas, tambien actualizar el valor de dropdown si se cambia el valor del selectoSucursal en la misma pagina
  const dropdown = document.getElementById('dropdownReservas');
  if (dropdown) {
    dropdown.value = valor;
  }
}
// Al cargar la página, recupera el valor de la selección guardada
document.addEventListener("DOMContentLoaded", function () {
  const valorGuardado = sessionStorage.getItem('sucursalSeleccionada');
  if (!valorGuardado) return;

  // Aplica el valor guardado al select del header de la pagina en la que se ubique
  const selector = document.getElementById('selectorSucursales');
  if (selector) {
    selector.value = valorGuardado;
  }

  // Aplica al dropdown de reservas si se encuentra en la pagina pero solo cuando carga la pagina
  const dropdown = document.getElementById('dropdownReservas');
  if (dropdown) {
    dropdown.value = valorGuardado;
  }
});

//Calendario externo Flatpickr//
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#calendarioReservas", {
    inline: true,                      //Para que el calendario sea siempre visible
    dateFormat: "Y-m-d",
    locale: "es",             //Permite que este en español
    minDate: "today",
    disable: ["2025-05-10", "2025-05-25"], // Fechas bloqueadas
    onChange: function(selectedDates, dateStr, instance) {
      console.log("Fecha seleccionada:", dateStr);
    }
  });
});