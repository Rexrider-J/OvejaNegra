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
  const sucursalSelect = document.getElementById("dropdownReservas");
  const sucursalSeleccionada = sucursalSelect.value;
  const sucursalSeleccionadaNombre = sucursalSelect.options[sucursalSelect.selectedIndex].text;

  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (sucursalSeleccionada === "") {
    alert("Debe seleccionar una sucursal antes de continuar.");
    return;
  }

  /*Guardo los valores en el sessionStorage*/
  sessionStorage.setItem("sucursalValor", sucursalSeleccionada);
  sessionStorage.setItem("sucursalNombre", sucursalSeleccionadaNombre);

  /* Ocultar primera sección*/
  document.getElementById("seleccionSucursalDeReserva").style.display = "none";

  /* Mostrar segunda sección*/
  document.getElementById("datosDeReserva").style.display = "grid";
}

/* Guarda la sucursal seleccionada*/
function guardarSeleccionSucursal(valor) {
  sessionStorage.setItem("sucursalSeleccionada", valor);

  /*Si se encuentra en la pagina reservas, tambien actualizar el valor de dropdown si se cambia el valor del selectoSucursal en la misma pagina*/
  const dropdown = document.getElementById("dropdownReservas");
  if (dropdown) {
    dropdown.value = valor;
  }
}
/* Al cargar la página, recupera el valor de la selección guardada*/
document.addEventListener("DOMContentLoaded", function () {
  const valorGuardado = sessionStorage.getItem("sucursalSeleccionada");
  if (!valorGuardado) return;

  /* Aplica el valor guardado al select del header de la pagina en la que se ubique*/
  const selector = document.getElementById("selectorSucursales");
  if (selector) {
    selector.value = valorGuardado;
  }

  /* Aplica al dropdown de reservas si se encuentra en la pagina pero solo cuando carga la pagina*/
  const dropdown = document.getElementById("dropdownReservas");
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
      document.getElementById("fechaReserva").value = dateStr; /* Guarda la fecha seleccionada en el calendario*/
    }
  });
});
/*Cada vez que el usuario precione una tecla dentro del textarea observacionesReserva, si es un caracter especial no lo permite incluir*/
document.getElementById('observacionesReserva').addEventListener('keydown', function (e) {
  /*brinda el caracter que se intenta ingresar*/
  const tecla = e.key;
  /*Se definen los caracteres permitidos en las letrasPermitidas*/
  const letrasPermitidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/;
  /*Si la tecla no esta en letrasPermitidas, ni es un espacio, un delete, un arrowLeft(flecha izquierda) o arrowRight(flecha derecha) no se permite que se escriba*/
  if (!letrasPermitidas.test(tecla) && tecla !== 'Backspace' && tecla !== 'Delete' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
    /* bloquea la tecla para que no se escriba*/
    e.preventDefault(); 
  }
});

/*Muestra la seccion confirmación de reserva y oculta la sección datos de reserva*/
function mostrarSeleccionSucursalReserva() {
  /*Si no se seleccionó ninguna fecha en el calendario aparece el cartel de alerta*/
  const fechaSeleccionada = document.getElementById("fechaReserva").value;
  if (fechaSeleccionada === "") {
    alert("Debe seleccionar una fecha antes de continuar.");
    return;
  }
  sessionStorage.setItem("fechaSeleccionada", fechaSeleccionada);

  const horaSelect = document.getElementById("horaReserva");
  const horaSeleccionada = horaSelect.value;
  sessionStorage.setItem("horaSeleccionada", horaSeleccionada);

  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (horaSeleccionada === "") {
    alert("Debe seleccionar un horario antes de continuar.");
    return;
  }
  const personasSelect = document.getElementById("cantPersonasReserva");
  const personasSeleccionadas = personasSelect.value;
  sessionStorage.setItem("personasSeleccionadas", personasSeleccionadas);

  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (personasSeleccionadas === "") {
    alert("Debe indicar la cantidad de personas antes de continuar.");
    return;
  }

  const mesaSelect = document.getElementById("mesaReserva");
  const mesaSeleccionada = mesaSelect.value;
  sessionStorage.setItem("mesaSeleccionada", mesaSeleccionada);

  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (mesaSeleccionada === "") {
    alert("Debe seleccionar una mesa antes de continuar.");
    return;
  }
  /*Guardar observacion dada por el usuario*/
  const Observacion = document.getElementById("observacionesReserva");
  const ObservacionDada = Observacion.value;
  sessionStorage.setItem("ObservacionDada", ObservacionDada);

  /*Insertar los datos en la siguiente pagina de confirmación*/
  document.getElementById("sucursalSeleccionada").textContent = sessionStorage.getItem("sucursalNombre");
  document.getElementById("fechaSeleccionada").textContent = sessionStorage.getItem("fechaSeleccionada");
  document.getElementById("horaSeleccionada").textContent = sessionStorage.getItem("horaSeleccionada");
  document.getElementById("cantPersonasSeleccionada").textContent = sessionStorage.getItem("personasSeleccionadas") + " persona/s";
  document.getElementById("mesaSeleccionada").textContent = sessionStorage.getItem("mesaSeleccionada");
  document.getElementById("ObservacionDada").textContent = sessionStorage.getItem("ObservacionDada");

  /* Ocultar primera sección*/
  document.getElementById("datosDeReserva").style.display = "none";

  /* Mostrar segunda sección*/
  document.getElementById("confirmacionReserva").style.display = "grid";
}
/*Permite volver para atras de datos de reserva a selección de sucursal de reserva*/
function volverSeleccionSucursalReserva() {
  /* Ocultar datos de reserva*/
  document.getElementById("datosDeReserva").style.display = "none";

  /* Mostrar selección de sucursal de reserva*/
  document.getElementById("seleccionSucursalDeReserva").style.display = "grid";
}

function volverSeleccionDatosReserva() {
  /* Ocultar confirmación de reserva*/
  document.getElementById("confirmacionReserva").style.display = "none";

  /* Mostrar datos reserva*/
  document.getElementById("datosDeReserva").style.display = "grid";
}
function enviarReserva(){
  /* Recupera los datos desde sessionStorage y campos*/
  const sucursal = sessionStorage.getItem("sucursalSeleccionada");
  const fecha = sessionStorage.getItem("fechaReserva");
  const hora = sessionStorage.getItem("horaReserva");
  const cantidad = sessionStorage.getItem("cantPersonasReserva");
  const mesa = sessionStorage.getItem("mesaReserva");
  const observaciones = sessionStorage.getItem("observacionesReserva");

  /* Asignar al formulario oculto */
  const form = document.getElementById("formReservaFinal");
  form.elements["sucursal"].value = sucursal;
  form.elements["fecha"].value = fecha;
  form.elements["hora"].value = hora;
  form.elements["cantidad"].value = cantidad;
  form.elements["mesa"].value = mesa;
  form.elements["observaciones"].value = observaciones;

  /*form.submit(); // Enviar el formulario

  /* Ocultar confirmación de reserva*/
  document.getElementById("confirmacionReserva").style.display = "none";

  /* Mostrar datos reserva*/
  document.getElementById("finalizoReserva").style.display = "grid";
}