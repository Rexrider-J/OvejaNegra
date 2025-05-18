/*Permite que se pueda acceder a los formularios de ingresoCliente e ingresoEmpleado desde otras paginas*/
window.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;

    const divCliente = document.getElementById("cliente");
    const divEmpleado = document.getElementById("empleado");

    /* Oculta ambos al principio*/
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

  /* Ocultar primera sección*/
  document.getElementById('seleccionSucursalDeReserva').style.display = 'none';

  /* Mostrar segunda sección*/
  document.getElementById('datosDeReserva').style.display = 'grid';
}

/* Guarda la sucursal seleccionada*/
function guardarSeleccionSucursal(valor) {
  sessionStorage.setItem('sucursalSeleccionada', valor);

  /*Si se encuentra en la pagina reservas, tambien actualizar el valor de dropdown si se cambia el valor del selectoSucursal en la misma pagina*/
  const dropdown = document.getElementById('dropdownReservas');
  if (dropdown) {
    dropdown.value = valor;
  }
}
/* Al cargar la página, recupera el valor de la selección guardada*/
document.addEventListener("DOMContentLoaded", function () {
  const valorGuardado = sessionStorage.getItem('sucursalSeleccionada');
  if (!valorGuardado) return;

  /* Aplica el valor guardado al select del header de la pagina en la que se ubique*/
  const selector = document.getElementById('selectorSucursales');
  if (selector) {
    selector.value = valorGuardado;
  }

  /* Aplica al dropdown de reservas si se encuentra en la pagina pero solo cuando carga la pagina*/
  const dropdown = document.getElementById('dropdownReservas');
  if (dropdown) {
    dropdown.value = valorGuardado;
  }
});

/*Calendario externo Flatpickr*/
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#calendarioReservas", {
    inline: true,             /*Para que el calendario sea siempre visible*/
    dateFormat: "Y-m-d",
    locale: "es",             /*Permite que este en español*/
    minDate: "today",
    onChange: function(selectedDates, dateStr) {
      document.getElementById('fechaReserva').value = dateStr; /* Guarda la fecha seleccionada en el calendario*/
    }
  });
});

/*Muestra la seccion confirmación de reserva y oculta la sección datos de reserva*/
function mostrarSeleccionSucursalReserva() {
  /*Si no se seleccionó ninguna fecha en el calendario aparece el cartel de alerta*/
  const fechaSeleccionada = document.getElementById('fechaReserva').value;
  if (fechaSeleccionada === "") {
    alert("Debe seleccionar una fecha antes de continuar.");
    return;
  }

  const horaSelect = document.getElementById('horaReserva');
  const horaSeleccionada = horaSelect.value;
  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (horaSeleccionada === "") {
    alert("Debe seleccionar un horario antes de continuar.");
    return;
  }
  const personasSelect = document.getElementById('cantPersonasReserva');
  const personasSeleccionadas = personasSelect.value;
  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (personasSeleccionadas === "") {
    alert("Debe indicar la cantidad de personas antes de continuar.");
    return;
  }
  const mesaSelect = document.getElementById('mesaReserva');
  const mesaSeleccionada = mesaSelect.value;
  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (mesaSeleccionada === "") {
    alert("Debe seleccionar una mesa antes de continuar.");
    return;
  }

  /* Ocultar primera sección*/
  document.getElementById('datosDeReserva').style.display = 'none';

  /* Mostrar segunda sección*/
  document.getElementById('confirmacionReserva').style.display = 'grid';
}
/*Permite volver para atras de datos de reserva a selección de sucursal de reserva*/
function volverSeleccionSucursalReserva() {
  /* Ocultar datos de reserva*/
  document.getElementById('datosDeReserva').style.display = 'none';

  /* Mostrar selección de sucursal de reserva*/
  document.getElementById('seleccionSucursalDeReserva').style.display = 'grid';
}
