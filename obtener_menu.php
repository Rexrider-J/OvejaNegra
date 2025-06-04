<?php
include("config_BDD.php");

$sql = "SELECT id_menu, nombre, precio, categoria, descripcion, ruta_imagen FROM menu";
$result = $conexion->query($sql);

if ($result && $result->num_rows > 0) {
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
              <input type="text" name="nombre" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['nombre']) ?>" required>
            </div>
            <div class="mb-2">
              <label class="form-label">Precio</label>
              <input type="number" name="precio" step="0.01" class="form-control form-control-sm" value="<?= $fila['precio'] ?>" required>
            </div>
            <div class="mb-2">
              <label class="form-label">Categoría</label>
              <input type="text" name="categoria" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['categoria']) ?>" required>
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
            <button type="submit" name="edit" class="btn btn-sm btn-success mb-2">Actualizar</button><br>
            <a href="acciones_menu.php?action=delete&id=<?= $fila['id_menu'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('¿Eliminar este ítem?')">Eliminar</a>
          </div>
        </div>
      </form>
    </div>
<?php
  }
} else {
  echo "<p>No hay ítems en el menú.</p>";
}
$conexion->close();
?>