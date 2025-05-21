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
document.querySelectorAll('.solo-letras').forEach(function(campo) {
  /*Evento para controlar las teclas que se presionan al escribir*/
  campo.addEventListener('keydown', function(e) {
    const tecla = e.key;
    /*Permite letras (mayúsculas y minúsculas), tildes, ñ, Ñ, apóstrofe y espacio*/
    const letrasPermitidas = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ' ]$/;
    /*Teclas especiales que también permitimos: espacio, borrar, flecha izquierda y derecha, el tab y enter*/
    const teclasEspeciales = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];

    /*Si la tecla no está permitida y no es especial, se bloquea la acción*/
    if (!letrasPermitidas.test(tecla) && !teclasEspeciales.includes(tecla)) {
      e.preventDefault();
    }
  });
  /*Evento que se activa cuando cambia el contenido del campo coincluye pegar)*/
  campo.addEventListener('input', function() {
    /*Reemplaza cualquier caracter que no esté permitido por nada ''*/
    campo.value = campo.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ' ]/g, '');
  });

  /*Evento que detecta cuando se intenta pegar texto en el campo*/
  campo.addEventListener('paste', function(e) {
    /* Obtiene el texto que se intenta pegar*/
    const textoPegado = (e.clipboardData || window.clipboardData).getData('text');
    /* Si el texto pegado contiene caracteres no permitidos, se bloquea el pegado y muestra alerta*/
    if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ' ]/.test(textoPegado)) {
      e.preventDefault();
      alert('Solo se permiten letras, espacios y apóstrofes.');
    }
  });
});
document.querySelectorAll('.solo-numeros').forEach(function(campo) {
  /*Permite solo números y tab, delete, enter y las fechas de direccion izquierda y derecha*/
  campo.addEventListener('keydown', function(e) {
    const tecla = e.key;
    const numerosPermitidos = /^[0-9]$/;
    const teclasEspeciales = ['Backspace','Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];

    /*Si la tecla no está permitida y no es especial, se bloquea la acción*/
    if (!numerosPermitidos.test(tecla) && !teclasEspeciales.includes(tecla)) {
      e.preventDefault();
    }
  });
  /* Limpia cualquier caracter no numérico en el input, útil para pegar o escribir de otras formas*/
  campo.addEventListener('input', function() {
    campo.value = campo.value.replace(/[^0-9]/g, '');
  });

  /* Bloquea pegar texto con caracteres no numéricos*/
  campo.addEventListener('paste', function(e) {
    /* Obtiene el texto que se intenta pegar*/
    const textoPegado = (e.clipboardData || window.clipboardData).getData('text');
    /* Si el texto pegado contiene caracteres no permitidos, se bloquea el pegado y muestra alerta*/
    if (/[^0-9]/.test(textoPegado)) {
      e.preventDefault();
      alert('Solo se permiten números.');
    }
  });
});
/*Valida el numero de telefono en los formatos: */
function validarTelefono() {
  const tel = document.getElementById("telefono").value;
  const regex = /^\+?[\d\s\-()]{7,15}$/;

  if(regex.test(tel)) {
    alert("Número válido");
  } else {
    alert("Número inválido");
  }
}
/*Para validad el input date de la fecha de nacimiento en la parte de registrarse cliente*/
document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('fecha-nacimiento');
  /*Se coloca el año actual y la fecha de hoy en variables*/
  const hoy = new Date();
  const añoActual = hoy.getFullYear();
  /*en la variable minimo se pone la fecha 1921-01-01 y en la maxima el año anterior al actual, mes 12, dia 31*/ 
  /*Minimo 1921-01-01*/
  const min = '1921-01-01';
  /*Maximo el 31 de diciembre del año anterior*/
  const max = `${añoActual - 1}-12-31`; 
  /*Se colocan las variables en los valores maximos y minimos que puede tomar el input*/
  fechaInput.min = min;
  fechaInput.max = max;
});
/* Validar formato de email ejemplo@ejemplo.ejemplo*/
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return re.test(email);
}
/* Función que se ejecuta al enviar el formulario en el boton registrarse*/
function submitRegistrar(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  const emailInput = document.getElementById('email-usuario-registro');
  const email = emailInput.value.trim();
  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    emailInput.value = '';
    emailInput.focus();
    return false;
  }
  /*Si el formato es valido aparece este cartel*/
  alert('Email válido. Los datos serían enviados al servidor (simulado).');
  return false;
}
/*Funcion que se ejecuta al enviar el formulario en el boton iniciar sesion cliente*/
function submitAccederCliente(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  const emailInput = document.getElementById('email-usuario-login');
  const email = emailInput.value.trim();
  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    emailInput.value = '';
    emailInput.focus();
    return false;
  }
  /*Si el formato es valido aparece este cartel*/
  alert('Email válido. Los datos serían enviados al servidor (simulado).');
  return false;
}
/*Funcion que se ejecuta al enviar el formulario en el boton iniciar sesion empleado*/
function submitAccederEmpleado(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  const emailInput = document.getElementById('email-empleado-login');
  const email = emailInput.value.trim();
  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    emailInput.value = '';
    emailInput.focus();
    return false;
  }
  /*Si el formato es valido aparece este cartel*/
  alert('Email válido. Los datos serían enviados al servidor (simulado).');
  return false;
}
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