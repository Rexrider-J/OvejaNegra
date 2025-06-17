<?php
require_once("config_BDD.php"); // Incluye la conexión ($conexion)

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($conexion) || $conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    $id_empleado = $_POST['id_empleado'];
    $campo = $_POST['campo'];
    $valor = $_POST['valor'];

    // Lista de campos válidos para evitar inyecciones
    $campos_validos = ['nombreEmpleado', 'apellidoEmpleado', 'dniEmpleado', 'emailEmpleado', 'contrasenaEmpleado'];

    if (in_array($campo, $campos_validos)) {
        // Mapeo frontend → nombre real en la base de datos
        $mapa = [
            'nombreEmpleado' => 'nombre',
            'apellidoEmpleado' => 'apellido',
            'dniEmpleado' => 'dni',
            'emailEmpleado' => 'email',
            'contrasenaEmpleado' => 'contrasena'
        ];

        $campo_bd = $mapa[$campo];

        $stmt = $conexion->prepare("UPDATE empleados SET $campo_bd = ? WHERE id_empleado = ?");
        if ($stmt === false) {
            die("Error en la preparación: " . $conexion->error);
        }

        $stmt->bind_param("si", $valor, $id_empleado);

        if ($stmt->execute()) {
            echo "Actualización exitosa";
        } else {
            echo "Error al actualizar: " . $stmt->error;
        }

        $stmt->close();
        if (isset($conexion) && $conexion instanceof mysqli) {
            $conexion->close();
        }

    } else {
        echo "Campo inválido.";
    }
} else {
    echo "Método inválido.";
}
?>