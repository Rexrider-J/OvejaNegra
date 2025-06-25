<?php
include("config_BDD.php");

$id_reserva = $_POST['id_reserva'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$mesa = $_POST['mesa'];
$cantidad = $_POST['cantidad'];
$observaciones = $_POST['observaciones'];
$modificado_por = $_POST['modificado_por'];
$tipo_modificacion = $_POST['tipo']; // cliente / empleado / administrador

$datetime = "$fecha $hora";

$sql = "UPDATE reservas 
        SET fecha_reserva = ?, 
            id_mesa = ?, 
            cant_personas = ?, 
            observaciones = ?, 
            modificado_cancelado_por = ?, 
            tipo_modificado_cancelado = ?, 
            fecha_modificacion_cancelacion = NOW()
        WHERE id_reserva = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("siisisi", $datetime, $mesa, $cantidad, $observaciones, $modificado_por, $tipo_modificacion, $id_reserva);

if ($stmt->execute()) {
  echo "✅ Reserva actualizada correctamente";
} else {
  echo "❌ Error al actualizar la reserva: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>