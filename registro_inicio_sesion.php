<?php
session_start();
require_once("config_BDD.php");

if (!isset($conexion) || $conexion === null) {
    die("Error de conexión con la base de datos.");
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("Método no permitido.");
}

if (!isset($_POST['accion'])) {
    http_response_code(400);
    die("Falta acción.");
}

$accion = $_POST['accion'];

if ($accion === 'registro') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $dni = $_POST['dni'];
    $fecha_nac = $_POST['fecha_nacimiento'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $contrasena = $_POST['contrasenia'];

    if (empty($nombre) || empty($apellido) || empty($dni) || empty($fecha_nac) || empty($telefono) || empty($email) || empty($contrasena)) {
        echo "❗ Todos los campos son obligatorios.";
        exit;
    }

    // Verificar email duplicado
    $verificar_email = $conexion->prepare("SELECT id_cliente FROM clientes WHERE mail = ?");
    $verificar_email->bind_param("s", $email);
    $verificar_email->execute();
    $verificar_email->store_result();
    if ($verificar_email->num_rows > 0) {
        echo "❌ Ya existe un usuario registrado con este correo.";
        $verificar_email->close();
        exit;
    }
    $verificar_email->close();

    $stmt = $conexion->prepare("INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, telefono, mail, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissss", $nombre, $apellido, $dni, $fecha_nac, $telefono, $email, $contrasena);

    try {
        if ($stmt->execute()) {
            echo "✅ ¡Registro exitoso! Ya podés iniciar sesión.";
        }
    } catch (mysqli_sql_exception $e) {
        if ($stmt->errno === 1062) {
            if (strpos($stmt->error, 'dni') !== false) {
                echo "❌ Ya existe un usuario con este DNI.";
            } else {
                echo "❌ Error: Dato duplicado.";
            }
        } else {
            echo "❌ Error al registrar: " . $stmt->error;
        }
    }

    $stmt->close();
    $conexion->close();
    exit;
}

elseif ($accion === 'login') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $contrasena = $_POST['contrasenia'];

    if (empty($email) || empty($dni) || empty($contrasena)) {
        echo "❗ Todos los campos son obligatorios.";
        exit;
    }

    $stmt = $conexion->prepare("SELECT * FROM clientes WHERE mail = ? AND dni = ? AND contrasena = ?");
    $stmt->bind_param("sis", $email, $dni, $contrasena);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $usuario = $res->fetch_assoc();
        echo "✅"
            . "|id_cliente=" . $usuario['id_cliente']
            . "|nombre=" . $usuario['nombre']
            . "|apellido=" . $usuario['apellido']
            . "|dni=" . $usuario['dni']
            . "|email=" . $usuario['mail']
            . "|telefono=" . $usuario['telefono']
            . "|fecha_nacimiento=" . $usuario['fecha_nacimiento']
            . "|contrasena=" . $usuario['contrasena'];
    } else {
        echo "❌ Credenciales incorrectas.";
    }

    $stmt->close();
    $conexion->close();
    exit;
}

elseif ($accion === 'login_empleado') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $contrasena = $_POST['contrasenia'];

    if (empty($email) || empty($dni) || empty($contrasena)) {
        echo "❗ Todos los campos son obligatorios.";
        exit;
    }

    $stmt = $conexion->prepare("SELECT * FROM empleados WHERE mail = ? AND dni = ? AND contrasena = ?");
    $stmt->bind_param("sis", $email, $dni, $contrasena);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $empleado = $res->fetch_assoc();
        echo "✅"
            . "|id_empleado=" . $empleado['id_empleado']
            . "|nombre=" . $empleado['nombre']
            . "|apellido=" . $empleado['apellido']
            . "|dni=" . $empleado['dni']
            . "|email=" . $empleado['mail']
            . "|puesto=" . $empleado['puesto']
            . "|contrasena=" . $empleado['contrasena']
            . "|id_local=" . $empleado['id_local'];
    } else {
        echo "❌ Credenciales incorrectas.";
    }

    $stmt->close();
    $conexion->close();
    exit;
}

else {
    http_response_code(400);
    echo "Acción no reconocida.";
    exit;
}
