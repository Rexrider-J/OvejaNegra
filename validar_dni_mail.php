<?php
require_once("config_BDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Método no permitido.");
}

$tipo = $_POST['tipo'] ?? '';
$dni = $_POST['dni'] ?? '';
$mail = $_POST['mail'] ?? '';
$retornar_id = isset($_POST['retornar_id']) && $_POST['retornar_id'] === 'true';

if (empty($tipo) || empty($dni) || empty($mail)) {
    http_response_code(400);
    exit("Faltan datos.");
}

$tabla = ($tipo === "empleado") ? "empleados" : "clientes";
$columna_id = ($tipo === "empleado") ? "id_empleado" : "id_cliente";
$columna_mail = "mail"; // es igual para ambos

if (!in_array($tabla, ["empleados", "clientes"])) {
    http_response_code(400);
    exit("Tipo inválido.");
}

$stmt = $conexion->prepare("SELECT $columna_id FROM $tabla WHERE $columna_mail = ? AND dni = ?");
if (!$stmt) {
    http_response_code(500);
    exit("Error en la consulta: " . $conexion->error);
}

$stmt->bind_param("ss", $mail, $dni);
$stmt->execute();
$resultado = $stmt->get_result();

if ($fila = $resultado->fetch_assoc()) {
    if ($retornar_id) {
        echo json_encode([
            "estado" => "existe",
            "id" => $fila[$columna_id]
        ]);
    } else {
        echo json_encode(["estado" => "existe"]);
    }
} else {
    echo json_encode(["estado" => "no_existe"]);
}

$stmt->close();
$conexion->close();
?>
