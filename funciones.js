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
    aplicarSoloLetras();
    aplicarSoloNumeros();
  }
});
function navegarConTab(tabLinkId) {
  const href = "#" + tabLinkId.replace("-list", "");
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
                <input type="text" id="telefonoClienteInput" name="telefonoClienteInput" minlength="10" max="999999999" maxlength="20" class="solo-numeros" disabled />
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
      aplicarSoloNumeros();
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
      <div class="encabezadoMisReservas"> 
        <h2>Mis reservas</h2>
        <h2 id="puntosDelCliente">Mis puntos:</h2>
      </div>
      <h3>📅 Reservas Futuras</h3>
      <div class="table-responsive">
        <table id="tablaReservasFuturas" class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Local</th>
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
      <div class="notaImportanteReserva">
        <h5>📝Estados de reserva</h3>
        <p>
          Reservada: La reserva fue registrada correctamente y se encuentra vigente para la fecha y hora seleccionadas.<br>
          Cancelada: La reserva fue anulada por el cliente o por el personal del local debido a causas imprevistas.<br>
          Realizada / Concretada: La reserva se llevó a cabo en la fecha y hora previstas. Este tipo de reservas otorgan un punto al perfil del cliente, se pueden visualizar en la tienda de puntos.<br>
          Realizada / Anulada: La reserva fue anulada por el personal del local debido a la inasistencia del cliente en la fecha y hora programadas.<br>
        </p>
      </div>
      <h3>📖 Historial de Reservas</h3>
      <div class="table-responsive">
        <table id="tablaReservasPasadas" class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Local</th>
              <th>Mesa</th>
              <th>Personas</th>
              <th>Observaciones</th>
              <th>Estado</th>
              <th></th> <!-- Columna vacía para botones -->
            </tr>
          </thead>
          <tbody>
            <!-- Se llenará dinámicamente -->
          </tbody>
        </table>
      </div>
    </section>
    <!-- Modal para ver detalles de la Reserva -->
    <div class="modal fade" id="modalDetalleReserva" tabindex="-1" aria-labelledby="modalDetalleReservaLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalDetalleReservaLabel">Detalle de Reserva</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body" id="contenidoModalDetalle">
            <!-- Aquí se cargará dinámicamente el contenido -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para Modificar datos de la Reserva -->
    <div class="modal fade" id="modalModificarReserva" tabindex="-1" aria-labelledby="modalModificarReservaLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalModificarReservaLabel">Modificar Reserva</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body" id="contenidoModalModificar">
            <!-- Aquí se cargará dinámicamente el formulario para modificar -->
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para cancelar la Reserva -->
    <div class="modal fade" id="modalCancelarReserva" tabindex="-1" aria-labelledby="modalCancelarReservaLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCancelarReservaLabel">Cancelar Reserva</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <p>Por favor, indica el motivo de la cancelación:</p>
            <textarea id="motivoCancelacionInput" class="form-control" maxlength="255" placeholder="Motivo de la cancelación..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmarCancelacionBtn">Confirmar Cancelación</button>
          </div>
        </div>
      </div>
    </div>
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
            <section>
              <h2>Buscar reservas del cliente</h2>
              <form id="formBusquedaCliente" class="form-busqueda" onsubmit="busquedaCliente(event,'dniModificarEmpleado','emailModificarEmpleado','formBusquedaCliente','tablaReservasVigentes','modificar')">
                <input type="text" id="dniModificarEmpleado" name="dniModificarEmpleado" placeholder="DNI" required class="solo-numeros"/>
                <input type="email" id="emailModificarEmpleado" name="emailModificarEmpleado" placeholder="Mail" maxlength="100" required />
                <button type="submit">Buscar</button>
                <button type="button" onclick="limpiarTabla('tablaReservasVigentes', 'formBusquedaCliente')">Limpiar</button>
              </form>
            </section>
              <h2>Reservas del cliente</h2>
              <div class="table-responsive">
                <table id="tablaReservasVigentes" class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Local</th>
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
            </section>
            <!-- Modal para Modificar datos de la Reserva -->
            <div class="modal fade" id="modalModificarReserva" tabindex="-1" aria-labelledby="modalModificarReservaLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="modalModificarReservaLabel">Modificar Reserva</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                  </div>
                  <div class="modal-body" id="contenidoModalModificar">
                    <!-- Aquí se cargará dinámicamente el formulario para modificar -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="cancelar" class="seccionEmpleado" style="display: none;">
            <h3>Cancelar reservas</h3>
            <div id="selectorModoCancelacion" style="margin-bottom: 1rem;">
              <button type="button" onclick="mostrarVistaCancelacion('individual')">
                Cancelación individual
              </button>
              <button type="button" id="btnModoMasivo" onclick="mostrarVistaCancelacion('masiva')">
                Cancelación masiva
              </button>
            </div>

            <div id="vistaCancelacionIndividual">
              <h2>Buscar reservas del cliente</h2>
              <section>
                <form id="formBusquedaClienteCancelar" class="form-busqueda" onsubmit="busquedaCliente(event, 'dniCancelarEmpleado', 'emailCancelarEmpleado', 'formBusquedaClienteCancelar', 'tablaReservasVigentesCancelar', 'cancelar')">
                  <input type="text" id="dniCancelarEmpleado" name="dniCancelarEmpleado" placeholder="DNI" required class="solo-numeros"/>
                  <input type="email" id="emailCancelarEmpleado" name="emailCancelarEmpleado" placeholder="Mail" maxlength="100" required />
                  <button type="submit">Buscar</button>
                  <button type="button" onclick="limpiarTabla('tablaReservasVigentesCancelar', 'formBusquedaClienteCancelar')">Limpiar</button>
                </form>
              </section>
              <section>
                <h2>Reservas del cliente</h2>
                <div class="table-responsive">
                  <table id="tablaReservasVigentesCancelar" class="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Local</th>
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
              </section>
            </div>
            <div id="vistaCancelacionMasiva" style="display: none;">
              <form id="formCancelacionMasiva" onsubmit="event.preventDefault(); cancelacionMasiva();">
                <label>Local:</label>
                <select id="localCancelacionMasiva" />
                  <option value="">Seleccionar...</option>
                  <!-- Opciones dinámicas -->
                </select>
                <label>Fecha:</label>
                <input type="date" id="fechaCancelacionMasiva" />
                <label>Hora:</label>
                <select id="horaCancelacionMasiva">
                  <option value="">Seleccionar...</option>
                    <!-- Opciones dinámicas -->
                </select>
                <label>Motivo de cancelación:</label>
                <textarea id="motivoCancelacionMasiva" rows="3" cols="30" placeholder="Ingrese el motivo de la cancelación" maxlength="255" required></textarea>
                <button type="submit" class="btn btn-danger">Confirmar cancelación masiva</button>
              </form>
            </div>
            <!-- Modal para cancelar la Reserva -->
            <div class="modal fade" id="modalCancelarReserva" tabindex="-1" aria-labelledby="modalCancelarReservaLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="modalCancelarReservaLabel">Cancelar Reserva</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                  </div>
                  <div class="modal-body">
                    <p>Por favor, indica el motivo de la cancelación:</p>
                    <textarea id="motivoCancelacionInput" class="form-control" maxlength="255" placeholder="Motivo de la cancelación..."></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmarCancelacionBtn">Confirmar Cancelación</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="visualizar" class="seccionEmpleado" style="display: none;">
            <h3>Visualizar reservas</h3>
            <div id="resultadoReservasEmpleado"></div>
          </div>
        </div>
      <!-- Modal Detalle Reserva -->
      <div class="modal fade" id="modalDetalleReserva" tabindex="-1" aria-labelledby="tituloModalDetalleReserva" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="tituloModalDetalleReserva">Detalle de la Reserva</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" id="contenidoModalDetalle">
              <!-- Aquí se cargará dinámicamente el detalle -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal cambio de mesa -->
      <div class="modal fade" id="modalCambioMesa" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cambiar Mesa de Reserva</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <label for="selectNuevaMesa" class="form-label">Seleccionar nueva mesa:</label>
              <select id="selectNuevaMesa" class="form-select"></select>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary" id="btnConfirmarCambioMesa">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
      `;
      inicializarEventosMisReservasEmpleado();
      setTimeout(() => {
        const accion = sessionStorage.getItem("accionEmpleado");
        if (accion) {
          mostrarContenidoMisReservasE(accion); // ejemplo: 'modificar'
          sessionStorage.removeItem("accionEmpleado");
        }
      }, 100);
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
  const accionEmpleado = sessionStorage.getItem("accionEmpleado");
  if (accionEmpleado && sessionStorage.getItem("usuarioTipo") === "empleado") {
    mostrarContenidoMisReservasE(accionEmpleado);
    sessionStorage.removeItem("accionEmpleado");
  }
  window.addEventListener("load", () => {
    const dni = sessionStorage.getItem("busquedaDNI");
    const email = sessionStorage.getItem("busquedaEmail");

    if (dni) document.getElementById("dniModificarEmpleado").value = dni;
    if (email) document.getElementById("emailModificarEmpleado").value = email;

    if (dni || email) {
      busquedaCliente(new Event('submit'),'dniModificarEmpleado','emailModificarEmpleado','formBusquedaCliente','tablaReservasVigentes','modificar');
    }
    if (dni) document.getElementById("dniCancelarEmpleado").value = dni;
    if (email) document.getElementById("emailCancelarEmpleado").value = email;

    if (dni || email) {
      busquedaCliente(new Event('submit'),'dniCancelarEmpleado','emailCancelarEmpleado','formBusquedaClienteCancelar','tablaReservasVigentesCancelar','cancelar');
    }
  });
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
      aplicarSoloLetras();
      aplicarSoloNumeros();
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
if (window.location.pathname.includes("reservas.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    crearCalendarioEmbed("fechaReserva", "calendarioReservas");
  });
}

let locales = [];

/*Obtiene los datos de las sucursales*/
function mostrarTodasSucursales() {
  fetch('obtener_locales.php')
    .then(response => response.text())
    .then(text => {
      locales = parsearLocales(text); /*Convierte la respuesta en un array de objetos*/
      /*Con cargarDropdown rellena los dropdown con la informacion de todos los locales*/
      cargarDropdown("selectorSucursales", false); // Header general
      cargarDropdown("dropdownReservas", true);    // Cliente - reservas
      cargarDropdown("dropdownReservasEmpleado", true); // Empleado - reservas
      cargarDropdown("localCancelacionMasiva",true);
      /*Funciones adicionales*/
      crearAcordeones(locales);                    // Nosotros
      mostrarSucursalEmpleado();
      /*Restaura el valor seleccionado previamente en el header*/
      aplicarSucursalGuardada(["selectorSucursales", "dropdownReservas", "dropdownReservasEmpleado"]);
    })
    .catch(error => console.error("Error:", error));
}

/* Convierte texto plano (id_local=1;nombre=Centro;direccion=X) 
en array de objetos de sucursales()
[
  { id_local: "1", nombre: "Centro", direccion: "X" },
  ...
]*/
function parsearLocales(texto) {
  return texto.trim().split("\n").map(linea => {
    const campos = linea.split(";");
    const obj = {};
    campos.forEach(campo => {
      const [clave, valor] = campo.split("=");
      if (clave && valor) obj[clave] = valor;
    });
    return obj;
  });
}

/*Carga cualquier select con el id como parametro, opcionalmente incluye dirección segun true o false*/
/*Recorre el array locales para llenar el dropdown con opciones dinámicamente*/
function cargarDropdown(idElemento, incluirDireccion = false) {
  const dropdown = document.getElementById(idElemento);
  if (!dropdown) return;

  // Limpia opciones salvo la primera
  dropdown.length = 1;

  locales.forEach(local => {
    const option = document.createElement("option");
    option.value = local.id_local; // ✅ Usa ID real
    option.textContent = incluirDireccion ? `${local.nombre} - ${local.direccion}` : local.nombre;
    dropdown.appendChild(option);
  });
}

/*Si hay una sucursal guardada en sessionStorage (header), se la aplica como valor al id que tiene como parametro*/
function aplicarSucursalGuardada(ids) {
  const valorGuardado = sessionStorage.getItem("sucursalSeleccionada");
  if (!valorGuardado) return;

  ids.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.value = valorGuardado;
  });
}

/*Guarda selección y sincroniza los dropdowns*/
function guardarSeleccionSucursal(valor) {
  sessionStorage.setItem("sucursalSeleccionada", valor);
  cargarMenuEstatico(); //para actualizar los elementos de menu

  /*Actualiza visualmente los dropdowns secundarios con la selección guardada.*/
  aplicarSucursalGuardada(["dropdownReservas", "dropdownReservasEmpleado"]);
}

/*Muestra nombre de sucursal asignada al empleado para mostrarla en mi perfil datos personales*/
function mostrarSucursalEmpleado() {
  const idLocalEmpleado = sessionStorage.getItem("idLocalEmpleado");
  if (!idLocalEmpleado || locales.length === 0) return;

  const sucursal = locales.find(local => local.id_local === idLocalEmpleado);
  const nombreSucursal = sucursal?.nombre || "Sucursal desconocida";

  const inputSucursal = document.getElementById("sucursalEmpleadoText");
  if (inputSucursal) inputSucursal.value = nombreSucursal;
}

/*Listener al selector de sucursal del header. Se ejecuta automáticamente cuando la página carga*/
/*Si el usuario cambia la sucursal en el header, guarda ese valor y actualiza las categorías mostradas*/
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("selectorSucursales");
  const valorGuardado = sessionStorage.getItem("sucursalSeleccionada");

  if (selector) {
    if (valorGuardado) selector.value = valorGuardado;

    selector.addEventListener("change", () => {
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

// Ejecutar al cargar
window.addEventListener("DOMContentLoaded", mostrarTodasSucursales);

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
/*Calendario externo Flatpickr visible*/
function crearCalendarioEmbed(idInput, idContenedor, callbackOnChange = null) {
  const input = document.getElementById(idInput);
  const contenedor = document.getElementById(idContenedor);

  flatpickr(contenedor, {
    inline: true,
    dateFormat: "Y-m-d",
    locale: "es",
    minDate: "today",
    disable: [date => date.getDay() === 1],
    defaultDate: sessionStorage.getItem(idInput) || null,
    onChange: function (selectedDates, dateStr) {
      input.value = dateStr;
      sessionStorage.setItem(idInput, dateStr);
      if (typeof callbackOnChange === "function") {
        callbackOnChange(dateStr);
      }
      input.dispatchEvent(new Event("change"));
    }
  });
}
/*Calendario externo Flatpickr para inputs no visible sin clic*/
function crearCalendarioPopup(idInput) {
  const input = document.getElementById(idInput);

  if (!input) return;

  flatpickr(input, {
    dateFormat: "Y-m-d",
    locale: "es",
    minDate: "today",
    disable: [
      function (date) {
        return date.getDay() === 1; // desactiva los lunes
      }
    ],
    defaultDate: sessionStorage.getItem(idInput) || null,
    onChange: function (selectedDates, dateStr) {
      input.value = dateStr;
      sessionStorage.setItem(idInput, dateStr);
    }
  });

  input.readOnly = true; // importante para prevenir escritura manual
}
/*Funcion para que un select de horarios tenga restricciones*/
/*Solo muestra horarios disponibles en la fecha seleccionada y a partir de la hora actual*/

function generarOpcionesHorarioDisponibles(fechaSeleccionada, selectId) {
  const horarios = [
    "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00",
    "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00"
  ];

  const select = document.getElementById(selectId);
  if (!select || !fechaSeleccionada) return;

  fechaSeleccionada = fechaSeleccionada.trim();
  const ahora = new Date();
  const hoyStr = ahora.toISOString().split("T")[0];
  const esHoy = fechaSeleccionada === hoyStr;

  let opciones = "";

  if (esHoy) {
    const horaActual = ahora.getHours();
    const minutosActuales = ahora.getMinutes();

    const horariosFiltrados = horarios.filter(h => {
      const [hora, minutos] = h.split(":").map(Number);
      const incluir = (hora > horaActual || (hora === horaActual && minutos > minutosActuales));
      console.log(`Evaluando horario ${h} => incluir: ${incluir}`);
      return incluir;
    });

    if (horariosFiltrados.length === 0) {
      opciones = `<option value="">No hay horarios disponibles</option>`;
    } else {
      opciones = `<option value="">Seleccione hora</option>` +
        horariosFiltrados.map(h => `<option value="${h}">${h.slice(0, 5)}</option>`).join("");
    }
  } else {
    opciones = `<option value="">Seleccione hora</option>` +
      horarios.map(h => `<option value="${h}">${h.slice(0, 5)}</option>`).join("");
  }

  select.innerHTML = opciones;
}
function obtenerMesasDisponibles(idSelect, idLocal, fecha, hora, personas, valorDefault = null, descripcionMesaDefault = "") {
  const select = document.getElementById(idSelect);

  if (!select || !idLocal || !fecha || !hora || !personas) {
    console.warn("Faltan datos obligatorios para obtener mesas.");
    if (select) {
      select.innerHTML = "<option value=''>Complete todos los datos</option>";
      select.disabled = true;
    }
    return;
  }

  select.innerHTML = "<option value=''>Cargando mesas...</option>";
  select.disabled = true;

  const url = `obtener_mesas_disponibles.php?id_local=${idLocal}&fecha=${fecha}&hora=${hora}&personas=${personas}`;

  fetch(url)
    .then(res => res.text())
    .then(opciones => {
      select.innerHTML = opciones;

      const tieneOpcionesValidas = [...select.options].some(opt => opt.value !== "");

      if (tieneOpcionesValidas) {
        let opcionDefault = [...select.options].find(opt => opt.value == valorDefault);

        if (!opcionDefault && valorDefault !== null) {
          // Agrego la mesa actual con su descripción
          const opcion = document.createElement("option");
          opcion.value = valorDefault;
          opcion.text = descripcionMesaDefault || `Mesa actual (ID ${valorDefault})`;
          opcion.selected = true;
          select.appendChild(opcion);
          select.disabled = false;
          console.log("Valor default agregado manualmente con descripción.");
        } else if (opcionDefault) {
          select.value = valorDefault;
          select.disabled = false;
          console.log(`Valor default aplicado: ${valorDefault}`);
        } else {
          select.disabled = false;
        }
      } else {
        if (valorDefault !== null) {
          const opcion = document.createElement("option");
          opcion.value = valorDefault;
          opcion.text = descripcionMesaDefault || `Mesa actual (ID ${valorDefault})`;
          opcion.selected = true;
          select.innerHTML = "";
          select.appendChild(opcion);
          select.disabled = false;
        } else {
          select.innerHTML = "<option value=''>No hay mesas disponibles</option>";
          select.disabled = true;
        }
      }
    })
    .catch(err => {
      console.error(err);
      select.innerHTML = "<option value=''>Error al cargar mesas</option>";
      select.disabled = true;
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
function aplicarSoloNumeros() {
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
}
if (window.location.pathname.includes("Ingresar.html")) {
  aplicarSoloLetras();
  aplicarSoloNumeros();
}
/*Para validad el input date de la fecha de nacimiento en la parte de registrarse cliente*/
function aplicarRestriccionFechaNacimiento(selector) {
  const fechaInput = document.querySelector(selector);
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
}
/*Se aplica la funcion de restriccion de fecha de nacimiento a los siguientes inputs*/
document.addEventListener('DOMContentLoaded', () => {
  aplicarRestriccionFechaNacimiento('#fecha-nacimiento-usuario-registro');  //Ingresar.html registrarse
  aplicarRestriccionFechaNacimiento('#fecha_nacimientoClienteInput'); //miPerfil.html datos personales cliente
  aplicarRestriccionFechaNacimiento('#fecha-nacimiento-registrar-cliente'); //Reservas empleado
});
/* Validar formato de email ejemplo@ejemplo.ejemplo*/
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return re.test(email);
}
/*Validar que no exista un dni con el mismo mail */
function validarDniMail(dni, mail, tipo, retornarId = false) {
  return new Promise((resolve, reject) => {
    if (!dni || !mail) {
      resolve("error");
      return;
    }

    if (dni.length < 7 || dni.length > 11) {
      alert("El DNI debe contener solo números entre 7 y 11 dígitos.");
      return;
    }

    if (dni.value <= 5000000) {
      alert("El DNI debe superar los 5 millones.");
      return;
    }

    if (!validateEmail(mail)) {
      alert('El email es inválido. Por favor ingresa un email válido.');
      return false;
    }

    const formData = new FormData();
    formData.append("dni", dni);
    formData.append("mail", mail);
    formData.append("tipo", tipo);

    if (retornarId) {
      formData.append("retornar_id", "true");
    }

    fetch("validar_dni_mail.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(resultado => resolve(resultado.trim()))
      .catch(error => {
        console.error("Error al verificar dni/mail:", error);
        resolve("error");
      });
  });
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
function submitRegistrar(event, sufijo) {
  event.preventDefault();

  const nombre = document.getElementById(`nombre-${sufijo}`).value.trim();
  const apellido = document.getElementById(`apellido-${sufijo}`).value.trim();
  const dni = document.getElementById(`dni-${sufijo}`).value.trim();
  const fechaNacimiento = document.getElementById(`fecha-nacimiento-${sufijo}`).value.trim();
  const telefono = document.getElementById(`telefono-${sufijo}`).value.trim();
  const email = document.getElementById(`email-${sufijo}`).value.trim();
  const contrasenia = document.getElementById(`contrasenia-${sufijo}`).value.trim();
  const form = document.getElementById('form-registro');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const soloNumeros = telefono.replace(/\D/g, '');
  if (soloNumeros.length < 10) {
    alert("El número de teléfono debe tener al menos 10 dígitos válidos.");
    document.getElementById(`telefono-${sufijo}`).focus();
    return;
  }

  validarDniMail(dni, email, "cliente").then(resultado => {
    if (resultado === "existe") {
      alert("Ya existe un cliente con ese correo y DNI.");
      return; // corta solo el `then`, pero no se ejecuta el resto de este bloque
    }

    if (resultado === "error") {
      alert("Error al verificar DNI y correo.");
      return;
    }

    // Solo llega acá si no existe el cliente
    const formData = new FormData();
    formData.append("accion", "registro");
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("dni", dni);
    formData.append("fecha_nacimiento", fechaNacimiento);
    formData.append("telefono", telefono);
    formData.append("email", email);
    formData.append("contrasenia", contrasenia);

    fetch("registro_inicio_sesion.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if (data.includes("✅")) {
          alert("¡Registro exitoso!");
          window.location.reload();
        } else if (data.includes("❌") || data.includes("❗")) {
          alert(data);
        } else {
          alert("⚠️ Respuesta inesperada del servidor:\n" + data);
        }
      })
      .catch(error => {
        console.error("Error en registro:", error);
        alert("Hubo un problema al registrarse.");
      });
  });
}

/*Funcion que se ejecuta al enviar el formulario en el boton iniciar sesion cliente*/
function submitAccederCliente(event) {
  event.preventDefault(); // Evita que se envíe el formulario por ahora

  const email = document.getElementById('email-usuario-login').value.trim(); //tomamos los valores del form
  const dni = document.getElementById('dni-usuario-login').value.trim();
  const contrasenia = document.getElementById('contrasenia-usuario-login').value.trim();

  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    document.getElementById('email-usuario-login').focus();
    return false;
  }

  if (!email || !dni || !contrasenia) { //verificamos que existan todos los campos
    alert("Por favor, completá todos los campos.");
    return false;
  }

  const formData = new FormData(); //creamos un objeto FormData para empaquetar los datos como si fuera un formulario
  formData.append("accion", "login"); //indicamos que tipo de accion es y le pasamos los datos del form
  formData.append("email", email);
  formData.append("dni", dni);
  formData.append("contrasenia", contrasenia);

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
  const contrasenia = document.getElementById('contrasenia-empleado-login').value.trim();

  /*Si el formato es invalido aparece este cartel*/
  if (!validateEmail(email)) {
    alert('El email es inválido. Por favor ingresa un email válido.');
    document.getElementById('email-empleado-login').focus();
    return false;
  }

  if (!email || !dni || !contrasenia) { //verificamos que existan todos los campos
    alert("Por favor, completá todos los campos.");
    return false;
  }


  const formData = new FormData();// Creamos el objeto FormData para enviar los datos al servidor
  formData.append("accion", "login_empleado"); // Distinguimos que es un login de empleado
  formData.append("email", email);
  formData.append("dni", dni);
  formData.append("contrasenia", contrasenia);

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
  event.preventDefault();

  const email = document.getElementById('email-recuperar-contrasenia').value.trim();
  const dni = document.getElementById('dni-recuperar-contrasenia').value.trim();
  const cuentaCliente = document.getElementById("cuenta-cliente").checked;
  const cuentaEmpleado = document.getElementById("cuenta-empleado").checked;
  sessionStorage.setItem("cuentaClient", cuentaCliente);
  sessionStorage.setItem("cuentaEmpleado", cuentaEmpleado);

  const tipo = cuentaCliente ? "cliente" : "empleado";

  validarDniMail(dni, email, tipo)
    .then(resultado => {
      try {
        const json = JSON.parse(resultado);

        if (json.estado === "existe") {
          document.getElementById("datos-enviar-mail").style.display = "none";
          document.getElementById("email-confirmado").textContent = email;
          document.getElementById("confirmacion-envio-mail").style.display = "grid";
        } else {
          alert("❌ No se encontró ninguna cuenta con ese email y DNI.");
        }
      } catch (e) {
        if (resultado === "no_existe") {
          alert("❌ No se encontró ninguna cuenta con ese email y DNI.");
        } else {
          alert("⚠️ Respuesta inesperada del servidor: " + resultado);
          console.error("Respuesta inesperada:", resultado);
        }
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
  if (sessionStorage.getItem("usuarioTipo") === "cliente") {
    sessionStorage.removeItem("idCliente");
    sessionStorage.removeItem("apellidoCliente");
    sessionStorage.removeItem("contrasenaCliente");
    sessionStorage.removeItem("dniCliente");
    sessionStorage.removeItem("emailCliente");
    sessionStorage.removeItem("fecha_nacimientoCliente");
    sessionStorage.removeItem("nombreCliente");
    sessionStorage.removeItem("puntosCliente");
    sessionStorage.removeItem("reservas");
    sessionStorage.removeItem("telefonoCliente");
  } else {
    sessionStorage.removeItem("idEmpleado");
    sessionStorage.removeItem("apellidoEmpleado");
    sessionStorage.removeItem("contrasenaEmpleado");
    sessionStorage.removeItem("dniEmpleado");
    sessionStorage.removeItem("emailEmpleado");
    sessionStorage.removeItem("empleado_funcion");
    sessionStorage.removeItem("idLocalEmpleado");
    sessionStorage.removeItem("nombreEmpleado");
    sessionStorage.removeItem("reservas");
    sessionStorage.removeItem("puestoEmpleado");
  }
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
function mostrarContenidoMisReservasE(seccion) {// Se ocultan todas las secciones
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
  const botones = document.querySelectorAll('.btn-editar');

  botones.forEach((btn) => {
    const inputId = btn.dataset.target;
    const input = document.getElementById(inputId);
    const claveSession = inputId.replace('Input', '');
    const valorGuardado = sessionStorage.getItem(claveSession);

    if (valorGuardado) {
      input.value = valorGuardado;
      if (inputId === 'contrasenaEmpleadoInput' || inputId === 'contrasenaClienteInput') {
        input.type = 'text';
      }
    }

    btn.addEventListener('click', () => {
      if (btn.textContent === 'Editar') {
        input.disabled = false;
        input.focus();
        btn.textContent = 'Confirmar';
      } else {
        const nuevoValor = input.value.trim();

        /* Validación estándar del navegador para que tome las restricciones puestas en los input*/
        if (!input.checkValidity()) {
          input.reportValidity();
          return;
        }

        /* Validación especial para teléfono*/
        if (inputId.includes('telefono')) {
          const soloNumeros = nuevoValor.replace(/\D/g, ''); // Quita todo excepto dígitos
          if (soloNumeros.length < 10) {
            alert("El número debe tener al menos 10 dígitos válidos.");
            input.focus();
            return;
          }
        }

        /* Validación especial para mail*/
        if (inputId.toLowerCase().includes('email')) {
          if (!validateEmail(nuevoValor)) {
            alert("El correo electrónico no es válido. Por favor ingresa un email correcto.");
            input.focus();
            return; // no sigue, queda en modo edición
          }
        }

        if (nuevoValor) {
          sessionStorage.setItem(claveSession, nuevoValor);
          input.disabled = true;
          btn.textContent = 'Editar';

          const idEmpleado = sessionStorage.getItem('idEmpleado');
          const idCliente = sessionStorage.getItem('idCliente');

          if (idEmpleado && idCliente == "null") {
            fetch('actualizar_empleado.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                campo: claveSession,
                valor: nuevoValor,
                id_empleado: idEmpleado
              })
            })
              .then(response => response.text())
              .then(respuesta => {
                console.log('Respuesta del servidor:', respuesta);
                if (respuesta.includes('duplicado')) {
                  alert("❌ Ya existe un usuario registrado con este correo.");
                  input.disabled = false;
                  input.focus();
                  btn.textContent = 'Confirmar';
                  return;
                } else {
                  alert("✅ Actualización realizada con éxito.");
                }
              })
              .catch(error => {
                console.error('Error al actualizar en la base de datos:', error);
                alert("❌ Error al actualizar los datos. Intente nuevamente.");
              });
          }

          if (idCliente && idEmpleado == "null") {
            fetch('actualizar_cliente.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                campo: claveSession,
                valor: nuevoValor,
                id_cliente: idCliente
              })
            })
              .then(response => response.text())
              .then(respuesta => {
                console.log('Respuesta del servidor:', respuesta);
                if (respuesta.includes('duplicado')) {
                  alert("❌ El correo electrónico ya está en uso. Elija otro.");
                  input.disabled = false;
                  input.focus();
                  btn.textContent = 'Confirmar';
                  return;
                } else {
                  alert("✅ Actualización realizada con éxito.");
                }

              })
              .catch(error => {
                console.error('Error al actualizar en la base de datos:', error);
                alert("❌ Error al actualizar los datos. Intente nuevamente.");
              });
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
/*Modificar reservas empleado*/
function busquedaCliente(evento, inputDniId, inputEmailId, formId, idTabla, uso) {
  if (evento) evento.preventDefault();

  const form = evento?.target?.closest("form") || document.getElementById(formId);
  if (!form) {
    console.error(`No se encontró el formulario con id '${formId}'`);
    return;
  }

  const dni = document.getElementById(inputDniId)?.value?.trim();
  const email = document.getElementById(inputEmailId)?.value?.trim();

  if (!dni || !email) {
    alert("Por favor completá el DNI y el correo.");
    return;
  }

  aplicarSoloNumeros();

  validarDniMail(dni, email, "cliente", true).then(resultado => {
    try {
      const json = JSON.parse(resultado);

      if (json.estado === "existe") {
        const idCliente = json.id;

        sessionStorage.setItem("idClienteTemporal", idCliente);
        sessionStorage.setItem("busquedaDNI", dni);
        sessionStorage.setItem("busquedaEmail", email);
        obtenerReservasYGuardarSesion(idCliente)
          .then(reservas => {
            if (uso === "modificar") {
              mostrarReservasEnTablaEmpleado(reservas, idTabla, "modificar");
            } else if (uso === "cancelar") {
              mostrarReservasEnTablaEmpleado(reservas, idTabla, "cancelar");
            } else {
              console.warn("Uso no reconocido:", uso);
            }
          })
          .catch(err => {
            console.error("Error al obtener reservas:", err);
            alert("No se pudieron obtener las reservas.");
            limpiarTabla(idTabla, formId);
          });

      } else {
        alert("No existe un cliente con ese correo y DNI.");
        limpiarTabla(idTabla, formId);
      }
    } catch (e) {
      console.error("Error al parsear respuesta de validación:", resultado);
      alert("⚠️ Respuesta inesperada del servidor.");
      limpiarTabla(idTabla, formId);
    }
  });
}

function limpiarTabla(idTabla, idFormulario) {
  // Limpiar inputs y tabla
  const form = document.getElementById(idFormulario);
  if (form) form.reset();

  // Limpiar la tabla
  const tabla = document.getElementById(idTabla);
  if (tabla) tabla.querySelector("tbody").innerHTML = "";

  // Limpiar sessionStorage de búsqueda
  sessionStorage.removeItem("busquedaDNI");
  sessionStorage.removeItem("busquedaEmail");
  sessionStorage.removeItem("reservasMostradas");
}

/*TIENDA DE PUNTOS*/
if (window.location.pathname.includes("tiendaDePuntos.html") || window.location.pathname.includes("miPerfil.html")) {
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
    }
  });
}
if (window.location.pathname.includes("tiendaDePuntos.html") || window.location.pathname.includes("miPerfil.html")) {
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
    }
  });
}
/*RESERVAS*/
/*Inhabilita el boton mesaReserva hasta que se selecicone fecha,hora y cantPersonas.Guarda estos datos en el sessionStorage*/
if (window.location.pathname.includes("reservas.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const usuarioTipo = sessionStorage.getItem("usuarioTipo");

    if (usuarioTipo === "cliente") {
      const fechaInput = document.getElementById("fechaReserva");
      const horaSelect = document.getElementById("horaReserva");
      const personasSelect = document.getElementById("cantPersonasReserva");
      const mesaSelect = document.getElementById("mesaReserva");

      crearCalendarioEmbed("fechaReserva", "calendarioReservas");

      fechaInput.addEventListener("change", function () {
        const dateStr = this.value;
        sessionStorage.setItem("fechaReserva", dateStr);
        generarOpcionesHorarioDisponibles(dateStr, "horaReserva");
        limpiarYValidarMesa();
      });

      horaSelect.addEventListener("change", function () {
        sessionStorage.setItem("horaReserva", this.value);
        limpiarYValidarMesa();
      });

      personasSelect.addEventListener("change", function () {
        sessionStorage.setItem("cantPersonasReserva", this.value);
        limpiarYValidarMesa();
      });

      function limpiarYValidarMesa() {
        mesaSelect.innerHTML = "<option value=''>Seleccione la mesa</option>";
        validarHabilitarMesa();
      }

      function validarHabilitarMesa() {
        const idLocal = sessionStorage.getItem("sucursalValor");
        const fecha = sessionStorage.getItem("fechaReserva");
        const hora = horaSelect.value;
        const personas = personasSelect.value;

        if (idLocal && fecha && hora && personas) {
          obtenerMesasDisponibles("mesaReserva", idLocal, fecha, hora, personas);
          mesaSelect.disabled = false;
        } else {
          mesaSelect.disabled = true;
          mesaSelect.innerHTML = "<option value=''>Seleccione primero fecha, hora y cantidad</option>";
        }
      }

      limpiarYValidarMesa(); // <<-- llamado inicial

    } else if (usuarioTipo === "empleado") {
      const dropdownSucursal = document.getElementById("dropdownReservasEmpleado");
      const fechaInput = document.getElementById("fechaReservaEmpleado");
      const horaSelect = document.getElementById("horaReservaEmpleado");
      const personasSelect = document.getElementById("cantPersonasReservaEmpleado");
      const mesaSelect = document.getElementById("mesaReservaEmpleado");

      crearCalendarioPopup("fechaReservaEmpleado");

      dropdownSucursal?.addEventListener("change", limpiarYValidarMesa);

      fechaInput.addEventListener("change", function () {
        const dateStr = this.value;
        sessionStorage.setItem("fechaReservaEmpleado", dateStr);
        generarOpcionesHorarioDisponibles(dateStr, "horaReservaEmpleado");
        limpiarYValidarMesa();
      });

      horaSelect.addEventListener("change", function () {
        sessionStorage.setItem("horaReservaEmpleado", this.value);
        limpiarYValidarMesa();
      });

      personasSelect.addEventListener("change", function () {
        sessionStorage.setItem("cantPersonasReservaEmpleado", this.value);
        limpiarYValidarMesa();
      });
      function limpiarYValidarMesa() {
        mesaSelect.innerHTML = "<option value=''>Seleccione la mesa</option>";
        validarHabilitarMesa();
      }

      function validarHabilitarMesa() {
        const idLocal = dropdownSucursal ? dropdownSucursal.value : null;
        const fecha = sessionStorage.getItem("fechaReservaEmpleado");
        const hora = horaSelect.value;
        const personas = personasSelect.value;

        if (idLocal && fecha && hora && personas) {
          obtenerMesasDisponibles(
            "mesaReservaEmpleado",
            idLocal,
            fecha,
            hora,
            personas
          );
          mesaSelect.disabled = false;
        } else {
          mesaSelect.disabled = true;
          mesaSelect.innerHTML =
            "<option value=''>Seleccione primero fecha, hora y cantidad</option>";
        }
      }

      //  Llamada inicial con un pequeño delay para asegurar que el dropdown ya tenga su valor por defecto renderizado.
      setTimeout(() => {
        limpiarYValidarMesa();
      }, 50);
    }
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
        limpiarSessionStorage();
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
/*RESERVAS EMPLEADO*/
/*Al cargar la pagina, inhabilita la columna de datos reserva*/
window.addEventListener("DOMContentLoaded", () => {
  const reservaSection = document.querySelector(".completar-datos-reserva");

  if (reservaSection) {
    reservaSection.classList.add("disabled");

    reservaSection.querySelectorAll("input, select, textarea, button").forEach(el => {
      el.disabled = true;
    });
  }
});
/*Los botones raddioButton de reservas x empleado cambian el contenido de los datos que se deben completar de cliente segun el seleccionado*/
function cambioTipoCliente() {
  const noRegistrado = document.getElementById('cliente-no-registrado');
  const divRegistrar = document.getElementById('registrarCliente');
  const divIngresar = document.getElementById('IngresarCliente');

  if (noRegistrado.checked) {
    divRegistrar.style.display = 'grid';
    divIngresar.style.display = 'none';

    // Activar inputs de registrarCliente
    divRegistrar.querySelectorAll('input, select, textarea').forEach(input => {
      input.disabled = false;
    });

    // Desactivar inputs de IngresarCliente
    divIngresar.querySelectorAll('input, select, textarea').forEach(input => {
      input.disabled = true;
    });

  } else {
    divRegistrar.style.display = 'none';
    divIngresar.style.display = 'grid';

    // Desactivar inputs de registrarCliente
    divRegistrar.querySelectorAll('input, select, textarea').forEach(input => {
      input.disabled = true;
    });

    // Activar inputs de IngresarCliente
    divIngresar.querySelectorAll('input, select, textarea').forEach(input => {
      input.disabled = false;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnVerificar = document.getElementById("btn-verificar-cliente");
  if (!btnVerificar) return;

  btnVerificar.addEventListener("click", () => {
    const email = document.getElementById("email-cliente-registrado").value.trim();
    const dni = document.getElementById("dni-cliente-registrado").value.trim();

    if (!email || !dni) {
      alert("Por favor completá el correo y el DNI.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("El correo electrónico no tiene un formato válido.");
      return;
    }

    if (dni.length < 7 || dni.length > 11 || !/^\d+$/.test(dni)) {
      alert("El DNI debe tener entre 7 y 11 dígitos numéricos.");
      return;
    }

    validarDniMail(dni, email, "cliente", true)
      .then(resultado => {
        try {
          const json = JSON.parse(resultado);

          if (json.estado === "existe") {
            alert("✅ El usuario se encuentra registrado.");

            sessionStorage.setItem("idClienteReservaEnCurso", json.id);

            const reservaSection = document.querySelector(".completar-datos-reserva");
            if (reservaSection) {
              reservaSection.classList.remove("disabled");

              reservaSection.querySelectorAll("input, select, textarea, button").forEach(el => {
                el.disabled = false;
              });
            }

          } else {
            alert("❌ No se encontró un usuario con ese correo y DNI.");
          }
        } catch (e) {
          if (resultado === "no_existe") {
            alert("❌ No se encontró un usuario con ese correo y DNI.");
          } else {
            alert("⚠️ Respuesta inesperada del servidor: " + resultado);
            console.error("Respuesta inesperada:", resultado);
          }
        }
      })
      .catch(error => {
        console.error("Error al verificar usuario:", error);
        alert("❌ Hubo un problema al verificar el usuario.");
      });
  });
});

function enviarReservaEmpleado() {
  const id_cliente = sessionStorage.getItem("idClienteReservaEnCurso");
  const id_local = document.getElementById("dropdownReservasEmpleado").value;
  const fecha = sessionStorage.getItem("fechaReservaEmpleado");
  const hora = sessionStorage.getItem("horaReservaEmpleado");
  const cantidad = sessionStorage.getItem("cantPersonasReservaEmpleado");
  const mesa = document.getElementById("mesaReservaEmpleado").value;
  const observaciones = document.getElementById("observacionesReservaEmpleado")?.value ?? "";

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
        limpiarSessionStorage();
        window.location.href = "reservas.html";
      } else {
        alert("❌ Error: " + data);
      }
    })
    .catch(error => {
      console.error("Error al enviar la reserva:", error);
      alert("❌ Error al procesar la reserva. Intente nuevamente.");
    });
}

function limpiarSessionStorage() {
  if (sessionStorage.getItem("usuarioTipo").value === "cliente") {
    sessionStorage.removeItem("fecha");
    sessionStorage.removeItem("sucursalValor");
    sessionStorage.removeItem("hora");
    sessionStorage.removeItem("cantidad");
    sessionStorage.removeItem("mesa");
    sessionStorage.removeItem("observaciones");
    sessionStorage.removeItem("ObservacionDada");
    sessionStorage.removeItem("cantPersonasReserva");
    sessionStorage.removeItem("fechaReserva");
    sessionStorage.removeItem("fechaSeleccionada");
    sessionStorage.removeItem("mesaSeleccionada");
    sessionStorage.removeItem("horaReserva");
    sessionStorage.removeItem("horaSeleccionada");
    sessionStorage.removeItem("sucursalSeleccionada");
  } else {
    sessionStorage.removeItem("idClienteReservaEnCurso");
    sessionStorage.removeItem("dropdownReservasEmpleado");
    sessionStorage.removeItem("fechaReservaEmpleado");
    sessionStorage.removeItem("horaReservaEmpleado");
    sessionStorage.removeItem("cantPersonasReservaEmpleado");
    sessionStorage.removeItem("mesaReservaEmpleado");
    sessionStorage.removeItem("observacionesReservaEmpleado");
    sessionStorage.removeItem("cantPersonasReserva");
    sessionStorage.removeItem("mesaSeleccionada");
    sessionStorage.removeItem("personasSeleccionadas");
  }
}
/*CANCELAR RESERVAS EMPLEADO*/
/*Si es mozo, caja o limpieza el puesto del empleado, el boton masiva no estara habilitado*/
document.addEventListener("DOMContentLoaded", () => {
  const puesto = sessionStorage.getItem("puestoEmpleado");
  const btnMasivo = document.getElementById("btnModoMasivo");

  if (puesto === "Mozo" || puesto === "Caja" || puesto === "Limpieza") {
    btnMasivo.disabled = true; // Inhabilitar para roles básicos
    btnMasivo.classList.add("btn-secondary");
    btnMasivo.classList.remove("btn-outline-danger");
    btnMasivo.title = "Solo disponible para Subgerente y Gerente";
  }
});
/*Sirve para cambiar el contenido de cancelar reservas segun el boton que se presione "individual/masiva"*/
function mostrarVistaCancelacion(tipo) {
  const vistaInd = document.getElementById("vistaCancelacionIndividual");
  const vistaMas = document.getElementById("vistaCancelacionMasiva");

  if (tipo === "individual") {
    vistaInd.style.display = "block";
    vistaMas.style.display = "none";
  } else if (tipo === "masiva") {
    vistaInd.style.display = "none";
    vistaMas.style.display = "block";
  }
}
/*Contenido de cancelacion masiva*/
document.addEventListener("DOMContentLoaded", () => {
  const puestoEmpleado = sessionStorage.getItem("puestoEmpleado");
  const id_sucursal_empleado = sessionStorage.getItem("idLocalEmpleado"); // Subgerente trabaja en esta sucursal
  const contenedorForm = document.getElementById("formCancelacionMasiva");
  const fechaSeleccionada = document.getElementById("fechaCancelacionMasiva");

  crearCalendarioPopup("fechaCancelacionMasiva");
  generarOpcionesHorarioDisponibles(fechaSeleccionada.value, "horaCancelacionMasiva")

  /*Seguridad por si falta información*/
  if (!puestoEmpleado || !id_sucursal_empleado) {
    contenedorForm?.remove(); 
    return;
  }

  if (puestoEmpleado === "Subgerente") {
    cargarDropdown("localCancelacionMasiva", true);

    setTimeout(() => {
      const sucursal = document.getElementById("localCancelacionMasiva");
      if (sucursal) {
        sucursal.value = String(id_sucursal_empleado);
        sucursal.disabled = true;
      }
    }, 150); // ⏱️ Da tiempo al DOM para agregar las opciones
  }
});
/*funcion para cancelar varias reservas por fecha y hora*/
function cancelacionMasiva() {
  const idLocal = document.getElementById("localCancelacionMasiva")?.value;
  const fecha = document.getElementById("fechaCancelacionMasiva")?.value;
  const hora = document.getElementById("horaCancelacionMasiva")?.value;
  const motivo = document.getElementById("motivoCancelacionMasiva")?.value.trim();
  const idEmpleado = sessionStorage.getItem("idEmpleado");

  if (!idLocal || !fecha || !motivo || !hora) {
    alert("Por favor completá todos los campos: local, fecha, hora y motivo.");
    return;
  }

  if (!idEmpleado) {
    alert("No se encontró el ID del empleado.");
    return;
  }

  if (!confirm(`¿Estás seguro de cancelar todas las reservas del local seleccionado para la fecha ${fecha} a la hora ${hora}?`)) {
    return;
  }

  const formData = new FormData();
  formData.append("id_local", idLocal);
  formData.append("fecha", fecha);
  formData.append("hora", hora);
  formData.append("motivo_cancelacion", motivo);
  formData.append("id_empleado", idEmpleado);

  fetch("cancelacion_masiva.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
      if (data.includes("✅")) {
        document.getElementById("formCancelacionMasiva")?.reset();
      }
    })
    .catch(error => {
      console.error("Error en la cancelación masiva:", error);
      alert("❌ Hubo un error al realizar la cancelación masiva.");
    });
}
/*MODIFICAR MENU*/
function cargarMenu() { // se ejecuta en mi perfil cuando clickean Modificar Menu
  document.getElementById("list-modificarMenu").innerHTML = "Espere..."
  const data = new FormData();
  data.append("id_local_empleado", sessionStorage.getItem("idLocalEmpleado"));
  data.append("puesto_empleado", sessionStorage.getItem("puestoEmpleado"));
  fetch("obtener_menu.php", { method: "POST", body: data }) // solicita ese archivo, que carga el HTML del menú
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
      data.append("submit", "1"); // añadimos el campo "submit", para que el back sepa que hacer (agregar)
      data.append("id_local_empleado", sessionStorage.getItem("idLocalEmpleado"));
      data.append("puesto_empleado", sessionStorage.getItem("puestoEmpleado"));
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
      data.append("id_local_empleado", sessionStorage.getItem("idLocalEmpleado"));
      data.append("puesto_empleado", sessionStorage.getItem("puestoEmpleado"));
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

    const usuarioTipo = sessionStorage.getItem("usuarioTipo");

    if (usuarioTipo === "cliente"){
      sessionStorage.setItem('puntosCliente', puntosCliente.toString());
    }
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
    const fechaHora = new Date(reserva.fecha_reserva);
    const estado = reserva.estado_reserva;
    const esCancelada = estado === "cancelada" || estado === "realizada/concretada" || estado === "realizada/anulada";
    const esFutura = fechaHora >= hoy && !esCancelada;

    const detalleReservaString = JSON.stringify(reserva).replace(/"/g, '&quot;');

    if (esFutura) {
      // Mostrar en tabla de futuras
      tbodyFuturas.innerHTML += `
        <tr>
          <td>${reserva.fecha_reserva.split(' ')[0]}</td>
          <td>${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</td>
          <td>${reserva.nombre_local}</td>
          <td>${reserva.descripcion_mesa || reserva.id_mesa}</td>
          <td>${reserva.cant_personas}</td>
          <td>${reserva.observaciones || "-"}</td>
          <td>${reserva.estado_reserva}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="abrirModalModificarReserva(${detalleReservaString}, this)">Modificar</button>
            <button class="btn btn-danger btn-sm" onclick="cancelarReserva(${reserva.id},this)">Cancelar</button>
          </td>
        </tr>
      `;
    } else {
      // Mostrar en tabla de historial
      tbodyPasadas.innerHTML += `
        <tr>
          <td>${reserva.fecha_reserva.split(' ')[0]}</td>
          <td>${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</td>
          <td>${reserva.nombre_local}</td>
          <td>${reserva.descripcion_mesa || reserva.id_mesa}</td>
          <td>${reserva.cant_personas}</td>
          <td>${reserva.observaciones || "-"}</td>
          <td>${reserva.estado_reserva}</td>
          <td>
            <button class="btn btn-info btn-sm" onclick="verDetalleReserva(${detalleReservaString},this)">Ver detalle</button>
          </td>
        </tr>
      `;
    }
  });
}
function mostrarReservasEnTablaEmpleado(reservas, idTabla, modo) {
  const tabla = document.getElementById(idTabla);

  if (!tabla) {
    console.error(`No se encontró la tabla con id "${idTabla}"`);
    return;
  }

  const tbody = tabla.querySelector("tbody");
  tbody.innerHTML = ""; // limpiar contenido previo

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // comparar solo fechas
  let reservasMostradas = 0;

  reservas.forEach(reserva => {
    const fechaHora = new Date(reserva.fecha_reserva);
    const estado = reserva.estado_reserva;
    const esCancelada = estado === "cancelada" || estado === "realizada/concretada" || estado === "realizada/anulada";
    const estaVigente = fechaHora >= hoy && !esCancelada;

    if (estaVigente) {
      reservasMostradas++;
      const detalleReservaString = JSON.stringify(reserva).replace(/"/g, '&quot;');

      if (modo === "modificar") {
        tbody.innerHTML += `
        <tr>
          <td>${reserva.fecha_reserva.split(' ')[0]}</td>
          <td>${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</td>
          <td>${reserva.nombre_local}</td>
          <td>${reserva.descripcion_mesa || reserva.id_mesa}</td>
          <td>${reserva.cant_personas}</td>
          <td>${reserva.observaciones || "-"}</td>
          <td>${reserva.estado_reserva}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="abrirModalModificarReserva(${detalleReservaString}, this)">Modificar</button>
            <button class="btn btn-info btn-sm" onclick="verDetalleReserva(${detalleReservaString}, this)">Ver detalle</button>
          </td>
        </tr>
      `;
      } else if (modo === "cancelar") {
        tbody.innerHTML += `
          <tr>
            <td>${reserva.fecha_reserva.split(' ')[0]}</td>
            <td>${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</td>
            <td>${reserva.nombre_local}</td>
            <td>${reserva.descripcion_mesa || reserva.id_mesa}</td>
            <td>${reserva.cant_personas}</td>
            <td>${reserva.observaciones || "-"}</td>
            <td>${reserva.estado_reserva}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="cancelarReserva(${reserva.id},this)">Cancelar</button>
              <button class="btn btn-info btn-sm" onclick="verDetalleReserva(${detalleReservaString}, this)">Ver detalle</button>
            </td>
          </tr>
        `;
      }
    }
  });
  // Si no se encuentran reservas vigentes, se muestra este mensaje
  if (reservasMostradas === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted">No hay reservas vigentes.</td>
      </tr>
    `;
  }
}
function verDetalleReserva(reserva, botonOrigen) {
  const modalElement = document.getElementById("modalDetalleReserva");
  const modalBody = document.getElementById("contenidoModalDetalle");

  const detalleHTML = `
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>📅 Fecha:</strong> ${reserva.fecha_reserva.split(' ')[0]}</li>
      <li class="list-group-item"><strong>⏰ Hora:</strong> ${reserva.fecha_reserva.split(' ')[1].slice(0, 5)}</li>
      <li class="list-group-item"><strong>📍 Local:</strong> ${reserva.nombre_local}</li>
      <li class="list-group-item"><strong>🪑 Mesa:</strong> ${reserva.descripcion_mesa || "-"}</li>
      <li class="list-group-item"><strong>👥 Personas:</strong> ${reserva.cant_personas}</li>
      <li class="list-group-item"><strong>📝 Observaciones:</strong> ${reserva.observaciones || "-"}</li>
      <li class="list-group-item"><strong>📌 Estado:</strong> ${reserva.estado_reserva}</li>
      <li class="list-group-item"><strong>🧑‍💼 Modificado por:</strong> ${reserva.modif_canc_por || "-"}</li>
      <li class="list-group-item"><strong>❗ Motivo:</strong> ${reserva.motivo_cancelacion || "-"}</li>
      <li class="list-group-item"><strong>🕓 Fecha modificación:</strong> ${reserva.fecha_modificacion || "-"}</li>
    </ul>
  `;

  modalBody.innerHTML = detalleHTML;

  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // 🔒 Soluciona el warning aria-hidden y restaura el foco
  modalElement.addEventListener("hide.bs.modal", () => {
    document.activeElement?.blur(); // Evita que el foco quede en un elemento dentro del modal oculto
  }, { once: true });

  modalElement.addEventListener("hidden.bs.modal", () => {
    botonOrigen?.focus?.(); // Devuelve el foco al botón de origen
  });
}

function abrirModalModificarReserva(reserva, botonOrigen) {
  const modalElement = document.getElementById("modalModificarReserva");
  const modalBody = document.getElementById("contenidoModalModificar");

  // Estructura HTML del modal
  const id = reserva.id;
  const id_local = reserva.id_local;
  const fechaCompleta = reserva.fecha_reserva;
  const [fecha, hora] = fechaCompleta.split(" ");
  const observaciones = reserva.observaciones || "";
  const id_mesa = reserva.id_mesa;
  const descripcion_mesa = reserva.descripcion_mesa;
  const personas = reserva.cant_personas;
  const estado = reserva.estado_reserva;

  modalBody.innerHTML = `
    <div class="mb-3">
      <label class="form-label">Sucursal</label>
      <select id="dropdownModificarReservas" class="form-control" required>
        <option value="">Seleccione una sucursal</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="fechaModifCliente" class="form-label">Fecha</label>
      <input type="text" id="fechaModifCliente" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="horaModifCliente" class="form-label">Hora</label>
      <select id="horaModifCliente" class="form-control input-hora" required>
        <option value="">Seleccione hora</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Observaciones</label>
      <textarea class="form-control input-observaciones" maxlength="255">${observaciones !== "-" ? observaciones : ""}</textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Cantidad de personas</label>
      <select id="cant_personasModifCliente" class="form-control input-personas" required>
        <option value="">¿Cuántas personas?</option>
        ${[...Array(8)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Mesa asignada</label>
      <select id="mesaModifCliente" class="form-control" disabled required>
        <option value="">Seleccione una mesa</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Estado</label>
      <input type="text" class="form-control" value="${estado}" readonly>
    </div>

    <div class="mb-3">
      <label class="form-label">Motivo del cambio</label>
      <textarea class="form-control input-motivo" maxlength="255" placeholder="Explica el motivo de la modificación..."></textarea>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button type="button" class="btn btn-primary" onclick="guardarModificacionReserva(${id}, ${id_mesa})">Guardar cambios</button>
    </div>
  `;

  // Mostrar el modal
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // 🔒 Arregla el warning de aria-hidden y restaura el foco
  modalElement.addEventListener("hide.bs.modal", () => {
    document.activeElement?.blur();
  }, { once: true });

  modalElement.addEventListener("hidden.bs.modal", () => {
    botonOrigen?.focus?.();
  });

  // Esperar a que el contenido esté en el DOM
  setTimeout(() => {
    // Sucursal
    cargarDropdown("dropdownModificarReservas", true);
    setTimeout(() => {
      const sucursal = document.getElementById("dropdownModificarReservas");
      if (sucursal) sucursal.value = id_local;
    }, 100);

    // Cantidad de personas
    const cantInput = document.getElementById("cant_personasModifCliente");
    if (cantInput) cantInput.value = personas;

    // Fecha y calendario
    const fechaInput = document.getElementById("fechaModifCliente");
    if (fechaInput) {
      fechaInput.value = fecha;
      crearCalendarioPopup("fechaModifCliente");
    }

    // Horario
    generarOpcionesHorarioDisponibles(fecha, "horaModifCliente");

    setTimeout(() => {
      const horaInput = document.getElementById("horaModifCliente");
      if (horaInput) horaInput.value = hora;

      // Cargar mesas disponibles
      const local = document.getElementById("dropdownModificarReservas")?.value;
      const personasVal = document.getElementById("cant_personasModifCliente")?.value;
      const mesaSelectId = "mesaModifCliente";

      if (local && fecha && hora && personasVal) {
        obtenerMesasDisponibles(mesaSelectId, local, fecha, hora, personasVal, id_mesa, descripcion_mesa);
      }
    }, 150);

    // Evento para cambiar horarios según fecha
    fechaInput?.addEventListener("change", () => {
      generarOpcionesHorarioDisponibles(fechaInput.value, "horaModifCliente");
    });

    // Evento para actualizar mesas si cambian datos clave
    ["dropdownModificarReservas", "fechaModifCliente", "horaModifCliente", "cant_personasModifCliente"].forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener("change", () => {
        const local = document.getElementById("dropdownModificarReservas")?.value;
        const fechaVal = document.getElementById("fechaModifCliente")?.value;
        const horaVal = document.getElementById("horaModifCliente")?.value;
        const personasVal = document.getElementById("cant_personasModifCliente")?.value;
        const mesaSelect = document.getElementById("mesaModifCliente");

        if (!local || !fechaVal || !horaVal || !personasVal) {
          mesaSelect.innerHTML = "<option value=''>Seleccione una mesa</option>";
          mesaSelect.disabled = true;
          return;
        }

        obtenerMesasDisponibles("mesaModifCliente", local, fechaVal, horaVal, personasVal);
      });
    });

  }, 100);
}
function guardarModificacionReserva(idReserva, mesaOriginal) {
  const idLocal = document.getElementById("dropdownModificarReservas").value;
  const fecha = document.getElementById("fechaModifCliente").value;
  const hora = document.getElementById("horaModifCliente").value;
  const personas = document.getElementById("cant_personasModifCliente").value;
  const mesa = document.getElementById("mesaModifCliente").value;
  const observaciones = document.querySelector(".input-observaciones").value.trim();
  const motivo = document.querySelector(".input-motivo").value.trim();

  const usuarioTipo = sessionStorage.getItem("usuarioTipo");

  if (!idLocal || !fecha || !hora || !personas) {
    alert("Por favor, completá todos los campos obligatorios.");
    return;
  }

  const datos = new FormData();
  datos.append("id_reserva", idReserva);
  datos.append("id_local", idLocal);
  datos.append("fecha", fecha);
  datos.append("hora", hora);
  datos.append("cantidad", personas);
  datos.append("observaciones", observaciones || "-");
  datos.append("motivo_cancelacion", motivo || "-");
  datos.append("tipo_usuario", usuarioTipo); // Útil para el backend

  if (mesa !== mesaOriginal) {
    datos.append("mesa", mesa);
  }

  if (usuarioTipo === "empleado") {
    if (!motivo) {
      alert("Por favor, ingresá un motivo para la modificación.");
      return;
    }
    datos.append("modificado_por", sessionStorage.getItem("idEmpleado"));
  } else {
    // Cliente
    datos.append("modificado_por", sessionStorage.getItem("idCliente"));
  }

  fetch("modificar_reserva_cliente.php", {
    method: "POST",
    body: datos
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      if (msg.includes("✅")) {
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalModificarReserva"));
        modal.hide();

        if (sessionStorage.getItem("usuarioTipo") === "empleado") {
          // Guardar datos actuales del formulario para mantenerlos luego
          const dni = document.getElementById("dniModificarEmpleado")?.value || "";
          const email = document.getElementById("emailModificarEmpleado")?.value || "";
          sessionStorage.setItem("busquedaDNI", dni);
          sessionStorage.setItem("busquedaEmail", email);

          sessionStorage.setItem("accionEmpleado", "modificar");
        }

        navegarConTab('list-misReservas-list');
      }
    })
    .catch(err => {
      console.error("Error al guardar la reserva:", err);
      alert("Ocurrió un error al guardar la reserva.");
    });
}

function cancelarReserva(id_reserva, botonOrigen) {
  const modalElement = document.getElementById("modalCancelarReserva");
  const motivoInput = document.getElementById("motivoCancelacionInput");
  const btnConfirmar = document.getElementById("confirmarCancelacionBtn");

  // Limpiar textarea al abrir el modal
  motivoInput.value = "";

  // Crear instancia Bootstrap Modal (si ya existe, devuelve la instancia)
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  // Mostrar el modal
  modal.show();

  // Poner foco en el textarea cuando el modal esté visible
  modalElement.addEventListener("shown.bs.modal", () => {
    motivoInput.focus();
  }, { once: true });

  // Quitar cualquier listener previo para evitar múltiples envíos
  btnConfirmar.onclick = null;

  btnConfirmar.onclick = () => {
    const motivo = motivoInput.value.trim();
    const tipoUsuario = sessionStorage.getItem("usuarioTipo");
    let id_cliente = tipoUsuario === "empleado" ? sessionStorage.getItem("idClienteTemporal") : sessionStorage.getItem("idCliente");
    
    if (tipoUsuario === "empleado" && !motivo) {
      alert("Por favor, indicá el motivo de la cancelación.");
      motivoInput.focus();
      return;
    }

    const formData = new FormData();
    formData.append("id_reserva", id_reserva);
    formData.append("id_cliente", id_cliente);
    formData.append("tipo", tipoUsuario === "empleado" ? "empleado" : "cliente");
    formData.append("motivo_cancelacion", motivo);

    fetch("cancelar_reserva_cliente.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(data => {
        alert(data);
        if (data.includes("✅")) {
          const modal = bootstrap.Modal.getInstance(document.getElementById("modalCancelarReserva"));
          modal.hide();
          if (sessionStorage.getItem("usuarioTipo") === "empleado") {
            // Guardar datos actuales del formulario para mantenerlos luego
            const dni = document.getElementById("dniCancelarEmpleado")?.value || "";
            const email = document.getElementById("emailCancelarEmpleado")?.value || "";
            sessionStorage.setItem("busquedaDNI", dni);
            sessionStorage.setItem("busquedaEmail", email);

            sessionStorage.setItem("accionEmpleado", "cancelar");
          }
          navegarConTab('list-misReservas-list');
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("❌ Error al cancelar la reserva.");
      });
  };

  //Soluciona el warning aria-hidden y restaura el foco al botón que abrió el modal
  modalElement.addEventListener("hide.bs.modal", () => {
    document.activeElement?.blur(); // Evita que el foco quede en un elemento dentro del modal oculto
  }, { once: true });

  modalElement.addEventListener("hidden.bs.modal", () => {
    botonOrigen?.focus?.(); // Devuelve el foco al botón de origen
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
      aplicarSoloLetras();
      aplicarSoloNumeros();
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

// Mis reservas del Empleado
// Visualizar

function filtrarReservas() {
  const input = document.getElementById("inputBuscarReservasEmpleado").value.toLowerCase();
  const filas = document.querySelectorAll(".reserva-row");

  filas.forEach(fila => {
    const textoFila = fila.innerText.toLowerCase();
    fila.style.display = textoFila.includes(input) ? "" : "none";
  });
}

function cargarVisualizarReservas() {
  // Obtener los datos del empleado desde sessionStorage
  const idEmpleado = sessionStorage.getItem("idEmpleado");
  const puesto = sessionStorage.getItem("puestoEmpleado");
  const idLocalEmpleado = sessionStorage.getItem("idLocalEmpleado");

  // Asegúrate de que los datos necesarios están disponibles
  if (!idEmpleado || !puesto || !idLocalEmpleado) {
    alert("⚠️ No se han encontrado los datos del empleado.");
    return;
  }

  // Preparamos los datos para enviarlos al servidor
  const data = new FormData();
  data.append("idEmpleado", idEmpleado);
  data.append("puesto", puesto);
  data.append("idLocal", idLocalEmpleado);
  console.log("Empleado:", idEmpleado, "Puesto:", puesto, "Local:", idLocalEmpleado);

  fetch("reservas_visualizar.php", {
    method: "POST",
    body: data
  })
    .then(res => res.text())
    .then(html => {
      document.getElementById("resultadoReservasEmpleado").innerHTML = html;

      // volver a asociar el evento de filtrado si el input se regenera
      const input = document.getElementById("inputBuscarReservasEmpleado");
      if (input) {
        input.addEventListener("input", filtrarReservas);
      }
    });
}

function cambiarEstadoReserva(id, nuevoEstado) {
  if (!confirm(`¿Seguro que querés marcar como "${nuevoEstado}" esta reserva?`)) return;

  const idEmpleado = sessionStorage.getItem("idEmpleado");

  let motivo = "";
  if (nuevoEstado === "realizada/anulada") {
    motivo = prompt("📋 Ingresá el motivo de la anulación:");
    if (!motivo || motivo.trim() === "") {
      alert("⚠️ Debés ingresar un motivo para anular la reserva.");
      return;
    }
  }

  const data = new FormData();
  data.append("id_reserva", id);
  data.append("estado", nuevoEstado);
  data.append("id_empleado", idEmpleado);
  if (motivo) data.append("motivo", motivo);

  fetch("reservas_visualizar.php", {
    method: "POST",
    body: data
  })
    .then(res => res.text())
    .then(alert)
    .then(() => cargarVisualizarReservas(document.getElementById("inputBuscarReservasEmpleado")?.value || ""));
}

function buscarReservas(event) {
  event.preventDefault();
  const form = event.target;
  const columna = form.columna.value;
  const valor = form.valor.value;

  if (!columna || !valor) return alert("⚠️ Completá los campos");

  // Obtener los datos del empleado desde sessionStorage
  const idEmpleado = sessionStorage.getItem("idEmpleado");
  const puesto = sessionStorage.getItem("puestoEmpleado");
  const idLocalEmpleado = sessionStorage.getItem("idLocalEmpleado");

  // Preparamos los datos para enviarlos al servidor
  const data = new FormData();
  data.append("columna", columna);
  data.append("valor", valor);
  data.append("idEmpleado", idEmpleado);
  data.append("puesto", puesto);
  data.append("idLocal", idLocalEmpleado);

  fetch("reservas_visualizar.php", {
    method: "POST",
    body: data
  })
    .then(r => r.text())
    .then(html => {
      document.getElementById("resultadoBusquedaReservas").innerHTML = html;
    });
}

let reservaActualCambioMesa = null;
function mostrarCambioMesa(reserva) {
  reservaActualCambioMesa = reserva;

  // Petición para obtener mesas disponibles
  const data = new FormData();
  data.append("accion", "obtener_mesas_disponibles");
  data.append("fecha_reserva", reserva.fecha_reserva);
  data.append("cant_personas", reserva.cant_personas);
  data.append("id_mesa_actual", reserva.id_mesa);
  data.append("id_local", sessionStorage.getItem("idLocalEmpleado"));

  fetch("reservas_visualizar.php", {
    method: "POST",
    body: data
  })
    .then(r => r.json())
    .then(mesas => {
      const select = document.getElementById("selectNuevaMesa");
      select.innerHTML = "";

      mesas.forEach(mesa => {
        const option = document.createElement("option");
        option.value = mesa.id_mesa;
        option.textContent = `${mesa.descripcion} (capacidad: ${mesa.cupo_maximo})`;
        select.appendChild(option);
      });

      new bootstrap.Modal(document.getElementById("modalCambioMesa")).show();
    });
}

// Confirmar cambio de mesa
function confirmarCambioMesa() {
  const nuevaMesa = document.getElementById("selectNuevaMesa").value;
  if (!nuevaMesa || !reservaActualCambioMesa) return;

  const data = new FormData();
  data.append("accion", "cambiar_mesa");
  data.append("id_reserva", reservaActualCambioMesa.id_reserva);
  data.append("nueva_mesa", nuevaMesa);
  data.append("mesa_anterior", reservaActualCambioMesa.id_mesa);
  data.append("id_empleado", sessionStorage.getItem("idEmpleado"));

  fetch("reservas_visualizar.php", {
    method: "POST",
    body: data
  })
    .then(r => r.text())
    .then(alert)
    .then(() => {
      cargarVisualizarReservas();
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalCambioMesa"));
      modal.hide(); // opcional: cerrar modal automáticamente
    });
}

function inicializarEventosMisReservasEmpleado() {
  const btnModificar = document.querySelector('#botonesDeAccion input[value="Modificar reservas"]');
  const btnCancelar = document.querySelector('#botonesDeAccion input[value="Cancelar reservas"]');
  const btnVisualizar = document.querySelector('#botonesDeAccion input[value="Visualizar reservas"]');
  const btnConfirmarCambioMesa = document.getElementById("btnConfirmarCambioMesa");

  if (btnModificar) {
    btnModificar.addEventListener('click', () => mostrarContenidoMisReservasE('modificar'));
  }
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => mostrarContenidoMisReservasE('cancelar'));
  }
  if (btnVisualizar) {
    btnVisualizar.addEventListener('click', () => {
      mostrarContenidoMisReservasE('visualizar');
      cargarVisualizarReservas();
    });
  }
  if (btnConfirmarCambioMesa) {
    btnConfirmarCambioMesa.addEventListener("click", confirmarCambioMesa);
  }
}