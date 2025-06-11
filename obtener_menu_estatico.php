<?php
include("config_BDD.php");

$categoria = isset($_GET['categoria']) ? strtolower(trim($_GET['categoria'])) : '';
$categoria = $conexion->real_escape_string($categoria);

$sql = "SELECT nombre, precio, descripcion, ruta_imagen FROM menu WHERE LOWER(categoria) = '$categoria'";
$result = $conexion->query($sql);

if ($result && $result->num_rows > 0) {
    while ($item = $result->fetch_assoc()) {
        echo "<figure>";
        echo "<img src='" . htmlspecialchars($item['ruta_imagen']) . "' alt='foto " . htmlspecialchars($item['nombre']) . "'>";
        echo "<figcaption>" . htmlspecialchars($item['nombre']) . "</figcaption>";
        echo "<figcaption>$" . number_format($item['precio'], 0, ',', '.') . "</figcaption>";
        if (!empty($item['descripcion'])) {
            echo "<figcaption>" . htmlspecialchars($item['descripcion']) . "</figcaption>";
        }
        echo "</figure>";
    }
} else {
    echo "<p>No hay productos en esta categoría.</p>";
}

$conexion->close();
