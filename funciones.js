console.log("funciones.js se cargó correctamente");
/*TODAS LAS PAGINAS*/
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
/*Cambio el dropdown del header segun si ingreso cliente, empleado y la funcion del empleado*/
document.addEventListener("DOMContentLoaded", function () {
  const tipoUsuario = sessionStorage.getItem("usuarioTipo");
  const boton = document.getElementById("botonIngresar");
  const menu = document.getElementById("contenidoBotonIngresar");

  if (!boton || !menu) return; // Si no están, salimos

  /* Limpiar el menú actual*/
  menu.innerHTML = "";

  /*Segun el tipo de usuario, o si no hay usuario, se muestra un titulo en el dropdown y unas opciones diferentes*/
  if (tipoUsuario === "cliente") {
    boton.textContent = "Mi Perfil";
    menu.innerHTML = `
      <li><a class="dropdown-item" href="/proyecto_oveja_negra/OvejaNegra/miPerfil.html">Datos personales</a></li>
      <li><a class="dropdown-item" href="/proyecto_oveja_negra/OvejaNegra/miPerfil.html#list-misReservas">Mis Reservas</a></li>
      <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesión</a></li>
    `;
  } else if (tipoUsuario === "empleado") {
    boton.textContent = "Empleado";
    menu.innerHTML = `
      <li><a class="dropdown-item" href="/proyecto_oveja_negra/OvejaNegra/miPerfil.html">Datos personales</a></li>
      <li><a class="dropdown-item" href="panel-empleado.html">Modificar menu</a></li>
      <li><a class="dropdown-item" href="panel-empleado.html">Administrador</a></li>
      <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesion</a></li>
    `;
  } else {
    // Si nadie inició sesión, dejarlo como estaba por defecto
    boton.textContent = "Ingresar";
    menu.innerHTML = `
      <li><a class="dropdown-item" href="ingresar.html#cliente">Cliente</a></li>
      <li><a class="dropdown-item" href="ingresar.html#empleado">Empleado</a></li>
    `;
  }
});
/*FOOTER*/
function crearDropdown(id, label, opciones) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.textContent = `${label}`;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  opciones.forEach(op => {
    const option = document.createElement('option');
    option.textContent = op.text;
    option.value = op.href || '';
    dropdown.appendChild(option);
  });

  dropdown.onchange = function () {
    const selected = this.options[this.selectedIndex].value;
    if (selected && selected !== '') {
      if (selected.includes('mostrarFormulario')) {
        eval(selected); // solo si es función como mostrarFormulario('algo')
      } else {
        window.location.href = selected;
      }
    }
  };
}

function actualizarFooter() {
  const width = window.innerWidth;
  const listas = document.querySelectorAll('.listasFooter > ol');
  const dropdowns = document.querySelectorAll('.footerDropdown');

  if (width <= 768) {
    listas.forEach(ol => ol.style.display = 'none');
    dropdowns.forEach(dd => dd.style.display = 'block');

    // Crear dropdowns con los datos
    crearDropdown('dropdownInstitucional', 'Institucional', [
      { text: 'Quiénes somos', href: 'nosotros.html' },
      { text: 'Menú', href: 'menu.html' },
      { text: 'Reservas', href: 'reservas.html' },
      { text: 'Promociones', href: 'promociones.html' },
      { text: 'Tienda de puntos', href: 'tiendaDePuntos.html' }
    ]);

    crearDropdown('dropdownCliente', 'Cliente', [
      { text: 'Ingresar', href: "javascript:mostrarFormulario('botonCliente')" },
      { text: 'Mis reservas', href: '#' }
    ]);

    crearDropdown('dropdownEmpleado', 'Empleado', [
      { text: 'Ingresar', href: "javascript:mostrarFormulario('botonEmpleado')" },
      { text: 'Mis reservas', href: '#' }
    ]);

    crearDropdown('dropdownServicios', 'Servicios', [
      { text: 'Servicios', href: "javascript:mostrarFormulario('botonCliente')" },
      { text: 'Nuestros Locales', href: '#' }
    ]);
  } else {
    listas.forEach(ol => ol.style.display = 'block');
    dropdowns.forEach(dd => dd.style.display = 'none');
  }
}

window.addEventListener('load', actualizarFooter);
window.addEventListener('resize', actualizarFooter);
/*RESERVAS*/
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
/*RESTRICCIONES PARA DATOS INGRESADOS*/
/*Calendario externo Flatpickr*/
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#calendarioReservas", {
    inline: true,             
    dateFormat: "Y-m-d",
    locale: "es",             
    minDate: "today",
    disable: [
      function(date) {
        // Devuelve true si el día es lunes (1)
        return date.getDay() === 1;
      }
    ],
    onChange: function(selectedDates, dateStr) {
      document.getElementById("fechaReserva").value = dateStr;
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
  const fechaInput = document.getElementById('fecha-nacimiento-registro');
  /*Se coloca el año actual y la fecha de hoy en variables*/
  const hoy = new Date();
  const añoActual = hoy.getFullYear();
  /*en la variable minimo se pone la fecha 1921-01-01 y en la maxima el año anterior al actual, mes 12, dia 31*/ 
  /*Minimo (este año - 80) -01-01*/
  const min = `${añoActual - 80}-01-01`;
  /*Maximo el 31 de diciembre de (este año -14)*/
  const max = `${añoActual - 14}-12-31`; 
  /*Se colocan las variables en los valores maximos y minimos que puede tomar el input*/
  fechaInput.min = min;
  fechaInput.max = max;
});
/* Validar formato de email ejemplo@ejemplo.ejemplo*/
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return re.test(email);
}
/*INGRESAR, REGISTRARSE, EMPLEADO*/
/*Funciona para mostrar el formulario de ingresoCliente e ingresoEmpleado desde alguno de estos.*/
function mostrarFormulario(tipo) {
    document.getElementById("cliente").style.display = "none";
    document.getElementById("empleado").style.display = "none";
    document.getElementById("olvideContrasenia").style.display = "none";
  
    if (tipo === "botonCliente") {
      document.getElementById("cliente").style.display = "grid";
    } else if (tipo === "botonEmpleado") {
      document.getElementById("empleado").style.display = "grid";
    }
}
/*Acceder a olvideContrasenia desde login cliente*/
document.getElementById("link-olvide-cliente").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("cliente").style.display = "none";
  document.getElementById("empleado").style.display = "none";
  document.getElementById("olvideContrasenia").style.display = "grid";
  document.getElementById("datos-enviar-mail").style.display = "grid"; 
  document.getElementById("confirmacion-envio-mail").style.display = "none"; 
});
/*Acceder a olvideContrasenia desde login empleado*/
document.getElementById("link-olvide-empleado").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("cliente").style.display = "none";
  document.getElementById("empleado").style.display = "none";
  document.getElementById("olvideContrasenia").style.display = "grid";
  document.getElementById("datos-enviar-mail").style.display = "grid"; 
  document.getElementById("confirmacion-envio-mail").style.display = "none";
});

/* Función que se ejecuta al enviar el formulario en el boton registrarse*/
function submitRegistrar(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  //tomamos los valores del form
  const nombre = document.getElementById('nombre-usuario-registro').value.trim();
  const apellido = document.getElementById('apellido-usuario-registro').value.trim();
  const dni = document.getElementById('dni-usuario-registro').value.trim();
  const fechaNacimiento = document.getElementById('fecha-nacimiento-registro').value.trim();
  const telefono = document.getElementById('telefono-usuario-registro').value.trim();
  const email = document.getElementById('email-usuario-registro').value.trim();
  const contraseña = document.getElementById('contraseña-usuario-registro').value.trim();

  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    document.getElementById('email-usuario-registro').focus();
    return false;
  }

  /*Si el formato es valido aparece este cartel*/
  alert("¡Registro exitoso!\nYa podés iniciar sesión con tu correo electrónico, DNI y contraseña.");

  //verificamos que existan todos los campos
  if (!nombre || !apellido || !dni || !fechaNacimiento || !telefono || !email || !contraseña) {
    alert("Por favor, completá todos los campos.");
    return false;
  }

  const formData = new FormData();// creamos un objeto FormData para empaquetar los datos como si fuera un formulario
  formData.append("accion", "registro");//indicamos que tipo de accion es y le pasamos los datos del form
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("dni", dni);
  formData.append("fecha_nacimiento", fechaNacimiento);
  formData.append("telefono", telefono);
  formData.append("email", email);
  formData.append("contraseña", contraseña);

  fetch("registro_inicio_sesion.php", {// enviamos la solicitud al servidor con fetch
    method: "POST",
    body: formData//enviamos el objeto creado previamente como cuerpo del POST
  })
    .then(response => response.text())// esperamos la respuesta del servidor como texto
    .then(data => {
      alert(data);// mostramos lo que responde el servidor
      if (data.includes("✅")) {// nos fijamos que la respuesta contiene "✅", se puede cambiar en el archivo php
        window.location.reload(); // recargamos la pagina
      }
    })
    .catch(error => {
      console.error("Error en registro:", error);//mostramos el error en consola
      alert("Hubo un problema al registrarse.");// y un alert para el usuario
    });

  return false;
}

/*Funcion que se ejecuta al enviar el formulario en el boton iniciar sesion cliente*/
function submitAccederCliente(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  const email = document.getElementById('email-usuario-login').value.trim(); //tomamos los valores del form
  const dni = document.getElementById('dni-usuario-login').value.trim();
  const contraseña = document.getElementById('contraseña-usuario-login').value.trim();

  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    document.getElementById('email-usuario-login').focus();
    return false;
  }

  if (!email || !dni || !contraseña) { //verificamos que existan todos los campos
    alert("Por favor, completá todos los campos.");
    return false;
  }

  const formData = new FormData(); //creamos un objeto FormData para empaquetar los datos como si fuera un formulario
  formData.append("accion", "login"); //indicamos que tipo de accion es y le pasamos los datos del form
  formData.append("email", email);
  formData.append("dni", dni);
  formData.append("contraseña", contraseña);

  fetch("registro_inicio_sesion.php", {   // enviamos la solicitud al servidor con fetch
    method: "POST",
    body: formData        //enviamos el objeto creado previamente como cuerpo del POST
  })
    .then(response => response.text())  // esperamos la respuesta del servidor como texto
    .then(data => {
      alert(data);// mostramos lo que responde el servidor
      if (data.includes("✅")) {  // nos fijamos que la respuesta contiene "✅", se puede cambiar en el archivo php
        /*Creamos una variable para indicar que el usuario que ingreso es un cliente*/
        sessionStorage.setItem("usuarioTipo", "cliente");
        window.location.href = "index.html"; // redirige a la pagina que queramos (en este caso index.html)
      }
    })
    .catch(error => {
      console.error("Error en login:", error); //mostramos el error en consola
      alert("Hubo un problema al iniciar sesión."); // y un alert para el usuario
    });

  return false;
}

/*Funcion que se ejecuta al enviar el formulario en el boton iniciar sesion empleado*/
function submitAccederEmpleado(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  //tomamos los valores del form
  const email = document.getElementById('email-empleado-login').value.trim();
  const dni = document.getElementById('dni-empleado-login').value.trim();
  const contraseña = document.getElementById('contraseña-empleado-login').value.trim();

  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    document.getElementById('email-empleado-login').focus();
    return false;
  }
  
  if (!email || !dni || !contraseña) { //verificamos que existan todos los campos
    alert("Por favor, completá todos los campos.");
    return false;
  }


  const formData = new FormData();// Creamos el objeto FormData para enviar los datos al servidor
  formData.append("accion", "login_empleado"); // Distinguimos que es un login de empleado
  formData.append("email", email);
  formData.append("dni", dni);
  formData.append("contraseña", contraseña);

  fetch("registro_inicio_sesion.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert(data);

      if (data.includes("✅")) {
        /*Creamos una variable para indicar que el usuario que ingreso es un empleado*/
        sessionStorage.setItem("usuarioTipo", "empleado");
        window.location.href = "index.html"; // O redirigir a un panel de empleado
      }
    })
    .catch(error => {
      console.error("Error en login empleado:", error);
      alert("Hubo un problema al iniciar sesión como empleado.");
    });


  return false;
}

/*Funcion que se ejecuta al enviar el formulario en el boton enviar de olvideContraseña*/
function submitEnviarMail(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  const email = document.getElementById('email-recuperar-contrasenia').value.trim();
  const dni = document.getElementById('dni-recuperar-contrasenia').value.trim();
  const cuentaCliente = document.getElementById("cuenta-cliente").checked;
  const cuentaEmpleado = document.getElementById("cuenta-empleado").checked;
  sessionStorage.setItem("cuentaClient", cuentaCliente);
  sessionStorage.setItem("cuentaEmpleado", cuentaEmpleado);

  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    document.getElementById('email-empleado-login').focus();
    return false;
  }
  
  /*Si el formato es valido aparece este cartel*/
  alert('Email válido. Los datos serían enviados al servidor (simulado).');
  
  /*Ocultar datos-enviar-mail*/
  document.getElementById("datos-enviar-mail").style.display = "none";

  /*mostrar confirmacion-envio-mail*/
  document.getElementById("email-confirmado").textContent = email;
  document.getElementById("confirmacion-envio-mail").style.display = "grid";

  return false;
}
function finalizarRecuperarContrasenia(){
  /*Ocultar confirmacion-envio-mail*/
  document.getElementById("confirmacion-envio-mail").style.display = "none";

  const cuentaCliente = sessionStorage.getItem("cuentaClient") === "true";
  const cuentaEmpleado = sessionStorage.getItem("cuentaEmpleado") === "true";

  /* Muestra la sección correspondiente segun si se selecciono cliente o empleado*/
  if (cuentaCliente) {
    document.getElementById("cliente").style.display = "grid";
    document.getElementById("empleado").style.display = "none"; 
  } else if (cuentaEmpleado) {
    document.getElementById("empleado").style.display = "grid";
    document.getElementById("cliente").style.display = "none"; 
  }

  /* limpiar el formulario por si se quiere volver a utilizar*/
  document.getElementById("form-recuperar").reset();
}
/*Sirve para cerrar sesion*/
function cerrarSesion() {
  sessionStorage.removeItem("usuarioTipo");
  window.location.href = "index.html";
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
  const inicio = document.getElementById("imagenConfirmacionReservas");
  inicio.scrollIntoView({ behavior: "smooth", block: "start" });
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