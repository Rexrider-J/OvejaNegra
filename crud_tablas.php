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
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_cliente']}</td>
            <td>{$row['nombre']}</td>
            <td>{$row['apellido']}</td>
            <td>{$row['dni']}</td>
            <td>{$row['mail']}</td>
            <td>{$row['telefono']}</td>
            <td>{$row['fecha_nacimiento']}</td>
            <td>
                <form>
                    <input name='nombre' value='{$row['nombre']}'>
                    <input name='apellido' value='{$row['apellido']}'>
                    <input name='dni' value='{$row['dni']}'>
                    <input name='mail' value='{$row['mail']}'>
                    <input name='telefono' value='{$row['telefono']}'>
                    <input name='fecha_nacimiento' type='date' value='{$row['fecha_nacimiento']}'>
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
        <input name='nombre' placeholder='Nombre' required>
        <input name='apellido' placeholder='Apellido' required>
        <input name='dni' placeholder='DNI' required>
        <input name='mail' placeholder='Email'>
        <input name='telefono' placeholder='Teléfono'>
        <input name='fecha_nacimiento' type='date'>
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
            <td>{$row['id_local']}</td>
            <td>
                <form>
                    <input name='nombre' value='{$row['nombre']}'>
                    <input name='apellido' value='{$row['apellido']}'>
                    <input name='dni' value='{$row['dni']}'>
                    <input name='mail' value='{$row['mail']}'>
                    <input name='puesto' value='{$row['puesto']}'>
                    <input name='id_local' value='{$row['id_local']}'>
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
        <input name='nombre' placeholder='Nombre' required>
        <input name='apellido' placeholder='Apellido' required>
        <input name='dni' placeholder='DNI' required>
        <input name='mail' placeholder='Email'>
        <input name='puesto' placeholder='Puesto'>
        <input name='id_local' placeholder='ID Local'>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarEmpleadoFuncion($conexion)
{
  $res = $conexion->query("SELECT * FROM empleado_funcion");
  echo "<h3>Empleado Funciones</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha y Hora</th>
                <th>Funcion</th>
                <th>ID Empleado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_empleado_funcion']}</td>
            <td>{$row['dia_hora']}</td>
            <td>{$row['funcion']}</td>
            <td>{$row['id_empleado']}</td>
            <td>
                <form>
                    <input name='dia_hora' value='{$row['dia_hora']}'>
                    <input name='funcion' value='{$row['funcion']}'>
                    <input name='id_empleado' value='{$row['id_empleado']}'>
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
        <input name='dia_hora' type='datetime-local' required>
        <input name='funcion' placeholder='Funcion'>
        <input name='id_empleado' placeholder='ID Empleado'>
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
                    <input name='nombre' value='{$row['nombre']}'>
                    <input name='direccion' value='{$row['direccion']}'>
                    <input name='telefono' value='{$row['telefono']}'>
                    <input name='estado_disponibilidad' value='{$row['estado_disponibilidad']}'>
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
        <input name='nombre' placeholder='Nombre'>
        <input name='direccion' placeholder='Dirección'>
        <input name='telefono' placeholder='Teléfono'>
        <input name='estado_disponibilidad' placeholder='Estado'>
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
                    <input name='id_menu' value='{$row['id_menu']}'>
                    <input name='id_local' value='{$row['id_local']}'>
                    <input name='estado_disponibilidad' value='{$row['estado_disponibilidad']}'>
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
        <input name='id_menu' placeholder='ID Menu'>
        <input name='id_local' placeholder='ID Local'>
        <input name='estado_disponibilidad' placeholder='Disponibilidad'>
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
