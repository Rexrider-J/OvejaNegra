<?php
session_start();
require_once("config_BDD.php");

// Verificamos conexión
if (!isset($conexion) || $conexion === null) {
    die("Error de conexión con la base de datos.");
}

// Solo aceptar método POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("Método no permitido.");
}

// Verificar que se recibió una acción
if (!isset($_POST['accion'])) {
    http_response_code(400);
    die("Falta acción.");
}

// Acción: REGISTRO DE CLIENTE
if ($_POST['accion'] === 'registro') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $dni = $_POST['dni'];
    $fecha_nac = $_POST['fecha_nacimiento'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $contraseña = $_POST['contraseña'];

    // Insertar en base de datos
    $stmt = $conexion->prepare("INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, telefono, mail, contraseña)
                                VALUES (?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Error en prepare(): " . $conexion->error);
    }

    $stmt->bind_param("ssissss", $nombre, $apellido, $dni, $fecha_nac, $telefono, $email, $contraseña);

    if ($stmt->execute()) {
        echo "✅ ¡Registro exitoso! Ya podés iniciar sesión.";
    } else {
        echo "❌ Error al registrar: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// Acción: INICIO DE SESIÓN DE CLIENTE
elseif ($_POST['accion'] === 'login') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $contraseña = $_POST['contraseña'];

    $stmt = $conexion->prepare("SELECT * FROM clientes WHERE mail = ? AND dni = ? AND contraseña = ?");
    if (!$stmt) {
        die("Error en prepare(): " . $conexion->error);
    }

    $stmt->bind_param("sis", $email, $dni, $contraseña);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $usuario = $res->fetch_assoc();
        $_SESSION['id_cliente'] = $usuario['id_cliente'];
        $_SESSION['nombre'] = $usuario['nombre'];
        echo "✅ Bienvenido, " . $_SESSION['nombre'];
    } else {
        echo "❌ Credenciales incorrectas.";
    }

    $stmt->close();
    $conexion->close();
    exit;
} elseif ($_POST['accion'] === 'login_empleado') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $contraseña = $_POST['contraseña'];

    $stmt = $conexion->prepare("SELECT * FROM empleados WHERE mail = ? AND dni = ? AND contraseña = ?");
    if (!$stmt) {
        die("Error en prepare(): " . $conexion->error);
    }

    $stmt->bind_param("sis", $email, $dni, $contraseña);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $empleado = $res->fetch_assoc();
        $_SESSION['id_empleado'] = $empleado['id_empleado'];
        $_SESSION['nombre'] = $empleado['nombre'];
        echo "✅ Bienvenido, " . $_SESSION['nombre'];
    } else {
        echo "❌ Credenciales incorrectas.";
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// Acción desconocida
else {
    http_response_code(400);
    echo "Acción no reconocida.";
    exit;
}
