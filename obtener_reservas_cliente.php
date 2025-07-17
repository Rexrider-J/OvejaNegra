<?php
header('Content-Type: application/json; charset=utf-8');

include("config_BDD.php");

if ($conexion->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit;
}

// Verificar que se reciba idCliente
if (!isset($_GET['idCliente']) || !is_numeric($_GET['idCliente'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Parámetro idCliente inválido o faltante']);
    exit;
}

$idCliente = intval($_GET['idCliente']);

// Consulta para traer las reservas del cliente con descripción de mesa y estado de reserva
$sql = "
    SELECT
    r.id_reserva,
    l.nombre AS nombre_local,
    l.id_local,
    r.fecha_reserva,
    r.observaciones,
    r.cant_personas,
    r.tipo_modificado_cancelado AS tipo_modificado,
    r.motivo_cancelacion,
    r.fecha_modificacion_cancelacion AS fecha_modificacion,
    m.id_mesa,
    m.descripcion AS descripcion_mesa,
    er.estados AS estado_reserva,
    CASE 
        WHEN r.tipo_modificado_cancelado = 'cliente' THEN cli.nombre
        WHEN r.tipo_modificado_cancelado = 'empleado' THEN emp.nombre
        ELSE NULL
    END AS modificado_nombre,
    CASE 
        WHEN r.tipo_modificado_cancelado = 'cliente' THEN cli.apellido
        WHEN r.tipo_modificado_cancelado = 'empleado' THEN emp.apellido
        ELSE NULL
    END AS modificado_apellido
FROM reservas r
INNER JOIN locales l ON r.id_local = l.id_local
INNER JOIN mesas m ON r.id_mesa = m.id_mesa
INNER JOIN estado_reserva er ON r.id_estado_reserva = er.id_estado_reserva
LEFT JOIN clientes cli ON r.tipo_modificado_cancelado = 'cliente' AND r.modificado_cancelado_por = cli.id_cliente
LEFT JOIN empleados emp ON r.tipo_modificado_cancelado = 'empleado' AND r.modificado_cancelado_por = emp.id_empleado
WHERE r.id_cliente = ?
ORDER BY r.fecha_reserva DESC

";

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la preparación de la consulta']);
    exit;
}

$stmt->bind_param('i', $idCliente);
$stmt->execute();

$result = $stmt->get_result();

$reservas = [];

while ($row = $result->fetch_assoc()) {
$reservas[] = [
    'id' => $row['id_reserva'],
    'id_local' => (int)$row['id_local'],
    'nombre_local' => $row['nombre_local'],
    'fecha_reserva' => $row['fecha_reserva'],
    'observaciones' => $row['observaciones'],
    'cant_personas' => (int)$row['cant_personas'],
    'tipo_modificado' => $row['tipo_modificado'],
    'motivo_cancelacion' => $row['motivo_cancelacion'],
    'fecha_modificacion' => $row['fecha_modificacion'],
    'id_mesa' => $row['id_mesa'],
    'descripcion_mesa' => $row['descripcion_mesa'],
    'estado_reserva' => $row['estado_reserva'],
    'modificado_nombre' => $row['modificado_nombre'],
    'modificado_apellido' => $row['modificado_apellido']
];
}

echo json_encode($reservas);

$stmt->close();
$conexion->close();
