<?php
include('config_BDD.php');

if (!isset($_GET['tabla'])) {
  echo "Tabla no especificada";
  exit;
}

$tabla = $_GET['tabla'];
switch ($tabla) {
  case 'clientes':
    mostrarClientes($conexion);
    break;
  case 'empleados':
    mostrarEmpleados($conexion);
    break;
  case 'empleado_funcion':
    mostrarEmpleadoFuncion($conexion);
    break;
  case 'estado_reserva':
    mostrarEstadoReserva($conexion);
    break;
  case 'locales':
    mostrarLocales($conexion);
    break;
  case 'local_menu':
    mostrarLocalMenu($conexion);
    break;
  case 'menu':
    mostrarMenu($conexion);
    break;
  case 'mesas':
    mostrarMesas($conexion);
    break;
  case 'reservas':
    mostrarReservas($conexion);
    break;
  default:
    echo "Tabla no soportada";
    break;
}

// funciones:
function mostrarClientes($conexion)
{
  $res = $conexion->query("SELECT * FROM clientes");
  echo "<h3>Clientes</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Mail</th>
                <th>Teléfono</th>
                <th>Fecha Nac</th>
                <th>Contraseña</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";
    
    $anioActual = date("Y");
    $minFecha = ($anioActual - 80) . "-01-01";
    $maxFecha = ($anioActual - 14) . "-12-31";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_cliente']}</td>
            <td>{$row['nombre']}</td>
            <td>{$row['apellido']}</td>
            <td>{$row['dni']}</td>
            <td>{$row['mail']}</td>
            <td>{$row['telefono']}</td>
            <td>{$row['fecha_nacimiento']}</td>
            <td>{$row['contrasena']}</td>
            <td>
                <form>
                    <input name='nombre' maxlength='50' class='solo-letras' value='{$row['nombre']}' required>
                    <input name='apellido' maxlength='50' class='solo-letras' value='{$row['apellido']}' required>
                    <input name='dni' type='number' min='1000000' max='99999999999' maxlength='11' class='solo-numeros' value='{$row['dni']}' required>
                    <input name='mail' type='email' maxlength='100' value='{$row['mail']}' required>
                    <input name='telefono' type='tel' pattern='[0-9]{10,20}' minlength='10' maxlength='20' class='solo-numeros' value='{$row['telefono']}' required>
                    <input name='fecha_nacimiento' type='date' value='{$row['fecha_nacimiento']}' min='$minFecha' max='$maxFecha' required>
                    <input name='contrasena' maxlength='20' type='password' placeholder='Nueva contraseña' autocomplete='new-password' required>
                    <button type='button' class='btn-modificar' data-id='{$row['id_cliente']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_cliente']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nuevo cliente</h4>
    <form data-accion='agregar'>
        <input name='nombre' maxlength='50' class='solo-letras' placeholder='Nombre' required>
        <input name='apellido' maxlength='50' class='solo-letras' placeholder='Apellido' required>
        <input name='dni' min='1000000' max='99999999' minlength='7' maxlength='11' class='solo-numeros' placeholder='DNI' required>
        <input name='mail' type='email' maxlength='100' placeholder='Email'>
        <input name='telefono' type='tel' pattern='[0-9]{10,20}' minlength='10' maxlength='20' class='solo-numeros' placeholder='Teléfono' required>
        <input name='fecha_nacimiento' type='date' min='$minFecha' max='$maxFecha'>
        <input name='contrasena' maxlength='20' type='password' placeholder='Contraseña' required>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarEmpleados($conexion)
{
  $res = $conexion->query("SELECT * FROM empleados");
  echo "<h3>Empleados</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Mail</th>
                <th>Puesto</th>
                <th>Contrasena</th>
                <th>ID Local</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_empleado']}</td>
            <td>{$row['nombre']}</td>
            <td>{$row['apellido']}</td>
            <td>{$row['dni']}</td>
            <td>{$row['mail']}</td>
            <td>{$row['puesto']}</td>
            <td>{$row['contrasena']}</td>
            <td>{$row['id_local']}</td>
            <td>
                <form>
                    <input name='nombre' maxlength='50' class='solo-letras' value='{$row['nombre']}' required>
                    <input name='apellido' maxlength='50' class='solo-letras' value='{$row['apellido']}' required>
                    <input name='dni' type='number' min='1000000' max='99999999999' maxlength='11' class='solo-numeros' value='{$row['dni']}' required>
                    <input name='mail' type='email' maxlength='100' value='{$row['mail']}' required>
                    <select name='puesto' value='{$row['puesto']}' required>
                        <option value='Mozo' " . ($row['puesto'] === 'Mozo' ? 'selected' : '') . ">Mozo</option>
                        <option value='Caja' " . ($row['puesto'] === 'Caja' ? 'selected' : '') . ">Caja</option>
                        <option value='Limpieza' " . ($row['puesto'] === 'Limpieza' ? 'selected' : '') . ">Limpieza</option>
                        <option value='Subgerente' " . ($row['puesto'] === 'Subgerente' ? 'selected' : '') . ">Subgerente</option>
                        <option value='Gerente' " . ($row['puesto'] === 'Gerente' ? 'selected' : '') . ">Gerente</option>
                    </select>
                    <input name='id_local' maxlength='11' class='solo-numeros' value='{$row['id_local']}'>
                    <input name='contrasena' maxlength='20' type='password' placeholder='Nueva contraseña' autocomplete='new-password'>
                    <button type='button' class='btn-modificar' data-id='{$row['id_empleado']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_empleado']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nuevo empleado</h4>
    <form data-accion='agregar'>
        <input name='nombre' maxlength='50' class='solo-letras' placeholder='Nombre' required>
        <input name='apellido' maxlength='50' class='solo-letras' placeholder='Apellido' required>
        <input name='dni' min='1000000' max='99999999' minlength='7' maxlength='11' class='solo-numeros' placeholder='DNI' required>
        <input name='mail' type='email' maxlength='100' placeholder='Email' required>
        <select name='puesto' required>
            <option value='Mozo'>Mozo</option>
            <option value='Caja'>Caja</option>
            <option value='Limpieza'>Limpieza</option>
            <option value='Subgerente'>Subgerente</option>
            <option value='Gerente'>Gerente</option>
        </select>
        <input name='id_local' maxlength='11' class='solo-numeros' placeholder='ID Local' required>
        <input name='contrasena' maxlength='20' type='password' placeholder='Contraseña' required>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarEmpleadoFuncion($conexion)
{
  $res = $conexion->query("SELECT * FROM empleado_funcion");

  $hoy = date('Y-m-d'); // Obtener fecha de hoy

  echo "<h3>Empleado Funciones</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Función</th>
                <th>ID Empleado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    $fechaHora = new DateTime($row['dia_hora']);
    $fecha = $fechaHora->format('Y-m-d');
    $hora = $fechaHora->format('H:i');

    echo "<tr>
            <td>{$row['id_empleado_funcion']}</td>
            <td>{$fecha}</td>
            <td>{$hora}</td>
            <td>{$row['funcion']}</td>
            <td>{$row['id_empleado']}</td>
            <td>
                <form>
                    <input name='fecha' type='date' value='{$fecha}' min='{$hoy}' required>
                    <select name='hora' type='time' required>
                        <option value='11:00:00' " . ($hora === '11:00:00' ? 'selected' : '') . ">11:00</option>
                        <option value='12:00:00' " . ($hora === '12:00:00' ? 'selected' : '') . ">12:00</option>
                        <option value='13:00:00' " . ($hora === '13:00:00' ? 'selected' : '') . ">13:00</option>
                        <option value='14:00:00' " . ($hora === '14:00:00' ? 'selected' : '') . ">14:00</option>
                        <option value='15:00:00' " . ($hora === '15:00:00' ? 'selected' : '') . ">15:00</option>
                        <option value='16:00:00' " . ($hora === '16:00:00' ? 'selected' : '') . ">16:00</option>
                        <option value='17:00:00' " . ($hora === '17:00:00' ? 'selected' : '') . ">17:00</option>
                        <option value='18:00:00' " . ($hora === '18:00' ? 'selected' : '') . ">18:00</option>
                        <option value='19:00:00' " . ($hora === '19:00' ? 'selected' : '') . ">19:00</option>
                        <option value='20:00:00' " . ($hora === '20:00' ? 'selected' : '') . ">20:00</option>
                    </select>

                    <select name='funcion' required>
                        <option value='Mozo' " . ($row['funcion'] === 'Mozo' ? 'selected' : '') . ">Mozo</option>
                        <option value='Caja' " . ($row['funcion'] === 'Caja' ? 'selected' : '') . ">Caja</option>
                        <option value='Limpieza' " . ($row['funcion'] === 'Limpieza' ? 'selected' : '') . ">Limpieza</option>
                        <option value='Subgerente' " . ($row['funcion'] === 'Subgerente' ? 'selected' : '') . ">Subgerente</option>
                        <option value='Gerente' " . ($row['funcion'] === 'Gerente' ? 'selected' : '') . ">Gerente</option>
                    </select>

                    <input name='id_empleado' type='text' maxlength='3' class='solo-numeros' value='{$row['id_empleado']}' required>
                    <button type='button' class='btn-modificar' data-id='{$row['id_empleado_funcion']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_empleado_funcion']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nueva función</h4>
    <form data-accion='agregar'>
        <input name='fecha' type='date' min='{$hoy}' required>
        <select name='hora' type='time' required>
            <option value='11:00:00'>11:00</option>
            <option value='12:00:00'>12:00</option>
            <option value='13:00:00'>13:00</option>
            <option value='14:00:00'>14:00</option>
            <option value='15:00:00'>15:00</option>
            <option value='16:00:00'>16:00</option>
            <option value='17:00:00'>17:00</option>
            <option value='18:00:00'>18:00</option>
            <option value='19:00:00'>19:00</option>
            <option value='20:00:00'>20:00</option>
        </select>

        <select name='funcion' required>
            <option value='Mozo'>Mozo</option>
            <option value='Caja'>Caja</option>
            <option value='Limpieza'>Limpieza</option>
            <option value='Subgerente'>Subgerente</option>
            <option value='Gerente'>Gerente</option>
        </select>

        <input name='id_empleado' type='text' maxlength='3' class='solo-numeros' placeholder='ID Empleado' required>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarEstadoReserva($conexion)
{
  $res = $conexion->query("SELECT * FROM estado_reserva");
  echo "<h3>Estado Reserva</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_estado_reserva']}</td>
            <td>{$row['estados']}</td>
            <td>
                <form>
                    <input name='estados' value='{$row['estados']}'>
                    <button type='button' class='btn-modificar' data-id='{$row['id_estado_reserva']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_estado_reserva']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nuevo estado</h4>
    <form data-accion='agregar'>
        <input name='estados' placeholder='Estado'>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarLocales($conexion)
{
  $res = $conexion->query("SELECT * FROM locales");
  echo "<h3>Locales</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Disponibilidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_local']}</td>
            <td>{$row['nombre']}</td>
            <td>{$row['direccion']}</td>
            <td>{$row['telefono']}</td>
            <td>{$row['estado_disponibilidad']}</td>
            <td>
                <form>
                    <input name='nombre' placeholder='Nombre' type='text' maxlength='100' class='solo-letras' value='{$row['nombre']}' required>
                    <input name='direccion' placeholder='Dirección' maxlength='255' value='{$row['direccion']}' required>
                    <input name='telefono' type='tel' pattern='[0-9]{10,20}' minlength='10' maxlength='20' class='solo-numeros' value='{$row['telefono']}' required>
                    <select name='estado_disponibilidad' value='{$row['estado_disponibilidad']}' required>
                        <option value='disponible' " . ($row['estado_disponibilidad'] === 'disponible' ? 'selected' : '') . ">disponible</option>
                        <option value='no disponible' " . ($row['estado_disponibilidad'] === 'no disponible' ? 'selected' : '') . ">no disponible</option>
                    </select>
                    <button type='button' class='btn-modificar' data-id='{$row['id_local']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_local']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

    echo "</tbody>
        </table>
        <h4>Agregar nuevo local</h4>
        <form data-accion='agregar'>
            <input name='nombre' placeholder='Nombre' type='text' maxlength='100' class='solo-letras' required>
            <input name='direccion' placeholder='Dirección' maxlength='255' required>
            <input name='telefono' type='tel' pattern='[0-9]{10,20}' minlength='10' maxlength='20' class='solo-numeros' placeholder='Teléfono' required>
            <select name='estado_disponibilidad' required>
                <option value='disponible'>disponible</option>
                <option value='no disponible'>no disponible</option>
            </select>
            <input type='submit' value='Agregar'>
        </form>";
}

function mostrarLocalMenu($conexion)
{
  $res = $conexion->query("SELECT * FROM local_menu");
  echo "<h3>Local Menu</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>ID Menu</th>
                <th>ID Local</th>
                <th>Disponibilidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_local_menu']}</td>
            <td>{$row['id_menu']}</td>
            <td>{$row['id_local']}</td>
            <td>{$row['estado_disponibilidad']}</td>
            <td>
                <form>
                    <input name='id_menu' class='solo-numeros' maxlength='11' value='{$row['id_menu']}' required>
                    <input name='id_local' class='solo-numeros'maxlength='11'  value='{$row['id_local']}' required>
                    <select name='estado_disponibilidad' value='{$row['estado_disponibilidad']}' required>
                        <option value='disponible' " . ($row['estado_disponibilidad'] === 'disponible' ? 'selected' : '') . ">disponible</option>
                        <option value='no disponible' " . ($row['estado_disponibilidad'] === 'no disponible' ? 'selected' : '') . ">no disponible</option>
                    </select>
                    <button type='button' class='btn-modificar' data-id='{$row['id_local_menu']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_local_menu']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar ítem a local</h4>
    <form data-accion='agregar'>
        <input name='id_menu' class='solo-numeros' maxlength='11' placeholder='ID Menu' required>
        <input name='id_local' class='solo-numeros' maxlength='11' placeholder='ID Local' required>
        <select name='estado_disponibilidad' placeholder='Disponibilidad' required>
            <option value='disponible'>disponible</option>
            <option value='no disponible'>no disponible</option>
        </select>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarMenu($conexion)
{
  $res = $conexion->query("SELECT * FROM menu");
  echo "<h3>Menú</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_menu']}</td>
            <td>{$row['nombre']}</td>
            <td>{$row['precio']}</td>
            <td>{$row['categoria']}</td>
            <td>{$row['descripcion']}</td>
            <td>{$row['ruta_imagen']}</td>
            <td>
                <form>
                    <input name='nombre' value='{$row['nombre']}'>
                    <input name='precio' value='{$row['precio']}'>
                    <input name='categoria' value='{$row['categoria']}'>
                    <input name='descripcion' value='{$row['descripcion']}'>
                    <input name='ruta_imagen' value='{$row['ruta_imagen']}'>
                    <button type='button' class='btn-modificar' data-id='{$row['id_menu']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_menu']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nuevo ítem</h4>
    <form data-accion='agregar'>
        <input name='nombre' placeholder='Nombre'>
        <input name='precio' placeholder='Precio'>
        <input name='categoria' placeholder='Categoría'>
        <input name='descripcion' placeholder='Descripción'>
        <input name='ruta_imagen' placeholder='Imagen'>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarMesas($conexion)
{
  $res = $conexion->query("SELECT * FROM mesas");
  echo "<h3>Mesas</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>ID Local</th>
                <th>Descripción</th>
                <th>Cupo Máximo</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_mesa']}</td>
            <td>{$row['id_local']}</td>
            <td>{$row['descripcion']}</td>
            <td>{$row['cupo_maximo']}</td>
            <td>{$row['estado']}</td>
            <td>
                <form>
                    <input name='id_local' value='{$row['id_local']}'>
                    <input name='descripcion' value='{$row['descripcion']}'>
                    <input name='cupo_maximo' value='{$row['cupo_maximo']}'>
                    <input name='estado' value='{$row['estado']}'>
                    <button type='button' class='btn-modificar' data-id='{$row['id_mesa']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_mesa']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nueva mesa</h4>
    <form data-accion='agregar'>
        <input name='id_local' placeholder='ID Local'>
        <input name='descripcion' placeholder='Descripción'>
        <input name='cupo_maximo' placeholder='Cupo Máximo'>
        <input name='estado' placeholder='Estado'>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarReservas($conexion)
{
  $res = $conexion->query("SELECT * FROM reservas");
  echo "<h3>Reservas</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>ID Cliente</th>
                <th>ID Mesa</th>
                <th>Fecha</th>
                <th>Observaciones</th>
                <th>Cant. Personas</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_reserva']}</td>
            <td>{$row['id_cliente']}</td>
            <td>{$row['id_mesa']}</td>
            <td>{$row['fecha_reserva']}</td>
            <td>{$row['observaciones']}</td>
            <td>{$row['cant_personas']}</td>
            <td>{$row['id_estado_reserva']}</td>
            <td>
                <form>
                    <input name='id_cliente' value='{$row['id_cliente']}'>
                    <input name='id_mesa' value='{$row['id_mesa']}'>
                    <input name='fecha_reserva' value='{$row['fecha_reserva']}'>
                    <input name='observaciones' value='{$row['observaciones']}'>
                    <input name='cant_personas' value='{$row['cant_personas']}'>
                    <input name='id_estado_reserva' value='{$row['id_estado_reserva']}'>
                    <button type='button' class='btn-modificar' data-id='{$row['id_reserva']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_reserva']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nueva reserva</h4>
    <form data-accion='agregar'>
        <input name='id_cliente' placeholder='ID Cliente'>
        <input name='id_mesa' placeholder='ID Mesa'>
        <input type='datetime-local' name='fecha_reserva'>
        <input name='observaciones' placeholder='Observaciones'>
        <input name='cant_personas' placeholder='Cantidad'>
        <input name='id_estado_reserva' placeholder='Estado'>
        <input type='submit' value='Agregar'>
    </form>";
}
?>