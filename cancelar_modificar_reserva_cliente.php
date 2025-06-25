<?php
include("config_BDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  exit("Acceso no permitido.");
}

$id_reserva = $_POST['id_reserva'] ?? null;
$id_cliente = $_POST['id_cliente'] ?? null;
$tipo = $_POST['tipo'] ?? null;

if (!$id_reserva || !$id_cliente || !$tipo) {
  exit("Faltan datos para cancelar la reserva.");
}

$sql = "
  UPDATE reservas 
  SET id_estado_reserva = 2, 
      modificado_cancelado_por = ?, 
      tipo_modificado_cancelado = ?
  WHERE id_reserva = ?
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("isi", $id_cliente, $tipo, $id_reserva);

if ($stmt->execute()) {
  echo "✅ Reserva cancelada correctamente.";
} else {
  echo "❌ Error al cancelar la reserva: " . $conexion->error;
}

$stmt->close();
$conexion->close();