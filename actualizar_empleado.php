<?php
require_once("config_BDD.php"); /*El archivo de configuración de la base de datos*/

if ($_SERVER["REQUEST_METHOD"] == "POST") { /*Verifica si la solicitud fue realizada por el método POST*/
    if (!isset($conexion) || $conexion->connect_error) {    /*Verifica si la conexión existe y si se establecio correctamente*/
        die("Conexión fallida: " . $conexion->connect_error);   /*Si hay un error se termina la ejecución*/
    }

    /*Obtiene los datos enviados desde inicializarInputsEditables() en funciones.js*/
    $id_empleado = $_POST['id_empleado'];
    $campo = $_POST['campo'];
    $valor = $_POST['valor'];

    /*La lista de los campos validos que se permiten modificar*/
    $campos_validos = ['nombreEmpleado', 'apellidoEmpleado', 'dniEmpleado', 'emailEmpleado', 'contrasenaEmpleado'];

    /*Se verifica si el campo que se quiere modificar es válido*/
    if (in_array($campo, $campos_validos)) {

        /*El mapeo del nombre de campo que se recibe de funciones.js  al nombre real de la base de datos*/
        $mapa = [
            'nombreEmpleado' => 'nombre',
            'apellidoEmpleado' => 'apellido',
            'dniEmpleado' => 'dni',
            'emailEmpleado' => 'email',
            'contrasenaEmpleado' => 'contrasena'
        ];

        $campo_bd = $mapa[$campo];  /*Se obtiene el nombre real del campo en la base de datos*/

        /*Prepara una consulta segura con placeholders para evitar inyecciones SQL*/
        $stmt = $conexion->prepare("UPDATE empleados SET $campo_bd = ? WHERE id_empleado = ?");
        if ($stmt === false) {
            /*Si la preparación de la consulta falla, se termina la ejecución mostrando el error*/
            die("Error en la preparación: " . $conexion->error);
        }

        /*Enlaza los parámetros: "s" para string (el valor), "i" para integer (id_empleado)*/
        $stmt->bind_param("si", $valor, $id_empleado);

        /*Ejecuta la consulta y muestra el resultado*/
        if ($stmt->execute()) {
            echo "Actualización exitosa";
        } else {
            echo "Error al actualizar: " . $stmt->error;
        }

        /*Cierra la consulta preparada*/
        $stmt->close();
        /*Cierra la conexión a la base de datos si está abierta*/
        if (isset($conexion) && $conexion instanceof mysqli) {
            $conexion->close();
        }

    } else {
        /*Si el campo enviado no es válido, se rechaza la actualización*/
        echo "Campo inválido.";
    }
} else {
    /*Si la solicitud no es de tipo POST, no se permite continuar*/
    echo "Método inválido.";
}
?>