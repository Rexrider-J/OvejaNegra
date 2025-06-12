<?php
include("config_BDD.php");

$sql = "SELECT id_menu, nombre, precio, categoria, descripcion, ruta_imagen FROM menu"; // preparamos la consulta
$result = $conexion->query($sql); // y la ejecutamos (trae todos los items de la tabla menu)
?>

<!-- Formularo para agregar items -->
<div class="list-group" id="contenedor-menu">
  <button id="btn-subir" title="Volver arriba">↑</button>
  <h4>Agregar nuevo ítem</h4>
  <form method="POST" action="acciones_menu.php" id="form-agregar-menu">
    <div class="row">
      <div class="col-md-3">

        <label>Nombre</label>
        <input type="text" name="nombre" class="form-control form-control-sm" required>
      </div>
      <div class="col-md-2">

        <label>Precio</label>
        <input type="number" step="0.01" name="precio" class="form-control form-control-sm" required>
      </div>
      <div class="col-md-3">

        <label>Categoría</label>
        <input type="text" name="categoria" class="form-control form-control-sm" required>
      </div>
      <div class="col-md-4">

        <label>Descripción</label>
        <input type="text" name="descripcion" class="form-control form-control-sm">
      </div>
      <div class="col-md-6 mt-2">

        <label>URL Imagen</label>
        <input type="text" name="ruta_imagen" class="form-control form-control-sm">
      </div>
      <div class="col-md-6 mt-4 d-flex align-items-end">
        <button type="submit" class="btn btn-primary btn-sm">Agregar ítem</button>
      </div>
    </div>
  </form>
  <hr>

  <div class="mb-3"> <!-- el input para la búsqueda -->
    <input type="text" id="busqueda" onkeyup="filtrarMenu()" class="form-control" placeholder="Buscar en el menú...">
  </div>
  <div class="contenedor-items-del-menu">
  <?php
    if ($result && $result->num_rows > 0) { // verifica que haya resultados y los recorre si los hay
      while ($fila = $result->fetch_assoc()) {
    ?>
        <div class="list-group-item menu-item">
          <form method="POST" action="acciones_menu.php">
            <div class="row align-items-center">

              <div class="col-md-2">
                <img src="<?= htmlspecialchars($fila['ruta_imagen']) ?>" alt="<?= htmlspecialchars($fila['nombre']) ?>" class="img-fluid rounded" style="max-height:100px;">
              </div>

              <div class="col-md-7">
                <input type="hidden" name="id" value="<?= $fila['id_menu'] ?>">
                <div class="mb-2">
                  <label class="form-label">Nombre</label>
                  <input type="text" name="nombre" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['nombre']) ?>">
                </div>

                <div class="mb-2">
                  <label class="form-label">Precio</label>
                  <input type="number" name="precio" step="0.01" class="form-control form-control-sm" value="<?= $fila['precio'] ?>">
                </div>

                <div class="mb-2">
                  <label class="form-label">Categoría</label>
                  <input type="text" name="categoria" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['categoria']) ?>">
                </div>

                <div class="mb-2">
                  <label class="form-label">Descripción</label>
                  <textarea name="descripcion" rows="2" class="form-control form-control-sm"><?= htmlspecialchars($fila['descripcion']) ?></textarea>
                </div>

                <div class="mb-2">
                  <label class="form-label">URL Imagen</label>
                  <input type="text" name="ruta_imagen" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['ruta_imagen']) ?>">
                </div>
              </div>

              <div class="col-md-3">
                <button type="button" name="edit" class="btn btn-sm btn-success mb-2">Actualizar</button><br>
                <button type="button" class="btn btn-sm btn-danger eliminar-item" data-id="<?= $fila['id_menu'] ?>">Eliminar</button>
              </div>
            </div>
          </form>
        </div>
    <?php
      }
    } else { // si no hay resultados, mustra los siguiente
      echo "<p>No hay ítems en el menú.</p>";
    }
    $conexion->close();
    ?>
  </div>
</div>