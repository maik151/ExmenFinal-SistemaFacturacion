import {
  agregarCliente,
  obtenerTodosLosClientes,
  eliminarCliente
} from "./modulos/clientes.js";

export function inicializarModuloClientes() {
  console.log("Inicializado módulo clientes");

  const formCliente = document.getElementById("formCliente");
  const tbodyClientes = document.querySelector("#tablaClientes tbody");

  function cargarTablaClientes() {
    const clientes = obtenerTodosLosClientes();
    tbodyClientes.innerHTML = "";

    clientes.forEach(cliente => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.cedula}</td>
        <td>${cliente.direccion}</td>
        <td>
          <button class="btnEliminar" data-id="${cliente.id}">Eliminar</button>
        </td>
      `;
      tbodyClientes.appendChild(fila);
    });

    const botonesEliminar = tbodyClientes.querySelectorAll(".btnEliminar");
    botonesEliminar.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        eliminarCliente(id);
        cargarTablaClientes();
      });
    });
  }

  formCliente.addEventListener("submit", e => {
    e.preventDefault();
    console.log("Formulario enviado");

    const nombre = document.getElementById("nombreCliente").value.trim();
    const cedula = document.getElementById("cedulaCliente").value.trim();
    const direccion = document.getElementById("direccionCliente").value.trim();

    if (!nombre || !cedula || !direccion) return;

    agregarCliente({ nombre, cedula, direccion });
    formCliente.reset();
    cargarTablaClientes();
  });

  cargarTablaClientes();
}
