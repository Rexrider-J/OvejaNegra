<?php
require_once("config_BDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Método no permitido.");
}

$tipo = $_POST['tipo'] ?? '';
$dni = $_POST['dni'] ?? '';
$mail = $_POST['mail'] ?? '';

if (empty($tipo) || empty($dni) || empty($mail)) {
    http_response_code(400);
    exit("Faltan datos.");
}

$tabla = ($tipo === "empleado") ? "empleados" : "clientes";

$stmt = $conexion->prepare("SELECT * FROM $tabla WHERE mail = ? AND dni = ?");
$stmt->bind_param("si", $mail, $dni);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "existe";
} else {
    echo "no_existe";
}

$stmt->close();
$conexion->close();
