<?php
include("config_BDD.php");

$id_local = intval($_GET['id_local']);
$fecha = $_GET['fecha']; // formato YYYY-MM-DD
$hora = $_GET['hora'];   // formato HH:MM:SS
$personas = intval($_GET['personas']);

if (!$id_local || !$fecha || !$hora || !$personas) {
  echo "<option value=''>Faltan datos</option>";
  exit;
}

$datetime = "$fecha $hora";

// Filtra mesas que:
$sql = "
SELECT m.id_mesa, m.descripcion
FROM mesas m
WHERE m.id_local = ?
  AND m.estado = 'habilitada'
  AND m.cupo_maximo >= ?
  AND m.id_mesa NOT IN (
    SELECT r.id_mesa
    FROM reservas r
    WHERE r.fecha_reserva = ?
      AND r.id_estado_reserva IN (1, 2) -- activa o pendiente
)
ORDER BY m.id_mesa
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("iis", $id_local, $personas, $datetime);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo "<option value=''>No hay mesas disponibles</option>";
} else {
  echo "<option value=''>Seleccione una mesa</option>";
  while ($row = $result->fetch_assoc()) {
    echo "<option value='{$row['id_mesa']}'>Mesa {$row['id_mesa']} - {$row['descripcion']}</option>";
  }
}

$stmt->close();
$conexion->close();
