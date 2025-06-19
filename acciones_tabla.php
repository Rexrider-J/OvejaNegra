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

function agregarRegistro($conexion, $tabla)
{
  switch ($tabla) {
    case 'clientes':
      $stmt = $conexion->prepare("INSERT INTO clientes (nombre, apellido, dni, mail, telefono, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssisss", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['telefono'], $_POST['fecha_nacimiento']);
      break;
    case 'empleados':
      $stmt = $conexion->prepare("INSERT INTO empleados (nombre, apellido, dni, mail, puesto, id_local) VALUES (?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssissi", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['puesto'], $_POST['id_local']);
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
      $stmt = $conexion->prepare("INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES (?, ?, ?)");
      $stmt->bind_param("iis", $_POST['id_menu'], $_POST['id_local'], $_POST['estado_disponibilidad']);
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
    echo "Registro agregado correctamente.";
  } else {
    echo "Error al agregar: " . $conexion->error;
  }
  $stmt->close();
}

function modificarRegistro($conexion, $tabla, $id)
{
  switch ($tabla) {
    case 'clientes':
      $stmt = $conexion->prepare("UPDATE clientes SET nombre=?, apellido=?, dni=?, mail=?, telefono=?, fecha_nacimiento=? WHERE id_cliente=?");
      $stmt->bind_param("ssisssi", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['telefono'], $_POST['fecha_nacimiento'], $id);
      break;
    case 'empleados':
      $stmt = $conexion->prepare("UPDATE empleados SET nombre=?, apellido=?, dni=?, mail=?, puesto=?, id_local=? WHERE id_empleado=?");
      $stmt->bind_param("ssissii", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['puesto'], $_POST['id_local'], $id);
      break;
    case 'menu':
      $stmt = $conexion->prepare("UPDATE menu SET nombre=?, precio=?, categoria=?, descripcion=?, ruta_imagen=? WHERE id_menu=?");
      $stmt->bind_param("sdsssi", $_POST['nombre'], $_POST['precio'], $_POST['categoria'], $_POST['descripcion'], $_POST['ruta_imagen'], $id);
      break;
    case 'locales':
      $stmt = $conexion->prepare("UPDATE locales SET nombre=?, direccion=?, telefono=?, estado_disponibilidad=? WHERE id_local=?");
      $stmt->bind_param("ssssi", $_POST['nombre'], $_POST['direccion'], $_POST['telefono'], $_POST['estado_disponibilidad'], $id);
      break;
    case 'local_menu':
      $stmt = $conexion->prepare("UPDATE local_menu SET id_menu=?, id_local=?, estado_disponibilidad=? WHERE id_local_menu=?");
      $stmt->bind_param("iisi", $_POST['id_menu'], $_POST['id_local'], $_POST['estado_disponibilidad'], $id);
      break;
    case 'mesas':
      $stmt = $conexion->prepare("UPDATE mesas SET id_local=?, descripcion=?, cupo_maximo=?, estado=? WHERE id_mesa=?");
      $stmt->bind_param("isisi", $_POST['id_local'], $_POST['descripcion'], $_POST['cupo_maximo'], $_POST['estado'], $id);
      break;
    case 'estado_reserva':
      $stmt = $conexion->prepare("UPDATE estado_reserva SET estados=? WHERE id_estado_reserva=?");
      $stmt->bind_param("si", $_POST['estados'], $id);
      break;
    case 'empleado_funcion':
      $stmt = $conexion->prepare("UPDATE empleado_funcion SET dia_hora=?, funcion=?, id_empleado=? WHERE id_empleado_funcion=?");
      $stmt->bind_param("ssii", $_POST['dia_hora'], $_POST['funcion'], $_POST['id_empleado'], $id);
      break;
    case 'reservas':
      $stmt = $conexion->prepare("UPDATE reservas SET id_cliente=?, id_mesa=?, fecha_reserva=?, observaciones=?, cant_personas=?, id_estado_reserva=? WHERE id_reserva=?");
      $stmt->bind_param("iissiii", $_POST['id_cliente'], $_POST['id_mesa'], $_POST['fecha_reserva'], $_POST['observaciones'], $_POST['cant_personas'], $_POST['id_estado_reserva'], $id);
      break;
    default:
      echo "Tabla no soportada.";
      return;
  }
  if ($stmt->execute()) {
    echo "Registro modificado correctamente.";
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
    echo "Registro eliminado correctamente.";
  } else {
    echo "Error al eliminar: " . $conexion->error;
  }

  $stmt->close();
}
