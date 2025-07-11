<?php
session_start();
require_once("config_BDD.php"); 

// Verificación de acceso del empleado según su puesto y local.
$idEmpleado = $_POST['idEmpleado'] ?? null;
$puesto = $_POST['puesto'] ?? null;
$idLocalEmpleado = $_POST['idLocal'] ?? null;

if ($idEmpleado && $puesto && $idLocalEmpleado) {
    // Si el puesto no es "Gerente" ni "Subgerente", restringimos las reservas al local del empleado.
    if ($puesto !== 'Gerente' && $puesto !== 'Subgerente') {
        // Solo mostramos las reservas del local asignado al empleado.
        $sql = "SELECT r.*, l.id_local 
                FROM reservas r
                INNER JOIN mesas m ON r.id_mesa = m.id_mesa
                INNER JOIN locales l ON m.id_local = l.id_local
                WHERE l.id_local = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("i", $idLocalEmpleado);
    } else {
        // Si el empleado es "Gerente" o "Subgerente", mostramos todas las reservas sin restricción de local.
        $sql = "SELECT r.*, l.id_local 
                FROM reservas r
                INNER JOIN mesas m ON r.id_mesa = m.id_mesa
                INNER JOIN locales l ON m.id_local = l.id_local";
        $stmt = $conexion->prepare($sql);
    }

    $stmt->execute();
    $resultado = $stmt->get_result();

    $reservas = [];
    while ($fila = $resultado->fetch_assoc()) {
        $reservas[] = $fila;
    }

    // Si no se está realizando una búsqueda histórica, mostramos las reservas del día
    $hoy = date('Y-m-d');
    if (!isset($_POST['columna'])) {
        $sql = "SELECT r.*, 
                       c.nombre AS nombre_cliente, 
                       c.apellido AS apellido_cliente, 
                       c.dni, 
                       c.mail, 
                       m.descripcion AS mesa_desc, 
                       e.estados 
                FROM reservas r
                JOIN clientes c ON r.id_cliente = c.id_cliente
                JOIN mesas m ON r.id_mesa = m.id_mesa
                JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
                WHERE DATE(r.fecha_reserva) = ? 
                  AND e.estados = 'reservada'
                ORDER BY r.fecha_reserva ASC";
                
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("s", $hoy);
        $stmt->execute();
        $res = $stmt->get_result();

        // Input de filtro
        echo "<input id='inputBuscarReservasEmpleado' oninput='filtrarReservas()' class='form-control mb-3' placeholder='Buscar...'>";

        mostrarTablaReservas($res, true);
    } else {
        // Búsqueda histórica
        if (isset($_POST['columna'])) {
            $columna = $_POST['columna'];
            $valor = trim($_POST['valor'] ?? '');

            $columnas_validas = [
                'dni' => 'c.dni',
                'mail' => 'c.mail',
                'fecha_reserva' => 'r.fecha_reserva',
                'nombre' => 'c.nombre',
                'apellido' => 'c.apellido'
            ];

            if (!array_key_exists($columna, $columnas_validas)) {
                http_response_code(400);
                exit("❌ Columna no válida.");
            }

            $columna_sql = $columnas_validas[$columna];

            $sql = "SELECT r.*, 
                          c.nombre AS nombre_cliente, 
                          c.apellido AS apellido_cliente, 
                          c.dni, 
                          c.mail, 
                          m.descripcion AS mesa_desc, 
                          e.estados 
                    FROM reservas r
                    JOIN clientes c ON r.id_cliente = c.id_cliente
                    JOIN mesas m ON r.id_mesa = m.id_mesa
                    JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
                    WHERE $columna_sql LIKE ?
                    ORDER BY r.fecha_reserva DESC";

            $stmt = $conexion->prepare($sql);
            $like = "%$valor%";
            $stmt->bind_param("s", $like);
            $stmt->execute();
            $res = $stmt->get_result();

            echo "<h5>Resultados de búsqueda histórica</h5>";
            mostrarTablaReservas($res, false);
        }
    }
} else {
    http_response_code(400);
    exit("❌ Datos inválidos. No se pudo determinar el empleado, puesto o local.");
}


// Función para mostrar reservas en tabla
function mostrarTablaReservas($res, $conBotones)
{
    echo "<table class='table table-bordered table-striped'>";
    echo "<thead><tr>
              <th>Cliente</th>
              <th>DNI / Mail</th>
              <th>Mesa</th>
              <th>Fecha</th>
              <th>Observaciones</th>
              <th>Personas</th>
              <th>Estado</th>
              <th>Cambio Mesa</th>";
    if ($conBotones) echo "<th>Acciones</th>";
    echo "</tr></thead><tbody>";

    while ($row = $res->fetch_assoc()) {
        echo "<tr class='reserva-row'>
                <td>{$row['nombre_cliente']} {$row['apellido_cliente']}</td>
                <td>{$row['dni']}<br>{$row['mail']}</td>
                <td>{$row['mesa_desc']}</td>
                <td>{$row['fecha_reserva']}</td>
                <td>{$row['observaciones']}</td>
                <td>{$row['cant_personas']}</td>
                <td>{$row['estados']}</td>
                <td>" . ($row['cambio_mesa'] ?? '-') . "</td>";
        if ($conBotones) {
            echo "<td>
                    <button class='btn btn-success btn-sm' onclick=\"cambiarEstadoReserva({$row['id_reserva']}, 'realizada/concretada')\">Concretar</button>
                    <button class='btn btn-danger btn-sm' onclick=\"cambiarEstadoReserva({$row['id_reserva']}, 'realizada/anulada')\">Anular</button>
                  </td>";
        }
        echo "</tr>";
    }

    echo "</tbody></table>";
}
?>