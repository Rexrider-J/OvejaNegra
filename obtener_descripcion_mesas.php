<?php
include("config_BDD.php");

// Siempre indicamos que devolveremos JSON
header('Content-Type: application/json');

// Obtener y validar el valor recibido como ID de la mesa
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "ID no válido"]);
    exit;
}

// Consulta preparada
$sql = "SELECT descripcion FROM mesas WHERE id_mesa = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la preparación de la consulta"]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();

if ($fila = $resultado->fetch_assoc()) {
    echo json_encode(["descripcion" => $fila['descripcion']]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Mesa no encontrada"]);
}

$stmt->close();
$conexion->close();
?>