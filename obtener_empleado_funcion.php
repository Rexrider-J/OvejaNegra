<?php
/*Inicia la sesión para acceder a datos de sesión si fueran necesarios*/
session_start();

/*Incluye el archivo que contiene la configuración y conexión a la base de datos*/
require_once("config_BDD.php");
function responderError($codigo, $mensaje) {
    http_response_code($codigo);
    header('Content-Type: application/json');
    echo json_encode(["error" => $mensaje]);
    exit;
}
/*Verifica si la variable $conexion está definida y no es nula*/
if (!isset($conexion) || $conexion === null) {
    /*Si no hay conexión, responde con código 500 (error interno del servidor) y termina*/
    responderError(500, "Error de conexión con la base de datos.");
}

/*Asegura que el método usado para acceder a este archivo sea POST*/
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    /*Si se intenta acceder con GET u otro método, responde con código 405 (método no permitido)*/
    responderError(405, "Método no permitido.");
}

/*Verifica que se haya recibido el parámetro 'id_empleado' por POST*/
if (!isset($_POST['id_empleado'])) {
    /*Si no se recibe, responde con código 400 (mala solicitud)*/
    responderError(400, "Falta ID del empleado.");
}

/*Convierte el id recibido a entero para evitar inyecciones SQL*/
$idEmpleado = intval($_POST['id_empleado']);

/*Prepara la consulta SQL para obtener funciones del empleado*/
$query = "SELECT dia_hora, funcion FROM empleado_funcion WHERE id_empleado = ?";
$stmt = $conexion->prepare($query);

/*Asocia el valor de $idEmpleado a la consulta (como parámetro seguro)*/
$stmt->bind_param("i", $idEmpleado); /*"i" indica que es un valor entero*/

/*Ejecuta la consulta*/
if (!$stmt->execute()) {
    responderError(500, "Error en la consulta.");
}

/*Obtiene los resultados en forma de arreglo asociativo*/
$result = $stmt->get_result();
$funciones = [];

/*Recorre cada fila del resultado y la agrega al array $funciones*/
while ($row = $result->fetch_assoc()) {
    $funciones[] = $row; /*$row es un array como: ['dia_hora' => '2025-05-01 18:00:00', 'funcion' => 'Mozo']*/
}

/*Establece el tipo de contenido de la respuesta como JSON*/
header('Content-Type: application/json');

/*Devuelve el array como JSON*/
echo json_encode($funciones);
?>