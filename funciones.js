/*Permite que se pueda acceder a los formularios de ingresoCliente e ingresoEmpleado desde otras paginas*/
window.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;

    const divCliente = document.getElementById("cliente");
    const divEmpleado = document.getElementById("empleado");

    // Oculta ambos al principio
    if (divCliente) divCliente.style.display = "none";
    if (divEmpleado) divEmpleado.style.display = "none";

    if (hash === "#cliente" && divCliente) {
      divCliente.style.display = "grid";
    } else if (hash === "#empleado" && divEmpleado) {
      divEmpleado.style.display = "grid";
    }
  });
/*Funciona para mostrar el formulario de ingresoCliente e ingresoEmpleado desde alguno de estos.*/
function mostrarFormulario(tipo) {
    document.getElementById("cliente").style.display = "none";
    document.getElementById("empleado").style.display = "none";
  
    if (tipo === "botonCliente") {
      document.getElementById("cliente").style.display = "grid";
    } else if (tipo === "botonEmpleado") {
      document.getElementById("empleado").style.display = "grid";
    }
}