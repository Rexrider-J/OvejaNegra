<?php
include("config_BDD.php");

$tabla = $_POST['tabla'] ?? '';
$accion = $_POST['accion'] ?? '';
$id = $_POST['id'] ?? null;

switch ($accion) {
  case 'agregar':
    agregarRegistro($conexion, $tabla);
    break;
  case 'modificar':
    modificarRegistro($conexion, $tabla, $id);
    break;
  case 'borrar':
    eliminarRegistro($conexion, $tabla, $id);
    break;
  default:
    echo "Acción inválida.";
    break;
}
/*Función para validar que existan dni duplicados si cuentan con distinto mail y no permite mail duplicados*/
function validarEmpleado($conexion, $id = null) {
  $dni = $_POST['dni'];
  $mail = $_POST['mail'];
  $puesto = $_POST['puesto'];
  $id_local = $_POST['id_local'];

  // Validar mail único (excepto para el mismo ID si es modificación)
  $queryMail = "SELECT id_empleado FROM empleados WHERE mail = ?";
  if ($id !== null) {
    $queryMail .= " AND id_empleado != ?";
    $stmt = $conexion->prepare($queryMail);
    $stmt->bind_param("si", $mail, $id);
  } else {
    $stmt = $conexion->prepare($queryMail);
    $stmt->bind_param("s", $mail);
  }
  $stmt->execute();
  $stmt->store_result();
  if ($stmt->num_rows > 0) {
    return "Ya existe un empleado con ese mail.";
  }

  // Validar combinación DNI + mail única (excepto mismo ID si se modifica)
  $queryDniMail = "SELECT id_empleado FROM empleados WHERE dni = ? AND mail = ?";
  if ($id !== null) {
    $queryDniMail .= " AND id_empleado != ?";
    $stmt = $conexion->prepare($queryDniMail);
    $stmt->bind_param("isi", $dni, $mail, $id);
  } else {
    $stmt = $conexion->prepare($queryDniMail);
    $stmt->bind_param("is", $dni, $mail);
  }
  $stmt->execute();
  $stmt->store_result();
  if ($stmt->num_rows > 0) {
    return "Ya existe un empleado con ese DNI y mail.";
  }

  // Validar solo un gerente por local
  if (strtolower($puesto) === 'gerente') {
    $queryGerente = "SELECT id_empleado FROM empleados WHERE puesto = 'Gerente' AND id_local = ?";
    if ($id !== null) {
      $queryGerente .= " AND id_empleado != ?";
      $stmt = $conexion->prepare($queryGerente);
      $stmt->bind_param("ii", $id_local, $id);
    } else {
      $stmt = $conexion->prepare($queryGerente);
      $stmt->bind_param("i", $id_local);
    }
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
      return "Ya existe un gerente en ese local.";
    }
  }

  return true;
}
/*Función reutilizable para validar existencia en tablas*/
function existeEnTabla($conexion, $tabla, $columna, $valor) {
  $stmt = $conexion->prepare("SELECT 1 FROM $tabla WHERE $columna = ? LIMIT 1");
  $stmt->bind_param("i", $valor);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->num_rows > 0;
}

function agregarRegistro($conexion, $tabla)
{
  switch ($tabla) {
    case 'clientes':
      $stmt = $conexion->prepare("INSERT INTO clientes (nombre, apellido, dni, mail, telefono, fecha_nacimiento, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssissss", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['telefono'], $_POST['fecha_nacimiento'], $_POST['contrasena']);
      break;
    case 'empleados':
      $validacion = validarEmpleado($conexion);
      if ($validacion !== true) {
        echo $validacion;
        return;
      }
      $stmt = $conexion->prepare("INSERT INTO empleados (nombre, apellido, dni, mail, puesto, id_local, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssissis", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['puesto'], $_POST['id_local'], $_POST['contrasena']);
      break;
    case 'menu':
      $stmt = $conexion->prepare("INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES (?, ?, ?, ?, ?)");
      $stmt->bind_param("sdsss", $_POST['nombre'], $_POST['precio'], $_POST['categoria'], $_POST['descripcion'], $_POST['ruta_imagen']);
      break;
    case 'locales':
      $stmt = $conexion->prepare("INSERT INTO locales (nombre, direccion, telefono, estado_disponibilidad) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("ssss", $_POST['nombre'], $_POST['direccion'], $_POST['telefono'], $_POST['estado_disponibilidad']);
      break;
    case 'local_menu':
      /*Validar que los IDs existan antes de insertar*/
      $id_menu = $_POST['id_menu'];
      $id_local = $_POST['id_local'];
      /*Validaciones*/
      if (!existeEnTabla($conexion, 'menu', 'id_menu', $id_menu)) {
        echo "❌ El ID del menú ($id_menu) no existe.";
        exit;
      }
      if (!existeEnTabla($conexion, 'locales', 'id_local', $id_local)) {
        echo "❌ El ID del local ($id_local) no existe.";
        exit;
      }
      /*Si pasa la validación, se prepara el insert*/
      $stmt = $conexion->prepare("INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES (?, ?, ?)");
      $stmt->bind_param("iis", $id_menu, $id_local, $_POST['estado_disponibilidad']);
      break;
    case 'mesas':
      $stmt = $conexion->prepare("INSERT INTO mesas (id_local, descripcion, cupo_maximo, estado) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("isis", $_POST['id_local'], $_POST['descripcion'], $_POST['cupo_maximo'], $_POST['estado']);
      break;
    case 'estado_reserva':
      $stmt = $conexion->prepare("INSERT INTO estado_reserva (estados) VALUES (?)");
      $stmt->bind_param("s", $_POST['estados']);
      break;
    case 'empleado_funcion':
      $stmt = $conexion->prepare("INSERT INTO empleado_funcion (dia_hora, funcion, id_empleado) VALUES (?, ?, ?)");
      $stmt->bind_param("ssi", $_POST['dia_hora'], $_POST['funcion'], $_POST['id_empleado']);
      break;
    case 'reservas':
      $stmt = $conexion->prepare("INSERT INTO reservas (id_cliente, id_mesa, fecha_reserva, observaciones, cant_personas, id_estado_reserva) VALUES (?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("iissii", $_POST['id_cliente'], $_POST['id_mesa'], $_POST['fecha_reserva'], $_POST['observaciones'], $_POST['cant_personas'], $_POST['id_estado_reserva']);
      break;
    default:
      echo "Tabla no soportada.";
      return;
  }
  if ($stmt->execute()) {
    echo "✅Registro agregado correctamente.";
  } else {
    echo "Error al agregar: " . $conexion->error;
  }
  $stmt->close();
}

function modificarRegistro($conexion, $tabla, $id)
{
  switch ($tabla) {
    case 'clientes':
      $campos = "nombre=?, apellido=?, dni=?, mail=?, telefono=?, fecha_nacimiento=?";
      $tipos = "ssisss";
      $valores = [$_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['telefono'], $_POST['fecha_nacimiento']];

      if (!empty($_POST['contrasena'])) {
        $campos .= ", contrasena=?";
        $tipos .= "s";
        $valores[] = $_POST['contrasena'];
      }

      $sql = "UPDATE clientes SET $campos WHERE id_cliente=?";
      $tipos .= "i";
      $valores[] = $id;
      break;
    case 'empleados':
      $validacion = validarEmpleado($conexion, $id);
      if ($validacion !== true) {
        echo $validacion;
        return;
      }

      $campos = "nombre=?, apellido=?, dni=?, mail=?, puesto=?, id_local=?";
      $tipos = "ssissi";
      $valores = [$_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['puesto'], $_POST['id_local']];

      if (!empty($_POST['contrasena'])) {
        $campos .= ", contrasena=?";
        $tipos .= "s";
        $valores[] = $_POST['contrasena'];
      }

      $sql = "UPDATE empleados SET $campos WHERE id_empleado=?";
      $tipos .= "i";
      $valores[] = $id;
      break;
    case 'menu':
      $sql = "UPDATE menu SET nombre=?, precio=?, categoria=?, descripcion=?, ruta_imagen=? WHERE id_menu=?";
      $tipos = "sdsssi";
      $valores = [$_POST['nombre'], $_POST['precio'], $_POST['categoria'], $_POST['descripcion'], $_POST['ruta_imagen'], $id];
      break;
    case 'locales':
      $sql = "UPDATE locales SET nombre=?, direccion=?, telefono=?, estado_disponibilidad=? WHERE id_local=?";
      $tipos = "ssssi";
      $valores = [$_POST['nombre'], $_POST['direccion'], $_POST['telefono'], $_POST['estado_disponibilidad'], $id];
      break;
    case 'local_menu':
      $id_menu = $_POST['id_menu'];
      $id_local = $_POST['id_local'];

      // Validar que los IDs existan antes de modificar
      if (!existeEnTabla($conexion, 'menu', 'id_menu', $id_menu)) {
        echo "❌ El ID del menú ($id_menu) no existe.";
        exit;
      }

      if (!existeEnTabla($conexion, 'locales', 'id_local', $id_local)) {
        echo "❌ El ID del local ($id_local) no existe.";
        exit;
      }

      // Si pasa validación, actualizar
      $sql = "UPDATE local_menu SET id_menu=?, id_local=?, estado_disponibilidad=? WHERE id_local_menu=?";
      $tipos = "iisi";
      $valores = [$id_menu, $id_local, $_POST['estado_disponibilidad'], $id];
      break;
    case 'mesas':
      $sql = "UPDATE mesas SET id_local=?, descripcion=?, cupo_maximo=?, estado=? WHERE id_mesa=?";
      $tipos = "isisi";
      $valores = [$_POST['id_local'], $_POST['descripcion'], $_POST['cupo_maximo'], $_POST['estado'], $id];
      break;
    case 'estado_reserva':
      $sql = "UPDATE estado_reserva SET estados=? WHERE id_estado_reserva=?";
      $tipos = "si";
      $valores = [$_POST['estados'], $id];
      break;
    case 'empleado_funcion':
      $sql = "UPDATE empleado_funcion SET dia_hora=?, funcion=?, id_empleado=? WHERE id_empleado_funcion=?";
      $tipos = "ssii";
      $valores = [$_POST['dia_hora'], $_POST['funcion'], $_POST['id_empleado'], $id];
      break;
    case 'reservas':
      $sql = "UPDATE reservas SET id_cliente=?, id_mesa=?, fecha_reserva=?, observaciones=?, cant_personas=?, id_estado_reserva=? WHERE id_reserva=?";
      $tipos = "iissiii";
      $valores = [$_POST['id_cliente'], $_POST['id_mesa'], $_POST['fecha_reserva'], $_POST['observaciones'], $_POST['cant_personas'], $_POST['id_estado_reserva'], $id];
      break;
    default:
      echo "Tabla no soportada.";
      return;
  }
  
  $stmt = $conexion->prepare($sql);
  $stmt->bind_param($tipos, ...$valores);

  if ($stmt->execute()) {
    echo "✅Registro modificado correctamente.";
  } else {
    echo "Error al modificar: " . $conexion->error;
  }

  $stmt->close();
}

function eliminarRegistro($conexion, $tabla, $id)
{
  $id_col = match ($tabla) {
    'clientes' => 'id_cliente',
    'empleados' => 'id_empleado',
    'menu' => 'id_menu',
    'locales' => 'id_local',
    'local_menu' => 'id_local_menu',
    'mesas' => 'id_mesa',
    'estado_reserva' => 'id_estado_reserva',
    'empleado_funcion' => 'id_empleado_funcion',
    'reservas' => 'id_reserva',
    default => null
  };

  if (!$id_col) {
    echo "Tabla no soportada.";
    return;
  }

  $stmt = $conexion->prepare("DELETE FROM $tabla WHERE $id_col = ?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
    echo "✅Registro eliminado correctamente.";
  } else {
    echo "Error al eliminar: " . $conexion->error;
  }

  $stmt->close();
}
