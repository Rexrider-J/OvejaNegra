<?php
include("config_BDD.php");

$sql = "SELECT * FROM locales";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    while ($local = $resultado->fetch_assoc()) {
        echo "id_local={$local['id_local']};";
        echo "nombre={$local['nombre']};";
        echo "direccion={$local['direccion']};";
        echo "telefono={$local['telefono']};";
        echo "estado={$local['estado_disponibilidad']}\n";
    }
} else {
    echo "sin_datos";
}

$conexion->close();
?>