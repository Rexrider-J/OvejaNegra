<?php
include("config_BDD.php");

// Verificamos los parámetros
if (!isset($_GET['categoria']) || !isset($_GET['id_sucursal'])) {
    echo "<p style='color:red'>Faltan parámetros.</p>";
    exit;
}

$categoria = $_GET['categoria'];
$id_sucursal = intval($_GET['id_sucursal']);

$sql = "
SELECT m.*
FROM menu m
JOIN local_menu lm ON m.id_menu = lm.id_menu
WHERE lm.id_local = ? AND lm.estado_disponibilidad = 'disponible' AND m.categoria = ?
ORDER BY m.nombre
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("is", $id_sucursal, $categoria);
$stmt->execute();
$result = $stmt->get_result();


$itemsHTML = "";

while ($row = $result->fetch_assoc()) {
    $itemsHTML .= "
        <figure>
            <img src='" . htmlspecialchars($row['ruta_imagen']) . "' alt='foto " . htmlspecialchars($row['nombre']) . "'>
            <figcaption>
                <strong>" . htmlspecialchars($row['nombre']) . "</strong><br>
                $" . number_format($row['precio'], 0, ',', '.') . "<br>
                " . htmlspecialchars($row['descripcion']) . "
            </figcaption>
        </figure>
    ";
}

if ($itemsHTML) {
    echo $itemsHTML;
}else{
    echo "<p style='color: orange'>No se encontraron productos para la categoría '$categoria' en la sucursal $id_sucursal.</p>";
}

$stmt->close();
$conexion->close();
