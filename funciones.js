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
      <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-datosPersonales-list')">Datos personales</a></li>
      <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-misReservas-list')">Mis Reservas</a></li>
      <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesión</a></li>
    `;
  } else if (tipoUsuario === "empleado") {
    boton.textContent = "Empleado";
    if (puesto === "Gerente") {
      menu.innerHTML = `
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-datosPersonales-list')">Datos personales</a></li>
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-misReservas-list')">Mis Reservas</a></li>
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-modificarMenu-list')">Modificar menú</a></li>
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-baseDatos-list')">Administrador</a></li>
        <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesion</a></li>
        `;
    }
    else if (puesto === "Subgerente") {
      menu.innerHTML = `
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-datosPersonales-list')">Datos personales</a></li>
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-misReservas-list')">Mis Reservas</a></li>
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-modificarMenu-list')">Modificar menú</a></li>
        <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesion</a></li>
        `;
    } else {
      menu.innerHTML = `
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-datosPersonales-list')">Datos personales</a></li>
        <li><a class="dropdown-item" href="miPerfil.html" onclick="navegarConTab('list-misReservas-list')">Mis Reservas</a></li>
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
function navegarConTab(tabLinkId) {
  /* Se guarda directamente el hash del tab sin depender del DOM*/
  const href = "#" + tabLinkId.replace("-list", ""); // convierte "list-misReservas-list" → "#list-misReservas"
  sessionStorage.setItem("tabActivo", href);
  window.location.href = "miPerfil.html";
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

    // Ocultar por defecto usando clases de Bootstrap
    if (tab) tab.classList.add("d-none");
    if (pane) pane.classList.add("d-none");
  });

  if (tipoUsuario === "empleado" || tipoUsuario === "cliente") {
    // Mostrar siempre estos dos
    const datosTab = document.getElementById("list-datosPersonales-list");
    const datosPane = document.getElementById("list-datosPersonales");
    if (datosTab) datosTab.classList.remove("d-none");
    if (datosPane) datosPane.classList.remove("d-none");

    const reservasTab = document.getElementById("list-misReservas-list");
    const reservasPane = document.getElementById("list-misReservas");
    if (reservasTab) reservasTab.classList.remove("d-none");
    if (reservasPane) reservasPane.classList.remove("d-none");

    // Luego seguí con el resto como ya está
    if (puesto === "Gerente" || puesto === "Subgerente") {
      const modMenuTab = document.getElementById("list-modificarMenu-list");
      const modMenuPane = document.getElementById("list-modificarMenu");
      if (modMenuTab) modMenuTab.classList.remove("d-none");
      if (modMenuPane) modMenuPane.classList.remove("d-none");
    }

    if (puesto === "Gerente") {
      const baseDatosTab = document.getElementById("list-baseDatos-list");
      const baseDatosPane = document.getElementById("list-baseDatos");
      if (baseDatosTab) baseDatosTab.classList.remove("d-none");
      if (baseDatosPane) baseDatosPane.classList.remove("d-none");
    }
  }

  /*Cargar contenido dinámico dentro de datosPersonales*/
  const datosPersonalesDiv = document.getElementById("list-datosPersonales");

  if (datosPersonalesDiv) {
    if (tipoUsuario === "cliente") {
      datosPersonalesDiv.innerHTML = `
        <div class="datosModificables"> 
          <div class="columna">
            <fieldset>
              <legend>Nombre/s</legend>
              <label class="form-group">
                <input type="text" id="nombreClienteInput" name="nombreClienteInput" maxlength="50" class="solo-letras" disabled />
                <button class="btn-editar" data-target="nombreClienteInput">Editar</button>
              </label>
              <legend>Apellido/s</legend>
              <label class="form-group">
                <input type="text" id="apellidoClienteInput" name="apellidoClienteInput" maxlength="50" class="solo-letras" disabled />
                <button class="btn-editar" data-target="apellidoClienteInput">Editar</button>
              </label>
              <legend>DNI</legend> <!--FUNCION APARTE-->
              <label class="form-group">
                <input type="text" id="dniClienteInput" name="dniClienteInput" disabled />
              </label>
              <legend>Email</legend>
              <label class="form-group">
                <input type="email" id="emailClienteInput" name="emailClienteInput" maxlength="100" disabled />
                <button class="btn-editar" data-target="emailClienteInput">Editar</button>
              </label>
              <legend>Telefono</legend>
              <label class="form-group">
                <input type="text" id="telefonoClienteInput" name="telefonoClienteInput" min="1000000000" max="999999999" maxlength="20" class="solo-numeros" disabled />
                <button class="btn-editar" data-target="telefonoClienteInput">Editar</button>
              </label>
              <legend>Fecha de nacimiento</legend>
              <label class="form-group">
                <input type="date" id="fecha_nacimientoClienteInput" name="fecha_nacimientoClienteInput" disabled />
                <button class="btn-editar" data-target="fecha_nacimientoClienteInput">Editar</button>
              </label>
              <legend>Contraseña</legend>
              <label class="form-group">
                <input type="password" id="contrasenaClienteInput" name="contrasenaClienteInput" maxlength="20" disabled />
                <button class="btn-editar" data-target="contrasenaClienteInput">Editar</button>
              </label>
            </fieldset>
          </div>
        </div>
      `;
      aplicarSoloLetras();
      inicializarInputsEditables();
      mostrarDatoSoloLectura('dniClienteInput', 'dniCliente');
    } else if (tipoUsuario === "empleado") {
      datosPersonalesDiv.innerHTML = `
        <div class="datosModificables">
          <div class="columna">
              <fieldset>
                <legend>Nombre/s</legend>
                <label class="form-group">
                  <input type="text" id="nombreEmpleadoInput" name="nombreEmpleadoInput" maxlength="50" class="solo-letras" disabled />
                  <button class="btn-editar" data-target="nombreEmpleadoInput">Editar</button>
                </label>
                <legend>Apellido/s</legend>
                <label class="form-group">
                  <input type="text" id="apellidoEmpleadoInput" name="apellidoEmpleadoInput" maxlength="50" class="solo-letras" disabled />
                  <button class="btn-editar" data-target="apellidoEmpleadoInput">Editar</button>
                </label>
                <legend>DNI</legend> 
                <label class="form-group">
                  <input type="text" id="dniEmpleadoInput" name="dniEmpleadoInput" disabled />
                </label>
                <legend>Email</legend>
                <label class="form-group">
                  <input type="email" id="emailEmpleadoInput" name="emailEmpleadoInput" maxlength="100" disabled />
                  <button class="btn-editar" data-target="emailEmpleadoInput">Editar</button>
                </label>
                <legend>Contraseña</legend>
                <label class="form-group">
                  <input type="password" id="contrasenaEmpleadoInput" name="contrasenaEmpleadoInput" maxlength="20" disabled />
                  <button class="btn-editar" data-target="contrasenaEmpleadoInput">Editar</button>
                </label>
              </fieldset>
            </div>
          <div class="columna">
              <fieldset>
                <legend>Sucursal</legend>
                <input type="text" id="sucursalEmpleadoText" name="sucursalEmpleadoText" disabled/>
                <legend>Puesto principal</legend> 
                <label class="form-group">
                  <input type="text" id="puestoEmpleadoInput" name="puestoEmpleadoInput" disabled />
                </label>
                <legend>Mis funciones</legend>
                <table id="tablaFunciones">
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Hora</th>
                      <th>Función</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Acá se llenarán las filas dinámicamente -->
                  </tbody>
                </table>
              </fieldset>
            </div>
        </div>
      `;
      aplicarSoloLetras();
      inicializarInputsEditables();
      mostrarDatoSoloLectura('dniEmpleadoInput', 'dniEmpleado');
      mostrarDatoSoloLectura('puestoEmpleadoInput', 'puestoEmpleado');

      /*Rellena la tabla de datosPersonales, empleado*/
      const idEmpleado = sessionStorage.getItem("idEmpleado");

      if (idEmpleado) {
        obtenerFuncionesEmpleado(idEmpleado, mostrarTablaFunciones);
      } else {
        console.error("No se encontró el idEmpleado en sessionStorage.");
      }
    }
  }

  /*Cargar contenido dinámico dentro de misReservas*/
  const misReservasDiv = document.getElementById("list-misReservas");

  if (misReservasDiv) {
  if (tipoUsuario === "cliente") {
    misReservasDiv.innerHTML = `
    <section id="contenedorMisReservasC">
      <h2>Mis reservas</h2>

      <h3>📅 Reservas Futuras</h3>
      <div class="table-responsive">
        <table id="tablaReservasFuturas" class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Mesa</th>
              <th>Personas</th>
              <th>Observaciones</th>
              <th>Estado</th>
              <th></th> <!-- Columna vacía para botones -->
            </tr>
          </thead>
          <tbody>
            <!-- Filas agregadas dinámicamente con JS -->
          </tbody>
        </table>
      </div>

      <h3>📖 Historial de Reservas</h3>
      <div class="table-responsive">
        <table id="tablaReservasPasadas" class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Mesa</th>
              <th>Personas</th>
              <th>Observaciones</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <!-- Se llenará dinámicamente -->
          </tbody>
        </table>
      </div>
    </section>
    `;

    // Luego de inyectar el HTML, obtenemos el id y llamamos a la función para traer reservas
    const idCliente = sessionStorage.getItem("idCliente");
    if (idCliente) {
      obtenerReservasYGuardarSesion(idCliente).then(reservas => {
        mostrarReservasEnTabla(reservas);
      });
    }
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
            <p>Aca puedes cancelar una reserva. Podria carcelar la reserva para un solo individuo o masivamente. Debe redactarse una nota que se enviará al mail de la/el/los involucrados(simulado)</p>
          </div>
          <div id="visualizar" class="seccionEmpleado" style="display: none;">
            <h3>Visualizar reservas</h3>
            <p>Tabla o datos de reservas existentes.Se va poder sumar puntos, anular reserva y concretar reserva</p>
          </div>
        </div>
      `;
    }
  }
  const tabHash = sessionStorage.getItem("tabActivo");
  if (tabHash) {
    const tabLink = document.querySelector(`a[href="${tabHash}"]`);
    if (tabLink) {
      // Aseguramos que esté visible (por si fue ocultado por lógica de usuario)
      tabLink.classList.remove("d-none");
      const pane = document.querySelector(tabHash);
      if (pane) pane.classList.remove("d-none");

      // Activar el tab
      const tab = new bootstrap.Tab(tabLink);
      tab.show();
    }
    sessionStorage.removeItem("tabActivo");
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

    // Si corresponde, cargar dinámicamente
    if (targetId === "list-modificarMenu") {
      cargarMenu();
    }
  });
});
/*HEADER*/
/*Hace que el nav sea responsive con un boton hamburguesa*/
document.addEventListener("DOMContentLoaded", function () {
  window.toggleMenu = function () {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
  }
});
/*FOOTER*/
window.addEventListener("DOMContentLoaded", actualizarFooter);
window.addEventListener("resize", actualizarFooter);
/*Funciona para mostrar formulario de ingresoCliente desde el footer.*/
/*Si ya ingreso sesion, no hace nada. Si no ingreso sesion, muestra el formulario*/
function restringirIngresarFooter(tipo) {
  const usuarioTipo = sessionStorage.getItem("usuarioTipo");

  /*Si se inicio sesión*/
  if (usuarioTipo) {
    alert("Ya iniciaste sesión como " + usuarioTipo + ". Cerrá sesión para ingresar con otra cuenta.");
    return;
  }

  const hash = tipo.toLowerCase() === "cliente" ? "#cliente" : "#empleado";
  window.location.href = "ingresar.html" + hash;
}
function restringirDatosPersonalesFooter(tipo) {
  const usuarioTipo = sessionStorage.getItem("usuarioTipo");

  /*No se inicio sesión*/
  if (!usuarioTipo) {
    alert("Debe iniciar sesión para acceder al sitio.");
    const hash = tipo === "cliente" ? "#cliente" : "#empleado";
    window.location.href = "ingresar.html" + hash;
    return;
  }

  /*Se inicio sesión como cliente*/
  if (usuarioTipo === "cliente") {
    if (tipo === "cliente") {
      nnavegarConTab('list-datosPersonales-list')
    } else {
      alert("Solo los empleados pueden acceder a esta sección.");
    }
    return;
  }

  /*Se inicio sesión como empleado*/
  if (usuarioTipo === "empleado") {
    if (tipo === "empleado") {
      navegarConTab('list-datosPersonales-list')
    } else {
      alert("Solo los clientes pueden acceder a esta sección.");
    }
    return;
  }
}
function restringirMisReservasFooter(tipo) {
  const usuarioTipo = sessionStorage.getItem("usuarioTipo");

  /*No se inicio sesión*/
  if (!usuarioTipo) {
    alert("Debe iniciar sesión para acceder al sitio.");
    const hash = tipo.toLowerCase() === "cliente" ? "#cliente" : "#empleado";
    window.location.href = "ingresar.html" + hash;
    return;
  }

  /*Se inicio sesión como cliente*/
  if (usuarioTipo === "cliente") {
    if (tipo === "cliente") {
      navegarConTab('list-misReservas-list')
    } else {
      alert("Solo los empleados pueden acceder a esta sección.");
    }
    return;
  }

  /*Se inicio sesión como empleado*/
  if (usuarioTipo === "empleado") {
    if (tipo === "empleado") {
      navegarConTab('list-misReservas-list')
    } else {
      alert("Solo los clientes pueden acceder a esta sección.");
    }
    return;
  }
}
function restringirModificarMenuFooter(tipo) {
  const usuarioTipo = sessionStorage.getItem("usuarioTipo");
  const puesto = sessionStorage.getItem("puestoEmpleado");

  /*No se inicio sesión*/
  if (!usuarioTipo) {
    alert("Sitio solo accesible para empleados.");
    window.location.href = "ingresar.html" + "#empleado";
    return;
  }

  /*Se inicio sesión como cliente*/
  if (usuarioTipo === "cliente") {
    alert("Solo los empleados pueden acceder a esta sección.");
    return;
  }

  /*Se inicio sesión como empleado*/
  if (usuarioTipo === "empleado") {
    /*Si el empleado es subgerente o gerente*/
    if (puesto === "Subgerente" || puesto === "Gerente") {
      navegarConTab('list-modificarMenu-list')
    } else {
      alert("Solo los gerentes y subgerentes pueden acceder a esta sección.");
    }
    return;
  }
}
function restringirAdministradorFooter(tipo) {
  const usuarioTipo = sessionStorage.getItem("usuarioTipo");
  const puesto = sessionStorage.getItem("puestoEmpleado");

  /*No se inicio sesión*/
  if (!usuarioTipo) {
    alert("Sitio solo accesible para empleados.");
    window.location.href = "ingresar.html" + "#empleado";
    return;
  }

  /*Se inicio sesión como cliente*/
  if (usuarioTipo === "cliente") {
    alert("Solo los empleados pueden acceder a esta sección.");
    return;
  }

  /*Se inicio sesión como empleado*/
  if (usuarioTipo === "empleado") {
    /*Si el empleado es subgerente o gerente*/
    if (puesto === "Gerente") {
      navegarConTab('list-baseDatos-list')
    } else {
      alert("Solo los gerentes pueden acceder a esta sección.");
    }
    return;
  }
}
function crearDropdown(id, opciones) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;

  dropdown.innerHTML = '';

  label = id.replace('dropdown', ''); // Quita "dropdown"
  label = label.charAt(0).toUpperCase() + label.slice(1);

  const defaultOption = document.createElement('option');
  defaultOption.textContent = label;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  opciones.forEach(op => {
    const option = document.createElement('option');
    option.text = op.text;
    option.value = op.value;
    dropdown.appendChild(option);
  });

  dropdown.onchange = function () {
    const selectedValue = this.value;

    if (selectedValue.startsWith('js:')) {
      const functionCall = selectedValue.replace('js:', '');
      eval(functionCall);
    } else {
      window.location.href = selectedValue;
    }

    this.selectedIndex = 0;
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
    crearDropdown('dropdownInstitucional', [
      { text: 'Quiénes somos', value: 'nosotros.html' },
      { text: 'Menú', value: 'menu.html' },
      { text: 'Reservas', value: 'reservas.html' },
      { text: 'Promociones', value: 'promociones.html' },
      { text: 'Tienda de puntos', value: 'tiendaDePuntos.html' }
    ]);

    crearDropdown('dropdownCliente', [
      { text: 'Ingresar', value: "js:restringirIngresarFooter('cliente')" },
      { text: 'Datos Personales', value: "js:restringirDatosPersonalesFooter('cliente')" },
      { text: 'Mis reservas', value: "js:restringirMisReservasFooter('cliente')" }
    ]);

    crearDropdown('dropdownEmpleado', [
      { text: 'Ingresar', value: "js:restringirIngresarFooter('empleado')" },
      { text: 'Datos Personales', value: "js:restringirDatosPersonalesFooter('empleado')" },
      { text: 'Mis reservas', value: "js:restringirMisReservasFooter('empleado')" },
      { text: 'Menú', value: "js:restringirModificarMenuFooter('empleado')" },
      { text: 'Administrador', value: "js:restringirAdministradorFooter('empleado')" }
    ]);

    crearDropdown('dropdownRedesSociales', [
      { text: 'Facebook', value: 'https://www.facebook.com/Ovejanegragrupoteatral/' },
      { text: 'Instagram', value: 'https://www.instagram.com/ovejanegra.pc/' }
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
function guardarSucursalDeReserva(btn) {
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

  mostrarSeccion('datosDeReserva', btn);
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
      mostrarSucursalEmpleado();

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
  const selector = document.getElementById("selectorSucursales");

  const valorGuardado = sessionStorage.getItem("sucursalSeleccionada");
  if (valorGuardado && selector) {
    selector.value = valorGuardado;
  }

  const dropdown = document.getElementById("dropdownReservas");
  if (dropdown && valorGuardado) {
    dropdown.value = valorGuardado;
  }

  const dropdownEmpleado = document.getElementById("dropdownReservasEmpleado");
  if (dropdownEmpleado && valorGuardado) {
    dropdownEmpleado.value = valorGuardado;
  }

  if (selector) {
    selector.addEventListener("change", function () {
      const valor = selector.value;
      if (valor !== "") {
        guardarSeleccionSucursal(valor);
        cargarTodasLasCategorias();
      }
    });
  }
  if (valorGuardado) {
    cargarTodasLasCategorias();
  }
});
/*Carga el input sobre la sucursal a la que pertenece el empleado en Mi Perfil, datos personales*/
function mostrarSucursalEmpleado() {
  const idLocalEmpleado = sessionStorage.getItem('idLocalEmpleado');
  if (idLocalEmpleado && locales.length > 0) {
    const sucursal = locales.find(local => local.id_local === idLocalEmpleado);
    const texto = (sucursal && sucursal.nombre) ? sucursal.nombre : 'Sucursal desconocida';
    const pSucursal = document.getElementById('sucursalEmpleadoText');
    if (pSucursal) pSucursal.value = texto;
  }
}
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
function aplicarSoloLetras() {
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
}
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
      if (data.includes("✅")) {// nos fijamos que la respuesta contiene "✅", se puede cambiar en el archivo php
        /*Si el formato es valido aparece este cartel*/
        alert("¡Registro exitoso!\nYa podés iniciar sesión con tu correo electrónico, DNI y contraseña.");
        window.location.reload(); // recargamos la pagina
      } else if (data.includes("❌") || data.includes("❗")) {
        alert(data); // muestra el mensaje de error que viene desde PHP
      } else {
        alert("⚠️ Respuesta inesperada del servidor:\n" + data);
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
      if (data.includes("✅")) {  // nos fijamos que la respuesta contiene "✅", se puede cambiar en el archivo php
        const partes = data.split("|"); // separa los campos
        const datos = {}; // usamos un objeto para guardar los pares clave:valor

        for (let i = 1; i < partes.length; i++) { //cargamos las partes en los datos, excluyendo el ✅
          const [clave, valor] = partes[i].split("="); // las separamos en el "="
          datos[clave] = valor; // y las asignamos
        }

        alert("✅ Bienvenido " + datos.nombre + "!");// le damos la bienvenida personalizada al cliente

        /*Creamos una variable para indicar que el usuario que ingreso es un cliente*/
        sessionStorage.setItem("usuarioTipo", "cliente");
        sessionStorage.setItem("idCliente", datos.id_cliente);
        sessionStorage.setItem("nombreCliente", datos.nombre);
        sessionStorage.setItem("apellidoCliente", datos.apellido);
        sessionStorage.setItem("dniCliente", datos.dni);
        sessionStorage.setItem("emailCliente", datos.email);
        sessionStorage.setItem("telefonoCliente", datos.telefono);
        sessionStorage.setItem("fecha_nacimientoCliente", datos.fecha_nacimiento);
        sessionStorage.setItem("contrasenaCliente", datos.contrasena);

        window.location.href = "index.html"; // redirige a la pagina que queramos (en este caso index.html)

        sessionStorage.setItem("idEmpleado", null);
        sessionStorage.setItem("puestoEmpleado", null);
      } else {
        alert("Uno o más datos son incorrectos.");
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

        alert("✅ Bienvenido " + datos.nombre + "!");// le damos la bienvenida personalizada al cliente

        /*Creamos una variable para indicar que el usuario que ingreso es un empleado*/
        sessionStorage.setItem("usuarioTipo", "empleado");
        sessionStorage.setItem("idEmpleado", datos.id_empleado);
        sessionStorage.setItem("nombreEmpleado", datos.nombre);
        sessionStorage.setItem("apellidoEmpleado", datos.apellido);
        sessionStorage.setItem("dniEmpleado", datos.dni);
        sessionStorage.setItem("emailEmpleado", datos.email);
        sessionStorage.setItem("puestoEmpleado", datos.puesto);
        sessionStorage.setItem("contrasenaEmpleado", datos.contrasena);
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
/*Funcion para saber la descripción de la mesa segun su id_mesa*/
function obtenerDescripcionMesa(idMesa) {
  fetch("obtener_descripcion_mesas.php?id=" + idMesa)
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        console.error("Respuesta con error:", data);
        throw new Error(data.error || "Error desconocido");
      }
      return data;
    })
    .then(data => {
      if (data.descripcion) {
        document.getElementById("mesaSeleccionada").textContent = data.descripcion;
      }
    })
    .catch(error => {
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    });
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

  const tipo = document.getElementById("cuenta-cliente").checked ? "cliente" : "empleado";

  const formData = new FormData();
  formData.append("tipo", tipo);
  formData.append("mail", email);
  formData.append("dni", dni);

  fetch("validar_dni_mail.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(result => {
      if (result.trim() === "existe") {
        document.getElementById("datos-enviar-mail").style.display = "none"; //Ocultar datos-enviar-mail
        document.getElementById("email-confirmado").textContent = email; //mostrar confirmacion-envio-mail
        document.getElementById("confirmacion-envio-mail").style.display = "grid";
      } else {
        alert("❌ No se encontró ninguna cuenta con ese email y DNI.");
      }
    })
    .catch(error => {
      console.error("Error al verificar:", error);
      alert("❌ Ocurrió un error al verificar los datos.");
    });
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
  // Se oculta la sección que contiene al botón (padre más cercano tipo <section>)
  const seccionActual = boton.closest("section");
  if (seccionActual) {
    seccionActual.style.display = "none";
  }

  // Mostrar sección destino
  const seccionDestino = document.getElementById(idDestino);
  if (seccionDestino) {
    seccionDestino.style.display = "grid";
  }
}
/*Muestra el contenido de los botones en Mis reservas de empleado en mi perfil*/
function mostrarContenidoMisReservasE(seccion) {
  // Se ocultan todas las secciones
  const secciones = document.querySelectorAll('.seccionEmpleado');
  secciones.forEach(s => {
    s.style.display = 'none';
  });

  //Se muestra solo la sección seleccionada
  const seccionMostrada = document.getElementById(seccion);
  if (seccionMostrada) {
    seccionMostrada.style.display = 'grid';
  }
}
/*MI PERFIL*/
/*Obtiene el valor del dato del empleado desde el sessionStorage y lo inserta en un input en datos Personales, mi perfil*/
/*Permite modificar los datos individualmente y carga los datos en la base de datos*/
function inicializarInputsEditables() {
  const botones = document.querySelectorAll('.btn-editar'); /*Selecciona todos los botones "Editar"*/

  botones.forEach((btn) => {
    const inputId = btn.dataset.target; /*El ID del input relacionado (usado en data-target)*/
    const input = document.getElementById(inputId); /*Se obtiene el input correspondiente*/
    const claveSession = inputId.replace('Input', ''); /*Convierte 'nombreEmpleadoInput' en 'nombreEmpleado'*/
    const valorGuardado = sessionStorage.getItem(claveSession); /*Obtiene el valor almacenado en sessionStorage*/

    /*Si hay valor guardado, lo muestra en el input*/
    if (valorGuardado) {
      input.value = valorGuardado;
      /* Si es el campo de contraseña, mostrar el texto en lugar de los puntos codificados*/
      if (inputId === 'contrasenaEmpleadoInput' || inputId === 'contrasenaClienteInput') {
        input.type = 'text';
      }
    }

    /*Se agrega un listener al botón para alternar entre "Editar" y "Confirmar"*/
    btn.addEventListener('click', () => {
      if (btn.textContent === 'Editar') {
        /*Habilita la edición del input*/
        input.disabled = false;
        input.focus();
        btn.textContent = 'Confirmar';
      } else {
        /*Obtiene el nuevo valor ingresado*/
        const nuevoValor = input.value.trim();
        if (nuevoValor) {
          /*Guarda el nuevo valor en sessionStorage*/
          sessionStorage.setItem(claveSession, nuevoValor);
          /*Desactiva el campo nuevamente*/
          input.disabled = true;
          btn.textContent = 'Editar';

          /*Enviar el cambio al servidor*/
          const idEmpleado = sessionStorage.getItem('idEmpleado');
          if (idEmpleado) {
            /*Envia la actualización con método POST*/
            fetch('actualizar_empleado.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                campo: claveSession,
                valor: nuevoValor,
                id_empleado: idEmpleado
              })
            })
              .then(response => response.text()) /*Se recibe la respuesta como texto plano*/
              .then(respuesta => {
                console.log('Respuesta del servidor:', respuesta);
                alert("✅ Actualización realizada con éxito.");
              })
              .catch(error => {
                console.error('Error al actualizar en la base de datos:', error);
                alert("❌ Error al actualizar los datos. Intente nuevamente.");
              });
          } else {
            console.error('No hay idEmpleado en sessionStorage');
          }

          /*Enviar el cambio al servidor*/
          const idCliente = sessionStorage.getItem('idCliente');
          if (idCliente) {
            /*Envia la actualización con método POST*/
            fetch('actualizar_cliente.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                campo: claveSession,
                valor: nuevoValor,
                id_cliente: idCliente
              })
            })
              .then(response => response.text()) /*Se recibe la respuesta como texto plano*/
              .then(respuesta => {
                console.log('Respuesta del servidor:', respuesta);
                alert("✅ Actualización realizada con éxito.");
              })
              .catch(error => {
                console.error('Error al actualizar en la base de datos:', error);
                alert("❌ Error al actualizar los datos. Intente nuevamente.");
              });
          } else {
            console.error('No hay idEmpleado en sessionStorage');
          }

        } else {
          alert('El campo no puede estar vacío.');
        }
      }
    });
  });
}
function mostrarDatoSoloLectura(idCampo, claveSessionStorage) {
  const input = document.getElementById(idCampo);
  input.value = sessionStorage.getItem(claveSessionStorage) || '';
  input.disabled = true;
}
/* se encarga de consultar al servidor por las funciones asignadas a un empleado específico usando su id_empleado, y luego guarda esos datos en sessionStorage. */
/*Se debe ingresar el id del empleado y te devuelve las funciones y las horas en las que las realiza*/
function obtenerFuncionesEmpleado(idEmpleado, callback) { /*callback es una función opcional que se ejecuta una vez obtenidas las funciones*/
  /*Inicia una petición HTTP POST a obtener_empleado_funcion.php, el script que devuelve las funciones del empleado*/
  fetch('obtener_empleado_funcion.php', {
    /*los datos se enviarán codificados como si fueran los de un formulario HTML (application/x-www-form-urlencoded)*/
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    /*El cuerpo de la solicitud incluye el id_empleado codificado para evitar errores por caracteres especiales*/
    body: 'id_empleado=' + encodeURIComponent(idEmpleado),
  })
    /*Espera una respuesta, si el servidor devuelve un estado que no es 200–299, lanza un error*/
    .then(response => {
      /*Si es válida, interpreta la respuesta como JSON.Un arreglo de funciones con fecha, hora y nombre*/
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    /*Guarda el JSON recibido en sessionStorage bajo la clave "empleado_funcion", convirtiéndolo a cadena de texto con JSON.stringify*/
    .then(data => {
      sessionStorage.setItem('empleado_funcion', JSON.stringify(data));
      /*Si se pasó una función callback, se ejecuta y se le pasa como argumento los datos recibidos (data)*/
      if (callback) callback(data); /* Llama a la función para mostrar la tabla*/
    })
    /*Si ocurre algun error durante la petición lo muestra en la consola para depuración*/
    .catch(error => {
      console.error('Error al obtener funciones del empleado:', error);
    });
}
/*Muestra en una tabla HTML las funciones programadas para un empleado, que se encuentra en datos personales, mis reservas empleado*/
/*Solo muestra las funciones a partir de la fecha actual en adelante*/
if (window.location.pathname.includes("miPerfil.html")) {
  function mostrarTablaFunciones(funciones) {
    const tbody = document.querySelector("#tablaFunciones tbody");
    /*Limpiar el contenido anterior de la tabla*/
    tbody.innerHTML = "";
    /*Crear una instancia de la fecha de hoy, y resetea la hora a medianoche*/
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); /*Esto permite comparar solo la fecha, sin considerar la hora*/

    /*Filtrar funciones para que solo se muestren las de hoy o fechas futuras*/
    const funcionesFiltradas = funciones.filter(f => {
      const fechaFuncion = new Date(f.dia_hora);
      fechaFuncion.setHours(0, 0, 0, 0);  /*También eliminar hora en las fechas de funciones*/
      return fechaFuncion >= hoy;
    });

    /*Si no hay funciones futuras, mostrar mensaje informativo en la tabla*/
    if (funcionesFiltradas.length === 0) {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td colspan="3">No hay funciones futuras programadas.</td>`;
      tbody.appendChild(fila);
      return;
    }

    /*Junta las funciones filtradas y crea una fila por cada una*/
    funcionesFiltradas.forEach(f => {
      const fecha = new Date(f.dia_hora);
      const dia = fecha.toLocaleDateString(); /*Obtiene la fecha en formato "16/06/2025"*/
      const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); /*Obtiene la hora en formato "18:00" hora y min*/

      const fila = document.createElement("tr");
      /*Crea una nueva fila con los datos*/
      fila.innerHTML = `
        <td>${dia}</td>
        <td>${hora}</td>
        <td>${f.funcion}</td>
      `;
      /*Se agrega la fila a la tabla*/
      tbody.appendChild(fila);
    });
  }
}
/*conecta la pagina datosPersonales con la tabla mostrarTablaFunciones*/
/*Obtiene el idEmpleado desde sessionStorage, llama a obtenerFuncionesEmpleado() para obtener sus datos y usa esos datos para mostrar la tabla con mostrarTablaFunciones()*/
document.addEventListener('DOMContentLoaded', () => {
  const idEmpleado = sessionStorage.getItem("idEmpleado");

  if (idEmpleado) {
    obtenerFuncionesEmpleado(idEmpleado, mostrarTablaFunciones);
  } else {
    console.error("No se encontró el idEmpleado en sessionStorage.");
  }
});
/*TIENDA DE PUNTOS*/
if (window.location.pathname.includes("tiendaDePuntos.html")) {
  document.addEventListener("DOMContentLoaded", async () => {
    const puntosDelCliente = document.getElementById("puntosDelCliente");
    const usuarioTipo = sessionStorage.getItem("usuarioTipo");
    const idCliente = sessionStorage.getItem("idCliente");

    if (usuarioTipo === "cliente" && idCliente) {
      // Esperamos a que obtenga las reservas y actualice sessionStorage
      await obtenerReservasYGuardarSesion(idCliente);

      const puntos = sessionStorage.getItem("puntosCliente") || 0;

      puntosDelCliente.style.display = "grid";
      puntosDelCliente.textContent = `Tus puntos: ${puntos}`;
    } else {
      puntosDelCliente.style.display = "none";
    }
  });
}
/*RESERVAS*/
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
      locale: "es",
      minDate: "today", // No permite fechas anteriores al día actual
      disable: [
        function (date) {
          return date.getDay() === 1; // Desactiva los lunes
        }
      ],
      defaultDate: sessionStorage.getItem("fechaReserva") || null,
      onChange: function (selectedDates, dateStr) {
        fechaInput.value = dateStr; // Guarda en el input hidden si lo usás
        sessionStorage.setItem("fechaReserva", dateStr);
        generarOpcionesHorario(dateStr); 
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

    function cargarMesasDisponibles() {
      const idLocal = sessionStorage.getItem("sucursalValor");
      const fecha = sessionStorage.getItem("fechaReserva");
      const hora = sessionStorage.getItem("horaReserva");
      const personas = sessionStorage.getItem("cantPersonasReserva");

      // const mesaSelect = document.getElementById("mesaReserva");
      if (!mesaSelect || !idLocal || !fecha || !hora || !personas) return;

      mesaSelect.innerHTML = "<option>Cargando...</option>";
      mesaSelect.disabled = true;

      const url = `obtener_mesas_disponibles.php?id_local=${idLocal}&fecha=${fecha}&hora=${hora}&personas=${personas}`;
      fetch(url)
        .then(res => res.text())
        .then(opciones => {
          mesaSelect.innerHTML = opciones;
          mesaSelect.disabled = false;
        })
        .catch(err => {
          console.error("Error al cargar mesas:", err);
          mesaSelect.innerHTML = "<option>Error al cargar</option>";
        });
    }

    // Habilita mesa solo si fecha, hora y personas están seleccionadas
    function validarHabilitarMesa() {
      const fecha = sessionStorage.getItem("fechaReserva");
      const hora = horaSelect.value;
      const personas = personasSelect.value;

      if (fecha && hora && personas) {
        cargarMesasDisponibles()
        // mesaSelect.disabled = false;
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
function volverSeleccionSucursalReserva(btn) {
  sessionStorage.removeItem("sucursalValor");
  sessionStorage.removeItem("sucursalNombre");
  sessionStorage.removeItem("fechaSeleccionada");
  sessionStorage.removeItem("horaSeleccionada");
  sessionStorage.removeItem("personasSeleccionadas");
  sessionStorage.removeItem("observacioDada");
  sessionStorage.removeItem("mesaSeleccionada");

  document.getElementById("fechaReserva").value = "";
  document.getElementById("horaReserva").selectedIndex = 0;
  document.getElementById("cantPersonasReserva").selectedIndex = 0;
  document.getElementById("mesaReserva").selectedIndex = 0;
  document.getElementById("observacionesReserva").value = "";

  mostrarSeccion('seleccionSucursalDeReserva', btn);
}
/*Verifica que esten todos los datos de reserva y los guarda en sessionStorage*/
function guardarValoresDatosReserva(btn) {
  /*Si no se seleccionó ninguna fecha en el calendario aparece el cartel de alerta*/
  const fechaSeleccionada = document.getElementById("fechaReserva").value;
  if (fechaSeleccionada === "") {
    alert("Debe seleccionar una fecha antes de continuar.");
    return;
  }

  /*Si no se seleccionó ninguna hora aparece el cartel de alerta*/
  const horaSelect = document.getElementById("horaReserva");
  const horaSeleccionada = horaSelect.value;
  if (horaSeleccionada === "") {
    alert("Debe seleccionar un horario antes de continuar.");
    return;
  }

  /*Si no se seleccionó la cantidad de personas aparece el cartel de alerta*/
  const personasSelect = document.getElementById("cantPersonasReserva");
  const personasSeleccionadas = personasSelect.value;
  if (personasSeleccionadas === "") {
    alert("Debe indicar la cantidad de personas antes de continuar.");
    return;
  }

  /*Si no se seleccionó ninguna mesa aparece el cartel de alerta*/
  const mesaSelect = document.getElementById("mesaReserva");
  const mesaSeleccionada = mesaSelect.value;
  if (mesaSeleccionada === "") {
    alert("Debe seleccionar una mesa antes de continuar.");
    return;
  }

  const observacion = document.getElementById("observacionesReserva").value;

  sessionStorage.setItem("fecha", fechaSeleccionada); // Guardamos los datos para uso del formulario PHP
  sessionStorage.setItem("hora", horaSeleccionada);
  sessionStorage.setItem("cantidad", personasSeleccionadas);
  sessionStorage.setItem("mesa", mesaSeleccionada);
  sessionStorage.setItem("observaciones", observacion);


  sessionStorage.setItem("fechaSeleccionada", fechaSeleccionada); //datos duplicados con alias para mostrar en pantalla
  sessionStorage.setItem("horaSeleccionada", horaSeleccionada);
  sessionStorage.setItem("personasSeleccionadas", personasSeleccionadas);
  sessionStorage.setItem("mesaSeleccionada", mesaSeleccionada);
  sessionStorage.setItem("ObservacionDada", observacion);

  // Mostramos los datos en la sección de confirmación
  document.getElementById("sucursalSeleccionada").textContent = sessionStorage.getItem("sucursalNombre");
  document.getElementById("fechaSeleccionada").textContent = fechaSeleccionada;
  document.getElementById("horaSeleccionada").textContent = horaSeleccionada;
  document.getElementById("cantPersonasSeleccionada").textContent = personasSeleccionadas + " persona/s";
  obtenerDescripcionMesa(mesaSeleccionada);
  document.getElementById("ObservacionDada").textContent = observacion;

  mostrarSeccion('confirmacionReserva', btn);
}

function volverSeleccionDatosReserva() {
  /* Ocultar confirmación de reserva*/
  document.getElementById("confirmacionReserva").style.display = "none";

  /* Mostrar datos reserva*/
  document.getElementById("datosDeReserva").style.display = "grid";
}

function enviarReserva() {
  const id_cliente = sessionStorage.getItem("idCliente");
  const id_local = sessionStorage.getItem("sucursalValor");
  const fecha = sessionStorage.getItem("fecha");
  const hora = sessionStorage.getItem("hora");
  const cantidad = sessionStorage.getItem("cantidad");
  const mesa = sessionStorage.getItem("mesa");
  const observaciones = sessionStorage.getItem("observaciones");

  if (!id_cliente || !id_local || !fecha || !hora || !cantidad || !mesa) {
    alert("Faltan datos para completar la reserva.");
    return;
  }

  const formData = new FormData();
  formData.append("id_cliente", id_cliente);
  formData.append("sucursal", id_local);
  formData.append("fecha", fecha);
  formData.append("hora", hora);
  formData.append("cantidad", cantidad);
  formData.append("mesa", mesa);
  formData.append("observaciones", observaciones);

  fetch("procesar_reserva.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      if (data.includes("✅")) {
        alert("✅ Reserva realizada con éxito.");
        window.location.href = "index.html";
      } else {
        alert("❌ Error: " + data);
      }
    })
    .catch(error => {
      console.error("Error al enviar la reserva:", error);
      alert("❌ Error al procesar la reserva. Intente nuevamente.");
    });
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
  document.getElementById("list-modificarMenu").innerHTML = "Espere..."
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

async function obtenerReservasYGuardarSesion(idCliente) {
  try {
    const response = await fetch(`obtener_reservas_cliente.php?idCliente=${idCliente}`);
    const text = await response.text();

    // Intentar parsear como JSON
    const reservas = JSON.parse(text);

    // Contar reservas con estado "realizada/concretada"
    const puntosCliente = reservas.reduce((contador, reserva) => {
      const estado = reserva.estado_reserva?.trim().toLowerCase();
      if (estado === 'realizada/concretada') return contador + 1;
      return contador;
    }, 0);

    // Guardar en sessionStorage
    sessionStorage.setItem('reservas', JSON.stringify(reservas));
    sessionStorage.setItem('puntosCliente', puntosCliente.toString());
    return reservas;

  } catch (error) {
    console.error('❌ Error en obtenerReservasYGuardarSesion:', error);
  }
}
/*Maneja la tabla de reservas pasadas en cliente*/
function mostrarReservasEnTabla(reservas) {
  const tbodyFuturas = document.querySelector("#tablaReservasFuturas tbody");
  const tbodyPasadas = document.querySelector("#tablaReservasPasadas tbody");

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // para comparar solo la fecha

  reservas.forEach(reserva => {
    const fechaHora = new Date(reserva.fecha_reserva); // Asegurate de que sea tipo Date
    const estado = reserva.estado_reserva.toLowerCase();
    const esCanceladaOExpirada = estado === "cancelada" || estado === "expirada";
    const esFutura = fechaHora >= hoy && !esCanceladaOExpirada;

    if (esFutura) {
      // Mostrar en tabla de futuras
      tbodyFuturas.innerHTML += `
        <tr>
          <td>${reserva.fecha_reserva.split(' ')[0]}</td>
          <td>${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</td>
          <td>${reserva.descripcion_mesa || reserva.id_mesa}</td>
          <td>${reserva.cant_personas}</td>
          <td>${reserva.observaciones || "-"}</td>
          <td>${reserva.estado_reserva}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="modificarReservaCliente(${reserva.id}, this)">Modificar</button>
            <button class="btn btn-danger btn-sm" onclick="cancelarReservaCliente(${reserva.id})">Cancelar</button>
          </td>
        </tr>
      `;
    } else {
      // Mostrar en tabla de historial
      tbodyPasadas.innerHTML += `
        <tr>
          <td>${reserva.fecha_reserva.split(' ')[0]}</td>
          <td>${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</td>
          <td>${reserva.descripcion_mesa || reserva.id_mesa}</td>
          <td>${reserva.cant_personas}</td>
          <td>${reserva.observaciones || "-"}</td>
          <td>${reserva.estado_reserva}</td>
        </tr>
      `;
    }
  });
}
function modificarReservaCliente(id_reserva, btn) {
  const fila = btn.closest("tr");
  if (!fila) return alert("Error: fila no encontrada");

  const fecha = fila.children[0].innerText;
  const hora = fila.children[1].innerText;
  const mesa = fila.children[2].innerText;
  const personas = fila.children[3].innerText;
  const observaciones = fila.children[4].innerText;

  const hoy = new Date().toISOString().split("T")[0];

  // Reemplazar por inputs
  fila.children[0].innerHTML = `<input type="date" class="form-control input-fecha" value="${fecha}" min="${hoy}">`;
  fila.children[1].innerHTML = `
    <select class="form-control input-hora">
      <option value="">Seleccione hora</option>
      ${[11,12,13,14,15,16,17,18,19,20].map(h => {
        const horaStr = `${h.toString().padStart(2, "0")}:00:00`;
        return `<option value="${horaStr}" ${hora === horaStr ? "selected" : ""}>${h}:00</option>`;
      }).join("")}
    </select>`;
  fila.children[2].innerHTML = `<select class="form-control input-mesa"><option value="">Seleccione mesa</option></select>`;
  fila.children[3].innerHTML = `
    <select class="form-control input-personas">
      <option value="">¿Cuántas personas?</option>
      ${[1,2,3,4,5].map(n => `<option value="${n}" ${+personas === n ? "selected" : ""}>${n}</option>`).join("")}
    </select>`;
  fila.children[4].innerHTML = `<textarea class="form-control input-observaciones">${observaciones !== "-" ? observaciones : ""}</textarea>`;

  // Botones
  fila.children[6].innerHTML = `
    <button class="btn btn-success btn-sm me-1" onclick="guardarModificacionReserva(${id_reserva}, this)">Guardar</button>
    <button class="btn btn-secondary btn-sm" onclick="location.reload()">Cancelar</button>
  `;

  // Evento cambio fecha, hora o personas → cargar mesas
  const fechaInput = fila.querySelector(".input-fecha");
  const horaInput = fila.querySelector(".input-hora");
  const personasInput = fila.querySelector(".input-personas");
  const mesaInput = fila.querySelector(".input-mesa");

  [fechaInput, horaInput, personasInput].forEach(el => {
    el.addEventListener("change", () => {
      mesaInput.innerHTML = "<option>Cargando...</option>";
      mesaInput.disabled = true;

      const fecha = fechaInput.value;
      const hora = horaInput.value;
      const personas = personasInput.value;
      const id_local = sessionStorage.getItem("sucursalValor"); // o definilo vos

      // Validación
      if (!fecha || !hora || !personas || !id_local) {
        mesaInput.innerHTML = "<option>Seleccione fecha, hora y personas</option>";
        return;
      }

      // Validar que no sea lunes
      const selectedDate = new Date(fecha);
      if (selectedDate.getDay() === 1) {
        alert("Nuestros establecimientos permanecen cerrados los lunes.");
        mesaInput.innerHTML = "<option>Día no disponible</option>";
        return;
      }

      // Fetch mesas disponibles
      const url = `obtener_mesas_disponibles.php?id_local=${id_local}&fecha=${fecha}&hora=${hora}&personas=${personas}`;
      fetch(url)
        .then(res => res.text())
        .then(opciones => {
          mesaInput.innerHTML = opciones;
          mesaInput.disabled = false;
        })
        .catch(err => {
          console.error("Error al cargar mesas:", err);
          mesaInput.innerHTML = "<option>Error al cargar</option>";
        });
    });
  });
}
function generarOpcionesHorario(fechaSeleccionada) {
  const horaSelect = document.getElementById("horaReserva");
  const ahora = new Date();
  const fechaHoy = ahora.toISOString().split("T")[0];

  const horas = [
    "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00",
    "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00"
  ];

  horaSelect.innerHTML = '<option value="" selected>Seleccione hora de reserva</option>';

  horas.forEach(hora => {
    const [h, m, s] = hora.split(":");
    const horaCompleta = new Date(`${fechaSeleccionada}T${hora}`);

    // Si es hoy y la hora ya pasó, no la mostramos
    if (fechaSeleccionada === fechaHoy && horaCompleta <= ahora) return;

    const option = document.createElement("option");
    option.value = hora;
    option.textContent = hora.slice(0, 5); // 11:00
    horaSelect.appendChild(option);
  });
}
function guardarModificacionReserva(id_reserva, btn) {
  const fila = btn.closest("tr");
  const nuevaFecha = fila.children[0].querySelector("input").value;
  const nuevaHora = fila.children[1].querySelector("select").value;
  const nuevaMesa = fila.children[2].querySelector("select").value;
  const nuevaCantidad = fila.children[3].querySelector("select").value;
  const nuevaObs = fila.children[4].querySelector("textarea").value;
  const idCliente = sessionStorage.getItem("idCliente");

  const formData = new FormData();
  formData.append("id_reserva", id_reserva);
  formData.append("fecha", nuevaFecha);
  formData.append("hora", nuevaHora);
  formData.append("mesa", nuevaMesa);
  formData.append("cantidad", nuevaCantidad);
  formData.append("observaciones", nuevaObs);
  formData.append("modificado_por", idCliente);
  formData.append("tipo", "cliente");

  fetch("modificar_reserva_cliente.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      if (data.includes("✅")) {
        alert("Reserva modificada correctamente.");
        location.reload();
      } else {
        alert("❌ Error: " + data);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ No se pudo modificar la reserva.");
    });
}
function cancelarReservaCliente(id_reserva) {
  const idCliente = sessionStorage.getItem("idCliente");

  if (confirm("¿Estás seguro de que querés cancelar esta reserva?")) {
    const formData = new FormData();
    formData.append("id_reserva", id_reserva);
    formData.append("id_cliente", idCliente);
    formData.append("tipo", "cliente");

    fetch("cancelar_reserva_cliente.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(data => {
        if (data.includes("✅")) {
          alert("Reserva cancelada con éxito.");
          location.reload();
        } else {
          alert("❌ Error: " + data);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("❌ Error al cancelar la reserva.");
      });
  }
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
function cargarTodasLasCategorias() {
  const seccionesMenu = document.querySelectorAll("[id^='list-']");

  seccionesMenu.forEach(seccion => {
    const categoria = seccion.id.replace("list-", "");
    cargarCategoria(categoria);
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

// Base de datos en miPerfil.html
function cargarTabla(tabla) {
  fetch(`crud_tablas.php?tabla=${tabla}`)
    .then(response => response.text())
    .then(html => {
      const contenedor = document.getElementById(`tabla-${tabla}`);
      contenedor.innerHTML = `
  <input type="button" value="volver" onclick="mostrarSeccion('botonesDeTablas', this)">
  ${html}
`;
      inicializarEventosTabla(tabla); // para los botones agregar/modificar/eliminar
    })
    .catch(err => console.error("Error al cargar tabla:", err));
}
function inicializarEventosTabla(tabla) {
  // Agregar
  const formAgregar = document.querySelector(`#tabla-${tabla} form[data-accion="agregar"]`);
  if (formAgregar) {
    formAgregar.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(formAgregar);
      data.append("accion", "agregar");
      data.append("tabla", tabla);
      fetch("acciones_tabla.php", { method: "POST", body: data })
        .then(r => r.text())
        .then(alert)
        .then(() => cargarTabla(tabla));
    });
  }

  // Modificar
  document.querySelectorAll(`#tabla-${tabla} .btn-modificar`).forEach(btn => {
    btn.addEventListener("click", () => {
      if (!confirm("¿Modificar este registro?")) return;
      const form = btn.closest("form");
      const data = new FormData(form);
      data.append("accion", "modificar");
      data.append("tabla", tabla);
      data.append("id", btn.dataset.id);
      fetch("acciones_tabla.php", { method: "POST", body: data })
        .then(r => r.text())
        .then(alert)
        .then(() => cargarTabla(tabla));
    });
  });

  // Eliminar
  document.querySelectorAll(`#tabla-${tabla} .btn-eliminar`).forEach(btn => {
    btn.addEventListener("click", () => {
      if (!confirm("¿Eliminar este registro?")) return;
      const data = new FormData();
      data.append("accion", "borrar");
      data.append("tabla", tabla);
      data.append("id", btn.dataset.id);
      fetch("acciones_tabla.php", { method: "POST", body: data })
        .then(r => r.text())
        .catch(err => console.error("Error al cargar tabla:", err))
        .then(alert)
        .then(() => cargarTabla(tabla))
        .catch(err => console.error("Error al cargar tabla:", err));
    });
  });
}