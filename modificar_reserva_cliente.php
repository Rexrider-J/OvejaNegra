<?php
include("config_BDD.php");

// Loguear todo lo que llega por POST
error_log("POST recibido en modificar_reserva_cliente.php: " . print_r($_POST, true));

$id_reserva = $_POST['id_reserva'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$cantidad = intval($_POST['cantidad']);
$observaciones = $_POST['observaciones'];
$modificado_por = intval($_POST['modificado_por']);
$motivo_cancelacion = $_POST['motivo_cancelacion'] ?? '';
$tipo_modificado_cancelado = "cliente";
$datetime = "$fecha $hora";
$id_local = intval($_POST['id_local']);

// Log valor de mesa recibido
error_log("Valor 'mesa' recibido: " . (isset($_POST['mesa']) ? $_POST['mesa'] : 'no enviado'));

// Si no hay mesa nueva, obtener la actual para mantenerla
if (isset($_POST['mesa'])) {
    $mesa_cambio = intval($_POST['mesa']);
} else {
    $sql = "SELECT id_mesa FROM reservas WHERE id_reserva = ?";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        error_log("Error preparando SELECT mesa: " . $conexion->error);
        exit("❌ Error en la consulta");
    }
    $stmt->bind_param("i", $id_reserva);
    $stmt->execute();
    $stmt->bind_result($mesa_cambio);
    $stmt->fetch();
    $stmt->close();
    error_log("Mesa actual obtenida de la DB: $mesa_cambio");
}

$sql = "UPDATE reservas 
        SET fecha_reserva = ?, 
            id_mesa = ?, 
            id_local = ?, 
            cant_personas = ?, 
            observaciones = ?, 
            modificado_cancelado_por = ?, 
            tipo_modificado_cancelado = ?, 
            motivo_cancelacion = ?, 
            fecha_modificacion_cancelacion = NOW()
        WHERE id_reserva = ?";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    error_log("Error preparando UPDATE reserva: " . $conexion->error);
    exit("❌ Error en la consulta de actualización");
}

// Bind params: s - string, i - int
$stmt->bind_param(
    "siisssssi",
    $datetime,
    $mesa_cambio,
    $id_local,
    $cantidad,
    $observaciones,
    $modificado_por,
    $tipo_modificado_cancelado,
    $motivo_cancelacion,
    $id_reserva
);

// Ejecutar y loguear resultado
if ($stmt->execute()) {
    error_log("Reserva $id_reserva actualizada correctamente.");
    echo "✅ Reserva actualizada correctamente";
} else {
    error_log("Error al actualizar reserva $id_reserva: " . $stmt->error);
    echo "❌ Error al actualizar la reserva: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
