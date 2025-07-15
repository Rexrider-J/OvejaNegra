<?php
include("config_BDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  exit("Acceso no permitido.");
}

$idEmpleado = $_POST['id_empleado'] ?? null;
$idLocal = $_POST['id_local'] ?? null;
$fecha = $_POST['fecha'] ?? null;
$hora = $_POST['hora'] ?? null;
$motivo = trim($_POST['motivo_cancelacion'] ?? '');

if (!$idEmpleado || !$idLocal || !$fecha || !$motivo || !$hora) {
  exit("Faltan datos para cancelar reservas.");
}

// Verificar puesto y local del empleado
$sqlEmpleado = "SELECT puesto, id_local FROM empleados WHERE id_empleado = ?";
$stmt = $conexion->prepare($sqlEmpleado);
$stmt->bind_param("i", $idEmpleado);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  exit("Empleado no válido.");
}

$empleado = $result->fetch_assoc();
$puesto = strtolower($empleado['puesto']);
$localEmpleado = $empleado['id_local'];

// Verificar permiso
if ($puesto !== "gerente" && $puesto !== "subgerente") {
  exit("❌ No tenés permiso para esta acción.");
}

if ($puesto === "subgerente" && $localEmpleado != $idLocal) {
  exit("❌ Los subgerentes solo pueden cancelar reservas de su propio local.");
}

// Cancelación masiva por fecha y hora
$sql = "
  UPDATE reservas
  SET id_estado_reserva = 2,
      fecha_modificacion_cancelacion = NOW(),
      motivo_cancelacion = ?,
      tipo_modificado_cancelado = 'empleado',
      modificado_cancelado_por = ?
  WHERE id_local = ?
    AND DATE(fecha_reserva) = ?
    AND TIME(fecha_reserva) = ?
    AND id_estado_reserva != 2
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("siiss", $motivo, $idEmpleado, $idLocal, $fecha, $hora);

if ($stmt->execute()) {
  $afectadas = $stmt->affected_rows;
  echo "✅ Se cancelaron $afectadas reservas del local y hora seleccionados.";
} else {
  echo "❌ Error al realizar la cancelación masiva: " . $conexion->error;
}

$stmt->close();
$conexion->close();
?>
