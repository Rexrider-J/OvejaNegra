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
        <input name='mail' type='email' maxlength='100' placeholder='Email'required>
        <input name='telefono' type='tel' pattern='[0-9]{10,20}' minlength='10' maxlength='20' class='solo-numeros' placeholder='Teléfono' required>
        <input name='fecha_nacimiento' type='date' min='$minFecha' max='$maxFecha' required>
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

        <input name='id_empleado' type='text' maxlength='11' class='solo-numeros' placeholder='ID Empleado' required>
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
            </tr>
        </thead>
        <tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr>
            <td>{$row['id_estado_reserva']}</td>
            <td>{$row['estados']}</td>
        </tr>";
  }
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
  $categorias = ['Cafeteria', 'Panaderia', 'Milkshake', 'Waffles', 'Starters', 'Burgers', 'Adicionales', 'Milanesas', 'Hotdogs', 'Ensaladas', 'Bebidas', 'Postres', 'Promo', 'Brunch'];
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
                <form enctype='multipart/form-data'>
                    <input name='nombre' maxlength='50' class='solo-letras' value='{$row['nombre']}' required>
                    <input name='precio' type='number' step='0.01' value='{$row['precio']}' required>
                    <select name='categoria' required>
                        <option selected value='{$row['categoria']}'>{$row['categoria']}</option>";
                        foreach ($categorias as $cat) {
                            echo "<option value='$cat'>$cat</option>";
                        }
                    echo "</select>
                    <input name='descripcion' maxlength='255' value='{$row['descripcion']}' required>
                    <input name='imagen' type='file' accept='image/*' required>
                    <button type='button' class='btn-modificar' data-id='{$row['id_menu']}'>Modificar</button>
                    <button type='button' class='btn-eliminar' data-id='{$row['id_menu']}'>Eliminar</button>
                </form>
            </td>
        </tr>";
  }

  echo "</tbody>
    </table>
    <h4>Agregar nuevo ítem</h4>
    <form data-accion='agregar' enctype='multipart/form-data'>
        <input name='nombre' maxlength='50' class='solo-letras' placeholder='Nombre' required>
        <input name='precio' type='number' step='0.01' placeholder='Precio' required>
        <select name='categoria' required>
        <option disabled selected value=''>Categoría...</option>";
            foreach ($categorias as $cat) {
                echo "<option value='$cat'>$cat</option>";
            }
        echo "</select>
        <input name='descripcion' maxlength='255' placeholder='Descripción' required>
        <input type='file' name='imagen' accept='image/*' required>
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
                    <input name='id_local' class='solo-numeros' maxlength='11' value='{$row['id_local']}' required>
                    <input name='descripcion' maxlength='255' value='{$row['descripcion']}' required>
                    <select name='cupo_maximo' value='{$row['cupo_maximo']}' required>
                        <option value='2' " . ($row['cupo_maximo'] === '2' ? 'selected' : '') . ">2</option>
                        <option value='4' " . ($row['cupo_maximo'] === '4' ? 'selected' : '') . ">4</option>
                        <option value='6' " . ($row['cupo_maximo'] === '6' ? 'selected' : '') . ">6</option>
                        <option value='8' " . ($row['cupo_maximo'] === '8' ? 'selected' : '') . ">8</option>
                    </select>
                    <select name='estado' value='{$row['estado']}' required>
                        <option value='habilitada' " . ($row['estado'] === 'habilitada' ? 'selected' : '') . ">habilitada</option>
                        <option value='deshabilitada' " . ($row['estado'] === 'deshabilitada' ? 'selected' : '') . ">deshabilitada</option>
                    </select>
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
        <input name='id_local' class='solo-numeros' maxlength='11' placeholder='ID Local' required>
        <input name='descripcion' maxlength='255' placeholder='Descripción' required>
        <select name='cupo_maximo' required>
            <option value='2'>2</option>
            <option value='4'>4</option>
            <option value='6'>6</option>
            <option value='8'>8</option>
        </select>
        <select name='estado' required>
            <option value='habilitada'>habilitada</option>
            <option value='deshabilitada'>deshabilitada</option>
        </select>
        <input type='submit' value='Agregar'>
    </form>";
}

function mostrarReservas($conexion)
{
    $res = $conexion->query("SELECT * FROM reservas");

    $hoy = date('Y-m-d'); // Obtener fecha de hoy

    echo "<h3>Reservas</h3>
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>ID Cliente</th>
                <th>ID Mesa</th>
                <th>ID Local</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Observaciones</th>
                <th>Cant. Personas</th>
                <th>Estado</th>
                <th>Fecha modifi/cancel</th>
                <th>Hora modifi/cancel</th>
                <th>Modificado por</th>
                <th>Tipo modif/cancel</th>
                <th>Motivo</th>
                <th>Cambio mesa</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>";

    while ($row = $res->fetch_assoc()) {
        $fechaHora = new DateTime($row['fecha_reserva']);
        $fecha = $fechaHora->format('Y-m-d');
        $hora = $fechaHora->format('H:i');

        $fecha_mod_cancel = null;
        $hora_mod_cancel = null;
        if (!empty($row['fecha_modificacion_cancelacion'])) {
            $fechaHora_mod_cancel = new DateTime($row['fecha_modificacion_cancelacion']);
            $fecha_mod_cancel = $fechaHora_mod_cancel->format('Y-m-d');
            $hora_mod_cancel = $fechaHora_mod_cancel->format('H:i');
        }

        echo "<tr>
            <td>{$row['id_reserva']}</td>
            <td>{$row['id_cliente']}</td>
            <td>{$row['id_mesa']}</td>
            <td>{$row['id_local']}</td>
            <td>{$fecha}</td>
            <td>{$hora}</td>
            <td>{$row['observaciones']}</td>
            <td>{$row['cant_personas']}</td>
            <td>{$row['id_estado_reserva']}</td>
            <td>" . ($fecha_mod_cancel ?? '') . "</td>
            <td>" . ($hora_mod_cancel ?? '') . "</td>
            <td>{$row['modificado_cancelado_por']}</td>
            <td>{$row['tipo_modificado_cancelado']}</td>
            <td>{$row['motivo_cancelacion']}</td>
            <td>{$row['cambio_mesa']}</td>
            <td>
                <form>
                    <input name='id_cliente' class='solo-numeros' maxlength='11' value='{$row['id_cliente']}' required>
                    <input name='id_mesa' class='solo-numeros' maxlength='11' value='{$row['id_mesa']}' required>
                    <input name='id_local' class='solo-numeros' maxlength='11' value='{$row['id_local']}' required>
                    <input name='fecha' type='date' value='{$fecha}' min='{$hoy}' required>
                    <select name='hora' required>";
                        // Opciones de horas fijas
                        $horas_fijas = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
                        foreach ($horas_fijas as $h_fija) {
                            $selected_hora = ($h_fija === $hora) ? 'selected' : '';
                            $valor_hora = $h_fija . ":00"; // agregar segundos para value
                            echo "<option value='$valor_hora' $selected_hora>$h_fija</option>";
                        }

                        echo "</select>                    
                                    <input name='observaciones' maxlength='255' value='{$row['observaciones']}' required>
                                    <select name='cant_personas' required>";
                        for ($i = 1; $i <= 8; $i++) {
                            $selected_cant = ((int)$row['cant_personas'] === $i) ? 'selected' : '';
                            echo "<option value='$i' $selected_cant>$i</option>";
                        }
                        echo "</select>
                                    <input name='id_estado_reserva' class='solo-numeros' maxlength='11' value='{$row['id_estado_reserva']}' required>
                                    <input name='fecha_mod_cancel' type='date' value='" . ($fecha_mod_cancel ?? '') . "' min='{$hoy}'>
                                    <select name='hora_mod_cancel'>";

                        // Horas cada 30 minutos para modif/cancel
                        for ($h = 0; $h < 24; $h++) {
                            for ($m = 0; $m < 60; $m += 30) {
                                $hora_valor = sprintf('%02d:%02d:00', $h, $m); // hh:mm:00
                                $hora_visible = sprintf('%02d:%02d', $h, $m);  // hh:mm
                                $selected = ($hora_valor === ($hora_mod_cancel . ':00')) ? 'selected' : '';
                                echo "<option value='$hora_valor' $selected>$hora_visible</option>";
                            }
                        }
                    echo "</select>
                    <input name='modificado_cancelado_por' class='solo-numeros' maxlength='11' value='{$row['modificado_cancelado_por']}'>
                    <select name='tipo_modificado_cancelado' value='{$row['tipo_modificado_cancelado']}'>
                        <option value='cliente' " . ($row['tipo_modificado_cancelado'] === 'cliente' ? 'selected' : '') . ">cliente</option>
                        <option value='empleado' " . ($row['tipo_modificado_cancelado'] === 'empleado' ? 'selected' : '') . ">empleado</option>
                    </select>
                    <input name='motivo_cancelacion' maxlength='255' value='{$row['motivo_cancelacion']}' >
                    <input name='cambio_mesa' class='solo-numeros' maxlength='11' value='{$row['cambio_mesa']}' >
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
        <input name='id_cliente' class='solo-numeros' maxlength='11' placeholder='id cliente' required>
        <input name='id_mesa' class='solo-numeros' maxlength='11' placeholder='id mesa' required>
        <input name='id_local' class='solo-numeros' maxlength='11' placeholder='id local' required>
        <input name='fecha' type='date' min='{$hoy}' required>
        <select name='hora' required>";
            // Opciones de horas fijas
            $horas_fijas = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
            foreach ($horas_fijas as $h_fija) {
                $selected_hora = ($h_fija === $hora) ? 'selected' : '';
                $valor_hora = $h_fija . ":00"; // agregar segundos para value
                echo "<option value='$valor_hora' $selected_hora>$h_fija</option>";
            }

            echo "</select>                    
                        <input name='observaciones' maxlength='255' placeholder='observaciones' required>
                        <select name='cant_personas' required>";
            for ($i = 1; $i <= 8; $i++) {
                $selected_cant = ((int)$row['cant_personas'] === $i) ? 'selected' : '';
                echo "<option value='$i' $selected_cant>$i</option>";
            }
            echo "</select>
                        <input name='id_estado_reserva' class='solo-numeros' maxlength='11' placeholder='id estado reserva' required>
                        <input name='fecha_mod_cancel' type='date' min='{$hoy}'>
                        <select name='hora_mod_cancel' ";

            // Horas cada 30 minutos para modif/cancel
            for ($h = 0; $h < 24; $h++) {
                for ($m = 0; $m < 60; $m += 30) {
                    $hora_valor = sprintf('%02d:%02d:00', $h, $m); // hh:mm:00
                    $hora_visible = sprintf('%02d:%02d', $h, $m);  // hh:mm
                    $selected = ($hora_valor === ($hora_mod_cancel . ':00')) ? 'selected' : '';
                    echo "<option value='$hora_valor' $selected>$hora_visible</option>";
                }
            }
        echo "</select>
        <input name='modificado_cancelado_por' class='solo-numeros' maxlength='11' placeholder='id cliente/empleado'>
        <select name='tipo_modificado_cancelado'>
            <option value='cliente'>cliente</option>
            <option value='empleado'>empleado</option>
        </select>
        <input name='motivo_cancelacion' maxlength='255' placeholder='motivo modif/cancel'>
        <input name='cambio_mesa' class='solo-numeros' maxlength='11' placeholder='id mesa del cambio'>
        <input type='submit' value='Agregar'>
    </form>";
}
?>