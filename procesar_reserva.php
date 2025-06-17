<?php
include("config_BDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  exit("Acceso no permitido.");
}

// Obtener y validar datos
$id_cliente = $_POST['id_cliente'] ?? null; // Lo ideal es obtener esto desde la sesión de login
$id_local = intval($_POST['sucursal'] ?? 0);
$id_mesa = intval($_POST['mesa'] ?? 0);
$fecha = $_POST['fecha'] ?? null;
$hora = $_POST['hora'] ?? null;
$cant_personas = intval($_POST['cantidad'] ?? 0);
$observaciones = trim($_POST['observaciones'] ?? "");

if (!$id_cliente || !$id_local || !$id_mesa || !$fecha || !$hora || !$cant_personas) {
  exit("Faltan datos para procesar la reserva.");
}

$fecha_reserva = "$fecha $hora";
$id_estado_reserva = 1; // 1 = confirmada (o ajustalo según tus estados)

// Validar que la mesa esté habilitada y disponible en ese horario
$sql = "
SELECT * FROM mesas 
WHERE id_mesa = ? AND id_local = ? AND estado = 'habilitada' 
  AND cupo_maximo >= ? 
  AND id_mesa NOT IN (
    SELECT id_mesa FROM reservas WHERE fecha_reserva = ? AND id_estado_reserva IN (1, 2)
)
LIMIT 1";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("iiis", $id_mesa, $id_local, $cant_personas, $fecha_reserva);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
  exit("❌ La mesa seleccionada ya está reservada o no es válida para esa cantidad.");
}

// Insertar reserva
$stmt = $conexion->prepare("INSERT INTO reservas (id_cliente, id_mesa, fecha_reserva, observaciones, cant_personas, id_estado_reserva) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iissii", $id_cliente, $id_mesa, $fecha_reserva, $observaciones, $cant_personas, $id_estado_reserva);

if ($stmt->execute()) {
  echo "✅ Reserva realizada con éxito.";
} else {
  echo "❌ Error al registrar la reserva: " . $conexion->error;
}

$stmt->close();
$conexion->close();
