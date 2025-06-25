<?php
include("config_BDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST" || !isset($_GET['id'])) {
    http_response_code(400);
    echo "❌ Parámetros inválidos.";
    exit;
}

$id = intval($_GET['id']);
$id_estado_cancelado = 2; // Estado "cancelada"

$stmt = $conexion->prepare("UPDATE reservas SET id_estado_reserva = ? WHERE id_reserva = ?");
$stmt->bind_param("ii", $id_estado_cancelado, $id);

if ($stmt->execute()) {
    echo "✅ Reserva cancelada.";
} else {
    echo "❌ Error al cancelar la reserva: " . $conexion->error;
}

$stmt->close();
$conexion->close();