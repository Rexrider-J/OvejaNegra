/*TODAS LAS PAGINAS*/
/*Cambio el dropdown del header segun si ingreso cliente, empleado y la funcion del empleado*/
document.addEventListener("DOMContentLoaded", function () {
  const tipoUsuario = sessionStorage.getItem("usuarioTipo");
  const puesto = sessionStorage.getItem("puestoEmpleado");

  const boton = document.getElementById("botonIngresar");
  const menu = document.getElementById("contenidoBotonIngresar");

  if (!boton || !menu) return; // Si no están, salimos

  /* Limpiar el menú actual*/
  menu.innerHTML = "";
  /*Segun el tipo de usuario, o si no hay usuario, se muestra un titulo en el dropdown y unas opciones diferentes*/
  if (tipoUsuario === "cliente") {
    boton.textContent = "Mi Perfil";
    menu.innerHTML = `
      <li><a class="dropdown-item" href="miPerfil.html">Datos personales</a></li>
      <li><a class="dropdown-item" href="miPerfil.html#list-misReservas-list">Mis Reservas</a></li>
      <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesión</a></li>
    `;
  } else if (tipoUsuario === "empleado") {
    boton.textContent = "Empleado";
    if (puesto === "Gerente") {
      menu.innerHTML = `
        <li><a class="dropdown-item" href="miPerfil.html">Datos personales</a></li>
        <li><a class="dropdown-item" href="miPerfil.html#list-misReservas-list">Mis Reservas</a></li>
        <li><a class="dropdown-item" href="miPerfil.html#list-modificarMenu-list">Modificar menu</a></li>
        <li><a class="dropdown-item" href="miPerfil.html#list-baseDatos-list">Administrador</a></li>
        <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesion</a></li>
        `;
    }
    else if (puesto === "Subgerente") {
      menu.innerHTML = `
        <li><a class="dropdown-item" href="miPerfil.html">Datos personales</a></li>
        <li><a class="dropdown-item" href="miPerfil.html#list-misReservas-list">Mis Reservas</a></li>
        <li><a class="dropdown-item" href="miPerfil.html#list-modificarMenu-list">Modificar menu</a></li>
        <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesion</a></li>
        `;
    } else {
      menu.innerHTML = `
          <li><a class="dropdown-item" href="miPerfil.html">Datos personales</a></li>
          <li><a class="dropdown-item" href="miPerfil.html#list-misReservas-list">Mis Reservas</a></li>
          <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesion</a></li>
        `;
    }
  } else {
    // Si nadie inició sesión, dejarlo como estaba por defecto
    boton.textContent = "Ingresar";
    menu.innerHTML = `
      <li><a class="dropdown-item" href="ingresar.html#cliente" onclick="mostrarFormularioIngresar('botonCliente')">Cliente</a></li>
      <li><a class="dropdown-item" href="ingresar.html#empleado" onclick="mostrarFormularioIngresar('botonEmpleado')">Empleado</a></li>
    `;
  }
});
/*Muestra el contenido correspondiente al boton precionado en Mis reservas Empleado*/
function mostrarContenidoMisReservasE(opcion) {
  const secciones = document.querySelectorAll('.seccionEmpleado');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });

  const seccionSeleccionada = document.getElementById(opcion);
  if (seccionSeleccionada) {
    seccionSeleccionada.style.display = 'grid';
  }
}
/*Muestra contenido distinto segun si es cliente o empleado y que tipo de empleado*/
document.addEventListener("DOMContentLoaded", function () {
  const tipoUsuario = sessionStorage.getItem("usuarioTipo");
  const puesto = sessionStorage.getItem("puestoEmpleado");

  /*funciona para esta secciones*/
  const secciones = [
    "list-datosPersonales",
    "list-misReservas",
    "list-modificarMenu",
    "list-baseDatos"
  ];

  /* Mostrar u ocultar pestañas según tipo de usuario*/
  secciones.forEach(id => {
    const tab = document.getElementById(`${id}-list`);
    const pane = document.getElementById(id);

    /* Ocultar por defecto */
    if (tab) tab.style.display = "none";
    if (pane) pane.style.display = "none";
  });

  const mostrarSiempre = ["list-datosPersonales", "list-misReservas"];
  mostrarSiempre.forEach(id => {
    const tab = document.getElementById(`${id}-list`);
    const pane = document.getElementById(id);
    if (tab) tab.style.display = "grid";
    if (pane) pane.style.display = "grid";
  });

  if (tipoUsuario === "empleado") {
    if (puesto === "Gerente" || puesto === "Subgerente") {
      const modMenuTab = document.getElementById("list-modificarMenu-list");
      const modMenuPane = document.getElementById("list-modificarMenu");
      if (modMenuTab) modMenuTab.style.display = "block";
      if (modMenuPane) modMenuPane.style.display = "block";
    }
    if (puesto === "Gerente") {
      const baseDatosTab = document.getElementById("list-baseDatos-list");
      const baseDatosPane = document.getElementById("list-baseDatos");
      if (baseDatosTab) baseDatosTab.style.display = "block";
      if (baseDatosPane) baseDatosPane.style.display = "block";
    }
  }

  /*Cargar contenido dinámico dentro de datosPersonales*/
  const datosPersonalesDiv = document.getElementById("list-datosPersonales");

  if (datosPersonalesDiv) {
    if (tipoUsuario === "cliente") {
      datosPersonalesDiv.innerHTML = `
        <h5>Datos del Cliente</h5>
      `;
    } else if (tipoUsuario === "empleado") {
      datosPersonalesDiv.innerHTML = `
        <h5>Datos Empleados</h5>
      `;
    }
  }

  /*Cargar contenido dinámico dentro de misReservas*/
  const misReservasDiv = document.getElementById("list-misReservas");

  if (misReservasDiv) {
    if (tipoUsuario === "cliente") {
      misReservasDiv.innerHTML = `
        <h5>Reservas Cliente</h5>
      `;
    } else if (tipoUsuario === "empleado") {
      misReservasDiv.innerHTML = `
        <div id="botonesDeAccion">
          <input type="button" value="Modificar reservas" onclick="mostrarContenidoMisReservasE('modificar')"/>
          <input type="button" value="Cancelar reservas" onclick="mostrarContenidoMisReservasE('cancelar')"/>
          <input type="button" value="Visualizar reservas" onclick="mostrarContenidoMisReservasE('visualizar')"/>  
          <a href="reservas.html" class="btn btn-primary">Crear reservas</a>
        </div>
        <div id="contenidoBtnEmpleado">
          <div id="modificar" class="seccionEmpleado" style="display: none;">
            <h3>Modificar reservas</h3>
            <p>Aca se modificarán las reservas ya realizadas. Podria agregarse un filtro por mail, fecha, hora, dni</p>
          </div>
          <div id="cancelar" class="seccionEmpleado" style="display: none;">
            <h3>Cancelar reservas</h3>
            <p>Aquí puedes cancelar una reserva. Podria carcelarse la reserva para un solo individuo o masivamente. Debe redactarse una nota que se enviará al mail de la/el/los involucrados(simulado)</p>
          </div>
          <div id="visualizar" class="seccionEmpleado" style="display: none;">
            <h3>Visualizar reservas</h3>
            <p>Tabla o datos de reservas existentes.Se va poder sumar puntos, anular reserva y concretar reserva</p>
          </div>
        </div>
      `;
    }
  }
});
document.querySelectorAll('a[data-bs-toggle="list"]').forEach(tab => {
  tab.addEventListener("shown.bs.tab", function (event) {
    const targetId = event.target.getAttribute("href").replace("#", "");

    // Oculta todas las secciones
    const panes = document.querySelectorAll(".tab-pane");
    panes.forEach(pane => {
      pane.style.display = "none";
    });

    // Muestra solo la activa
    const activePane = document.getElementById(targetId);
    if (activePane) {
      activePane.style.display = "grid";
    }
    // Cargar el contenido solo cuando corresponde
    if (targetId === "list-modificarMenu") {
      cargarMenu();
    }
  });
});

/*borra el contenido del tab antes de cambiar de pagina*/
document.querySelectorAll('a[data-bs-toggle="list"]').forEach(tabLink => {
  tabLink.addEventListener('shown.bs.tab', function (e) {
    const previouslyActiveTab = e.relatedTarget;
    const previouslyActiveTabId = previouslyActiveTab ? previouslyActiveTab.getAttribute("href") : null;

    if (previouslyActiveTabId === "#list-modificarMenu") {
      document.getElementById("list-modificarMenu").innerHTML = ""; // limpia cuando se sale
    }
  });
});
/*Cambiar seccion de dropdown de miPerfil desde la misma pagina*/
function activarTabPorHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const targetTab = document.querySelector(`a[data-bs-toggle="tab"][href="${hash}"]`);
  if (targetTab) {
    const tab = new bootstrap.Tab(targetTab);
    tab.show();
  }
}
document.addEventListener("DOMContentLoaded", activarTabPorHash);
// También escuchar cambios de hash mientras estás en la página
window.addEventListener("hashchange", activarTabPorHash);

/*HEADER*/
/*Hace que el nav sea responsive con un boton hamburguesa*/
document.addEventListener("DOMContentLoaded", function () {
  window.toggleMenu = function () {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
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
/*Muestra la pagina reservas de forma distinta segun si es cliente, empleado o no usuario*/
if (window.location.pathname.includes("reservas.html")) {
  document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = sessionStorage.getItem("usuarioTipo");

  const clienteSection = document.getElementById("cliente-section");
  const empleadoSection = document.getElementById("empleado-section");

  if (!clienteSection || !empleadoSection) {
    console.error("No se encontraron las secciones necesarias.");
    return;
  }

  if (tipoUsuario === "cliente") {
    clienteSection.style.display = "grid";
    empleadoSection.style.display = "none";
  } else if (tipoUsuario === "empleado") {
    clienteSection.style.display = "none";
    empleadoSection.style.display = "grid";
  } else {
    alert("Debe iniciar sesión para realizar una reserva.");
    window.location.href = "ingresar.html#cliente";
  }
});
}

/*Guarda la sucursal seleccionada en la sección seleccionar sucursal de reseva*/
function guardarSucursalDeReserva() {
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
}

let locales = [];

function mostrarTodasSucursales() {
  fetch('obtener_locales.php')
    .then(response => response.text())
    .then(text => {

      const lineas = text.trim().split("\n"); // limpia espacios y divide por líneas


      locales = lineas.map(linea => { // recorremos cada línea
        const campos = linea.split(";"); // divide por puntoycoma
        const objeto = {};

        campos.forEach(campo => {
          if (campo) {
            const [clave, valor] = campo.split("="); // las separamos en el "="
            objeto[clave] = valor; // y las asignamos
          }
        });
        return objeto;
      });
      /*LLama a la funcion de cargarSelectSucursales para cargar los datos en la pagina*/
      cargarSelectSucursales();  // Header general
      cargarDropdownReservas();   //Pagina reservas
      cargarDropdownReservasEmpleado(); //Pagina reservas
      crearAcordeones(locales); //pagina nosotros

      //Aplicar un valor a cada sucursal después de cargar las opciones para poder conservar la sucursal seleccionada en otras paginas
      const valorGuardado = sessionStorage.getItem("sucursalSeleccionada");
      if (valorGuardado) {
        const selector = document.getElementById("selectorSucursales");
        if (selector) selector.value = valorGuardado;

        const dropdown = document.getElementById("dropdownReservas");
        if (dropdown) dropdown.value = valorGuardado;

        const dropdownEmpleado = document.getElementById("dropdownReservasEmpleado");
        if (dropdownEmpleado) dropdownEmpleado.value = valorGuardado;
      }
    })
    .catch(error => console.error("Error:", error));
}
/*Carga selectorSucursales que es el dropdown que esta en el header con el nombre de todas las sucursales en la bdd*/
function cargarSelectSucursales() {
  const select = document.getElementById("selectorSucursales");

  /* Limpia todas las opciones menos la primera*/
  select.length = 1;

  locales.forEach((local, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = local.nombre;
    select.appendChild(option);
  });
}
/*Carga dropdownReservas que es el dropdown que se encuentra en el primer paso del cliente para realizar una reserva*/
/*Carga el nombre y la direccion de los locales*/
function cargarDropdownReservas() {
  const dropdown = document.getElementById("dropdownReservas");
  if (!dropdown) return;

  // Limpia todas las opciones menos la primera
  dropdown.length = 1;

  locales.forEach((local, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = `${local.nombre} - ${local.direccion}`;
    option.setAttribute("name", `${local.nombre} - ${local.direccion}`);
    dropdown.appendChild(option);
  });
}/*Carga dropdownReservas que es el dropdown que se encuentra en el primer paso del cliente para realizar una reserva*/
/*Carga el nombre y la direccion de los locales*/
function cargarDropdownReservasEmpleado() {
  const dropdownEmpleado = document.getElementById("dropdownReservasEmpleado");
  if (!dropdownEmpleado) return;

  // Limpia todas las opciones menos la primera
  dropdownEmpleado.length = 1;

  locales.forEach((local, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = `${local.nombre} - ${local.direccion}`;
    option.setAttribute("name", `${local.nombre} - ${local.direccion}`);
    dropdownEmpleado.appendChild(option);
  });
}
/* Guarda la sucursal seleccionada en el header*/
function guardarSeleccionSucursal(valor) {
  sessionStorage.setItem("sucursalSeleccionada", valor);
  cargarMenuEstatico()

  /*Si se encuentra en la pagina reservas, tambien actualizar el valor de dropdown si se cambia el valor del selectoSucursal en la misma pagina*/
  const dropdown = document.getElementById("dropdownReservas");
  if (dropdown) {
    dropdown.value = valor;
  }
  const dropdownEmpleado = document.getElementById("dropdownReservasEmpleado");
  if (dropdownEmpleado) {
    dropdownEmpleado.value = valor;
  }
}
window.addEventListener('DOMContentLoaded', mostrarTodasSucursales);
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
  /* Aplica al dropdownEmpleado de reservas si se encuentra en la pagina pero solo cuando carga la pagina*/
  const dropdownEmpleado = document.getElementById("dropdownReservasEmpleado");
  if (dropdownEmpleado) {
    dropdownEmpleado.value = valorGuardado;
  }
});
/*Genera acordeones con los datos de cada sucursal dinamicamente en la pagina nosotros*/
/*Tambien despliega el acordeon correspondiente a la sucursal seleccionada previamente en el header*/
function crearAcordeones(locales) {
  const contenedor = document.getElementById("contenedorAcordeones");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const sucursalSeleccionada = sessionStorage.getItem("sucursalSeleccionada");

  locales.forEach((local, index) => {
    const idUnico = `collapse${index}`;
    const showClass = local.id_local === sucursalSeleccionada ? "show" : "";
    const expanded = local.id_local === sucursalSeleccionada ? "true" : "false";

    const acordeonHTML = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button ${showClass ? '' : 'collapsed'}" type="button"
            data-bs-toggle="collapse" data-bs-target="#${idUnico}" aria-expanded="${expanded}" aria-controls="${idUnico}">
            ${local.nombre}
          </button>
        </h2>
        <div id="${idUnico}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="ubicacionSucursal">
              <iframe src="https://www.google.com/maps?q=${encodeURIComponent(local.direccion)}&output=embed"
              width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="informacionSucursal">
              <div class="datosSucursal">
                <h3><strong>Dirección</strong></h3>
                <span>${local.direccion}</span>
              </div>
              <div class="datosSucursal">
                <h3><strong>Contacto</strong></h3>
                <span>${local.telefono}</span>
              </div>
              <div class="datosSucursal">
                <h3><strong>Horario</strong></h3>
                <span>Martes a Domingo 10:30AM - 9PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    contenedor.insertAdjacentHTML("beforeend", acordeonHTML);
  });
}
/*Sirve para desplegar el acordeon de sucursal que corresponda a la sucursal seleccionada en el header en tiempo real*/
const selector = document.getElementById("selectorSucursales");
if (selector) {
  selector.addEventListener("change", () => {
    crearAcordeones(locales); // vuelve a renderizar con la nueva sucursal seleccionada
  });
}
/*RESTRICCIONES PARA DATOS INGRESADOS*/
/*Calendario externo Flatpickr*/
if (window.location.pathname.includes("reservas.html")) {
  document.addEventListener("DOMContentLoaded", function () {
      flatpickr("#calendarioReservas", {
        inline: true,
        dateFormat: "Y-m-d",
        locale: "es",
        minDate: "today",
        disable: [
          function (date) {
            return date.getDay() === 1; // Desactiva lunes
          }
        ],
        onChange: function (selectedDates, dateStr) {
          document.getElementById("fechaReserva").value = dateStr;
        }
      });
  });
}
document.querySelectorAll('.solo-letras').forEach(function (campo) {
  /*Evento para controlar las teclas que se presionan al escribir*/
  campo.addEventListener('keydown', function (e) {
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
  campo.addEventListener('input', function () {
    /*Reemplaza cualquier caracter que no esté permitido por nada ''*/
    campo.value = campo.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ' ]/g, '');
  });

  /*Evento que detecta cuando se intenta pegar texto en el campo*/
  campo.addEventListener('paste', function (e) {
    /* Obtiene el texto que se intenta pegar*/
    const textoPegado = (e.clipboardData || window.clipboardData).getData('text');
    /* Si el texto pegado contiene caracteres no permitidos, se bloquea el pegado y muestra alerta*/
    if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ' ]/.test(textoPegado)) {
      e.preventDefault();
      alert('Solo se permiten letras, espacios y apóstrofes.');
    }
  });
});
document.querySelectorAll('.solo-numeros').forEach(function (campo) {
  /*Permite solo números y tab, delete, enter y las fechas de direccion izquierda y derecha*/
  campo.addEventListener('keydown', function (e) {
    const tecla = e.key;
    const numerosPermitidos = /^[0-9]$/;
    const teclasEspeciales = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];

    /*Si la tecla no está permitida y no es especial, se bloquea la acción*/
    if (!numerosPermitidos.test(tecla) && !teclasEspeciales.includes(tecla)) {
      e.preventDefault();
    }
  });

  /* Limpia cualquier caracter no numérico en el input, útil para pegar o escribir de otras formas*/
  campo.addEventListener('input', function () {
    campo.value = campo.value.replace(/[^0-9]/g, '');
  });

  /* Bloquea pegar texto con caracteres no numéricos*/
  campo.addEventListener('paste', function (e) {
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

  if (regex.test(tel)) {
    alert("Número válido");
  } else {
    alert("Número inválido");
  }
}
/*Para validad el input date de la fecha de nacimiento en la parte de registrarse cliente*/
document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('fecha-nacimiento-registro');
  if (fechaInput) {
    /*Se coloca el año actual y la fecha de hoy en variables*/
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    /*en la variable minimo se pone la fecha 1921-01-01 y en la maxima el año anterior al actual, mes 12, dia 31*/
    /*Minimo (este año - 80) -01-01*/
    const min = `${anioActual - 80}-01-01`;
    /*Maximo el 31 de diciembre de (este año -14)*/
    const max = `${anioActual - 14}-12-31`;
    /*Se colocan las variables en los valores maximos y minimos que puede tomar el input*/
    fechaInput.min = min;
    fechaInput.max = max;
  }
});
/* Validar formato de email ejemplo@ejemplo.ejemplo*/
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return re.test(email);
}
/*INGRESAR, REGISTRARSE, EMPLEADO*/
/*Funciona para mostrar el formulario de ingresoCliente e ingresoEmpleado desde alguno de estos.*/
function mostrarFormularioIngresar(tipo) {
  document.getElementById("cliente").style.display = "none";
  document.getElementById("empleado").style.display = "none";
  document.getElementById("olvideContrasenia").style.display = "none";

  if (tipo === "botonCliente") {
    document.getElementById("cliente").style.display = "grid";
  } else if (tipo === "botonEmpleado") {
    document.getElementById("empleado").style.display = "grid";
  }
}
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
/*Acceder a olvideContrasenia desde login cliente*/
const linkOlvideCliente = document.getElementById("link-olvide-cliente");
if (linkOlvideCliente) {
  linkOlvideCliente.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("cliente").style.display = "none";
    document.getElementById("empleado").style.display = "none";
    document.getElementById("olvideContrasenia").style.display = "grid";
    document.getElementById("datos-enviar-mail").style.display = "grid";
    document.getElementById("confirmacion-envio-mail").style.display = "none";
  });
}
/*Acceder a olvideContrasenia desde login empleado*/
const linkOlvideEmpleado = document.getElementById("link-olvide-empleado");
if (linkOlvideEmpleado) {
  linkOlvideEmpleado.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("cliente").style.display = "none";
    document.getElementById("empleado").style.display = "none";
    document.getElementById("olvideContrasenia").style.display = "grid";
    document.getElementById("datos-enviar-mail").style.display = "grid";
    document.getElementById("confirmacion-envio-mail").style.display = "none";
  });
}

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

  /*verificamos que existan todos los campos*/
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
        /*Si el formato es valido aparece este cartel*/
        alert("¡Registro exitoso!\nYa podés iniciar sesión con tu correo electrónico, DNI y contraseña.");
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

      if (data.includes("✅")) {

        const partes = data.split("|"); // separa los campos
        const datos = {}; // usamos un objeto para guardar los pares clave:valor

        for (let i = 1; i < partes.length; i++) { //cargamos las partes en los datos, excluyendo el ✅
          const [clave, valor] = partes[i].split("="); // las separamos en el "="
          datos[clave] = valor; // y las asignamos
        }

        /*Creamos una variable para indicar que el usuario que ingreso es un empleado*/
        sessionStorage.setItem("usuarioTipo", "empleado");
        sessionStorage.setItem("idEmpleado", datos.id_empleado);
        sessionStorage.setItem("nombreEmpleado", datos.nombre);
        sessionStorage.setItem("apellidoEmpleado", datos.apellido);
        sessionStorage.setItem("dniEmpleado", datos.dni);
        sessionStorage.setItem("emailEmpleado", datos.email);
        sessionStorage.setItem("puestoEmpleado", datos.puesto);
        sessionStorage.setItem("idLocalEmpleado", datos.id_local);

        window.location.href = "index.html"; // O redirigir a un panel de empleado
      } else {
        alert("Uno o más datos son incorrectos.");
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
function finalizarRecuperarContrasenia() {
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
function mostrarSeccion(idDestino, boton) {
  // Ocultar la sección que contiene al botón (padre más cercano tipo <section>)
  const seccionActual = boton.closest("section");
  if (seccionActual) {
    seccionActual.style.display = "none";
  }

  // Mostrar la sección destino
  const seccionDestino = document.getElementById(idDestino);
  if (seccionDestino) {
    seccionDestino.style.display = "grid";
  }
}
/*Inhabilita el boton mesaReserva hasta que se selecicone fecha,hora y cantPersonas.Guarda estos datos en el sessionStorage*/
if (window.location.pathname.includes("reservas.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const calendario = document.getElementById("calendarioReservas");
    const fechaInput = document.getElementById("fechaReserva");
    const horaSelect = document.getElementById("horaReserva");
    const personasSelect = document.getElementById("cantPersonasReserva");
    const mesaSelect = document.getElementById("mesaReserva");

    // Inhabilita la selección de mesa inicialmente
    mesaSelect.disabled = true;

    // Inicializa el calendario con Flatpickr
    flatpickr(calendario, {
      inline: true, // Hace que el calendario aparezca embebido en el div
      dateFormat: "Y-m-d",
      defaultDate: sessionStorage.getItem("fechaReserva") || null,
      onChange: function (selectedDates, dateStr) {
        fechaInput.value = dateStr; // Guarda en el input hidden si lo usás
        sessionStorage.setItem("fechaReserva", dateStr);
        limpiarYValidarMesa();
      }
    });

    // Evento cambio de hora
    horaSelect.addEventListener("change", function () {
      sessionStorage.setItem("horaReserva", this.value);
      limpiarYValidarMesa();
    });

    // Evento cambio de cantidad de personas
    personasSelect.addEventListener("change", function () {
      sessionStorage.setItem("cantPersonasReserva", this.value);
      limpiarYValidarMesa();
    });

    // Limpia mesa seleccionada y valida si debe habilitarse
    function limpiarYValidarMesa() {
      mesaSelect.value = ""; // Limpia selección de mesa
      validarHabilitarMesa();
    }

    // Habilita mesa solo si fecha, hora y personas están seleccionadas
    function validarHabilitarMesa() {
      const fecha = sessionStorage.getItem("fechaReserva");
      const hora = horaSelect.value;
      const personas = personasSelect.value;

      if (fecha && hora && personas) {
        mesaSelect.disabled = false;
      } else {
        mesaSelect.disabled = true;
      }
    }

    // Recuperar valores guardados si existen (opcional)
    if (sessionStorage.getItem("fechaReserva")) {
      fechaInput.value = sessionStorage.getItem("fechaReserva");
    }
    if (sessionStorage.getItem("horaReserva")) {
      horaSelect.value = sessionStorage.getItem("horaReserva");
    }
    if (sessionStorage.getItem("cantPersonasReserva")) {
      personasSelect.value = sessionStorage.getItem("cantPersonasReserva");
    }

    validarHabilitarMesa(); // Verifica al cargar la página
  });
  window.addEventListener("beforeunload", function () {
  // Solo borra los datos de la reserva al salir de la página actual
  sessionStorage.removeItem("fechaReserva");
  sessionStorage.removeItem("horaReserva");
  sessionStorage.removeItem("cantPersonasReserva");
});
}

/*Verifica que esten todos los datos de reserva y los guarda en sessionStorage*/
function guardarValoresDatosReserva() {
  /*Si no se seleccionó ninguna fecha en el calendario aparece el cartel de alerta*/
  const fechaSeleccionada = document.getElementById("fechaReserva").value;
  if (fechaSeleccionada === "") {
    alert("Debe seleccionar una fecha antes de continuar.");
    return;
  }

  const horaSelect = document.getElementById("horaReserva");
  const horaSeleccionada = horaSelect.value;
  /*Si la opcion elegida tiene un valor de "" aparece el cartel de alerta*/
  if (horaSeleccionada === "") {
    alert("Debe seleccionar un horario antes de continuar.");
    return;
  }

  const personasSelect = document.getElementById("cantPersonasReserva");
  const personasSeleccionadas = personasSelect.value;
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

  /*Se guardan los datos actualizados de fecha,hora y cantPersonas*/
  sessionStorage.setItem("fechaSeleccionada", fechaSeleccionada);
  sessionStorage.setItem("horaSeleccionada", horaSeleccionada);
  sessionStorage.setItem("personasSeleccionadas", personasSeleccionadas);

  /*Insertar los datos en la siguiente pagina de confirmación*/
  document.getElementById("sucursalSeleccionada").textContent = sessionStorage.getItem("sucursalNombre");
  document.getElementById("fechaSeleccionada").textContent = sessionStorage.getItem("fechaSeleccionada");
  document.getElementById("horaSeleccionada").textContent = sessionStorage.getItem("horaSeleccionada");
  document.getElementById("cantPersonasSeleccionada").textContent = sessionStorage.getItem("personasSeleccionadas") + " persona/s";
  document.getElementById("mesaSeleccionada").textContent = sessionStorage.getItem("mesaSeleccionada");
  document.getElementById("ObservacionDada").textContent = sessionStorage.getItem("ObservacionDada");
}
function volverSeleccionDatosReserva() {
  /* Ocultar confirmación de reserva*/
  document.getElementById("confirmacionReserva").style.display = "none";

  /* Mostrar datos reserva*/
  document.getElementById("datosDeReserva").style.display = "grid";
}
function enviarReserva() {
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
}
/*Los botones raddioButton de reservas x empleado cambian el contenido de los datos que se deben completar de cliente segun el seleccionado*/
function cambioTipoCliente() {
  const noRegistrado = document.getElementById('cliente-no-registrado');
  const divRegistrar = document.getElementById('registrarCliente');
  const divIngresar = document.getElementById('IngresarCliente');

  if (noRegistrado.checked) {
    divRegistrar.style.display = 'grid';
    divIngresar.style.display = 'none';
  } else {
    divRegistrar.style.display = 'none';
    divIngresar.style.display = 'grid';
  }
}
/*Es un boton para scrollear para arriba en modificar menu*/
if (window.location.pathname.includes("miPerfil.html")) {
  window.addEventListener('scroll', () => {
    const btn = document.getElementById('btn-subir');
    if (btn) {
      if (window.scrollY > 200) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    }
  });
}

function cargarMenu() { // se ejecuta en mi perfil cuando clickean Modificar Menu
  fetch("obtener_menu.php") // solicita ese archivo, que carga el HTML del menú
    .then(res => res.text()) // convierte la respuesta en texto
    .then(data => {
      document.getElementById("list-modificarMenu").innerHTML = data; //lo inserta en el contenedor con ese id
      inicializarEventosMenu(); // y llama a la funcion que agrega los listeners a los elementos recien insertados
    });
}

function filtrarMenu() {
  const input = document.getElementById("busqueda").value.toLowerCase(); //toma y combierte el texto en minusculas
  const items = document.getElementsByClassName("menu-item"); //toma todos los elementos del menu
  for (let item of items) { // recoremos los items
    const texto = [
      item.querySelector('input[name="nombre"]').value,
      item.querySelector('input[name="precio"]').value,
      item.querySelector('input[name="categoria"]').value,
      item.querySelector('textarea[name="descripcion"]').value
    ].join(" ").toLowerCase(); //junta los campos del item en una sola cadena
    if (texto.includes(input)) {// condicional para ver si el texto contiene la busqueda
      item.style.display = ""; // si lo tiene, lo muestra
    } else {
      item.style.display = "none"; // si no, lo oculta
    }

  }
}

function inicializarEventosMenu() {
  const formAgregar = document.getElementById("form-agregar-menu"); // toma el formulario de agregar item
  if (formAgregar) { // condicional para ver si existe el form
    formAgregar.addEventListener("submit", e => { // espera que se apriete el boton de agregar
      e.preventDefault(); // previene el envio tradicional del formulario
      const data = new FormData(formAgregar); // crea un obj con los datos del form
      data.append("submit", "1"); // añadimos el campo "submit", para que el back sepa que hacer
      fetch("acciones_menu.php", { method: "POST", body: data })
        .then(r => r.text()) // convierte la respuesta del servidor en texto
        .then(alert) // muestra el mensaje en un alert
        .then(cargarMenu); // y vuelve a cargar el menu actualizado
    });
  }

  document.querySelectorAll(".btn-success").forEach(btn => { // busca todos los botones que la clase contenga ese texto
    btn.addEventListener("click", () => {
      if (!confirm("Modificar este ítem?")) return; // confirma el accionar del usuario
      const form = btn.closest("form"); // selecciona el form mas cercano a ese boton 
      const data = new FormData(form); // crea un obj con los datos del form
      data.append("modificar", "1"); // añadimos el campo "edit", para que el back sepa que hacer
      fetch("acciones_menu.php", { method: "POST", body: data })
        .then(r => r.text()) // convierte la respuesta del servidor en texto
        .then(alert) // muestra el mensaje en un alert
        .then(cargarMenu); // y vuelve a cargar el menu actualizado
    });
  });

  document.querySelectorAll(".eliminar-item").forEach(btn => { // busca todos los botones que la clase contenga ese texto
    btn.addEventListener("click", () => {
      if (!confirm("¿Eliminar este ítem?")) return; // confirma el accionar del usuario
      const data = new FormData(); // crea un obj
      data.append("id", btn.dataset.id); // le añadimos el id del elemento que vamos a borrar
      data.append("borrar", "1"); // añadimos el campo "delete", para que el back sepa que hacer
      fetch("acciones_menu.php", { method: "POST", body: data })
        .then(r => r.text()) // convierte la respuesta del servidor en texto
        .then(alert) // muestra el mensaje en un alert
        .then(cargarMenu); // y vuelve a cargar el menu actualizado
    });
  });
}

function cargarCategoria(categoria) { // es la funcion que carga por la categoria que se le pase como argumento
  const targetDiv = document.querySelector(`#list-${categoria.toLowerCase()} .listProductos`); // guardamos en una variable el div donde vamos a insertar lo que devuelva el .php
  if (!targetDiv) return; // si no existe el div, la funcion se corta y no devuelve nada

  const idSucursal = sessionStorage.getItem("sucursalSeleccionada");//tomamos la sucursal guardada en la sesion
  if (!idSucursal) { //si no hay una se pide que se seleccione una
    targetDiv.innerHTML = "<p>Seleccioná una sucursal primero.</p>";
    return;
  }

  targetDiv.innerHTML = "<p>Cargando productos...</p>"; // en lo que tarde la respuesta de la base de datos, ponemos esto

  fetch(`obtener_menu_estatico.php?categoria=${encodeURIComponent(categoria)}&id_sucursal=${idSucursal}`)
    .then(response => response.text())
    .then(data => {
      targetDiv.innerHTML = data;
    })
    .catch(error => {
      console.error("Error al cargar categoría:", error);
      targetDiv.innerHTML = "<p>Error al cargar productos.</p>";
    });
}

function cargarMenuEstatico(categoriaInicial = "") {
  const idBody = document.body.id;
  if (idBody === "menu" || idBody === "promociones") { //solo se ejecuta si el id del body es igual a uno de esos
    if (categoriaInicial) { // si exitste, que es cuando se ingresa a la pag por primera vez
      cargarCategoria(categoriaInicial); // ejecuta la funcion con la variable que trae del html
    }

    document.querySelectorAll(".list-group-item").forEach(item => { // se sellecionan todos los query que incluyan ".list-group-item"
      item.addEventListener("click", () => { // esperamos a que se les haga click a alguno,
        const categoriaId = item.getAttribute("href"); // tomamos el atributo herf,
        const categoria = categoriaId.replace("#list-", ""); // y le cortamos el "#list-" para almacenar el nombre de la categoria que le preguntaremos a la base de datos
        cargarCategoria(categoria); // y se ejecuta la funcion con esa variable almacenada
      });
    });
  }
}
