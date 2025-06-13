
import { inicializarModuloClientes } from "./main.js";

// En este caso, ejecutamos un eveto tipo ContentLoaded para asegurarnos de que el DOM esté completamente cargado antes de intentar manipularlo.
document.addEventListener("DOMContentLoaded", () => {
//importamos en constantes el menu de navegacion, y el contenedor principal donde se mostrará el contenido dinámico.
  const enlacesMenu = document.querySelectorAll("nav.menu-navegacion a");
  const contenedorPrincipal = document.querySelector(".contenedor-principal");
// tambien importamos del HTML el panel dinamico, si no existe lo creamos.
  let panelDinamico = document.getElementById("panel-dinamico");
  if (!panelDinamico) {
    panelDinamico = document.createElement("div");
    panelDinamico.id = "panel-dinamico";
    panelDinamico.classList.add("panel-dinamico");
    contenedorPrincipal.appendChild(panelDinamico);
  }
//Declaramos la funcion de cargarContenido, donde funciona en base a un switch que recibe una seccion y segun eso carga determinada ventana.  
function cargarContenido(seccion) {
    switch (seccion) {
      case "clientes":
        panelDinamico.innerHTML = `
          <h2>Gestión de Clientes</h2>
          <form id="formCliente">
            <input type="text" id="nombreCliente" placeholder="Nombre" required />
            <input type="text" id="cedulaCliente" placeholder="Cédula" required />
            <input type="text" id="direccionCliente" placeholder="Dirección" required />
            <button type="submit">Guardar Cliente</button>
          </form>
          <h3>Listado de Clientes</h3>
          <table id="tablaClientes">
            <thead>
              <tr><th>Nombre</th><th>Cédula</th><th>Dirección</th><th>Acciones</th></tr>
            </thead>
            <tbody></tbody>
          </table>
        `;
        if (typeof inicializarModuloClientes === "function") {
          inicializarModuloClientes();
        }
        break;

      case "productos":
        panelDinamico.innerHTML = `
          <h2>Gestión de Productos</h2>
          <form id="formProducto">
            <input type="text" id="nombreProducto" placeholder="Nombre del producto" required />
            <input type="text" id="codigoProducto" placeholder="Código" required />
            <input type="text" id="descripcionProducto" placeholder="Descripción" required />
            <button type="submit">Guardar Producto</button>
          </form>
          <h3>Listado de Productos</h3>
          <table id="tablaProductos">
            <thead>
              <tr><th>Nombre</th><th>Código</th><th>Descripción</th><th>Acciones</th></tr>
            </thead>
            <tbody></tbody>
          </table>
        `;
        if (typeof inicializarModuloProductos === "function") {
          inicializarModuloProductos();
        }
        break;

      // En este caso jugamos un poco con la generacion de contenido dinamico, donde definimos resultadoFactura de nuevo, mapeamos los campos de dicha factura en un HTML y lo insertamos con innerHTML
      // este innerHTML se ejecuta dentro del evento submit del formulario.
      case "facturacion":
        panelDinamico.innerHTML = `
            <h2>Generar Factura</h2>
            <form id="formFactura">
            <input type="text" id="clienteFactura" placeholder="Nombre del Cliente" required />

            <div id="productosContainer">
                <div class="grupo-producto">
                <input type="text" class="producto" placeholder="Producto" required />
                <input type="number" class="cantidad" placeholder="Cantidad" required />
                <input type="number" class="precio" placeholder="Precio Unitario" required />
                </div>
            </div>

            <div class="controles-productos">
                <button type="button" id="btnAgregarFila">+</button>
                <button type="button" id="btnEliminarFila" disabled>-</button>
            </div>

            <button type="submit">Generar Factura</button>
            </form>

            <h3>Factura Generada</h3>
            <div id="resultadoFactura"></div>
        `;

        const productosContainer = document.getElementById("productosContainer");
        const btnAgregarFila = document.getElementById("btnAgregarFila");
        const btnEliminarFila = document.getElementById("btnEliminarFila");
        const formFactura = document.getElementById("formFactura");
        const resultadoFactura = document.getElementById("resultadoFactura");

        // Evento para agregar fila de producto
        btnAgregarFila.addEventListener("click", () => {
            const grupos = productosContainer.querySelectorAll(".grupo-producto");
            if (grupos.length < 5) {
            const nuevaFila = document.createElement("div");
            nuevaFila.className = "grupo-producto";
            nuevaFila.innerHTML = `
                <input type="text" class="producto" placeholder="Producto" required />
                <input type="number" class="cantidad" placeholder="Cantidad" required />
                <input type="number" class="precio" placeholder="Precio Unitario" required />
            `;
            productosContainer.appendChild(nuevaFila);
            }

            actualizarEstadoBotones();
        });

        // Evento para eliminar la última fila de producto
        btnEliminarFila.addEventListener("click", () => {
            const grupos = productosContainer.querySelectorAll(".grupo-producto");
            if (grupos.length > 1) {
            productosContainer.removeChild(grupos[grupos.length - 1]);
            }

            actualizarEstadoBotones();
        });

        // Función para habilitar/deshabilitar botón "-"
        function actualizarEstadoBotones() {
            const totalFilas = productosContainer.querySelectorAll(".grupo-producto").length;
            btnEliminarFila.disabled = totalFilas <= 1;
            btnAgregarFila.disabled = totalFilas >= 5;
        }

        // Evento para generar factura
        formFactura.addEventListener("submit", function (e) {
            e.preventDefault();

            const cliente = document.getElementById("clienteFactura").value;
            const filas = productosContainer.querySelectorAll(".grupo-producto");

            let filasHTML = "";
            let subtotal = 0;

            filas.forEach(fila => {
            const producto = fila.querySelector(".producto").value;
            const cantidad = parseInt(fila.querySelector(".cantidad").value);
            const precio = parseFloat(fila.querySelector(".precio").value);
            const totalFila = cantidad * precio;
            subtotal += totalFila;

            filasHTML += `
                <tr>
                <td>${producto}</td>
                <td>${cantidad}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>$${totalFila.toFixed(2)}</td>
                </tr>
            `;
            });

            const iva = subtotal * 0.12;
            const total = subtotal + iva;

            resultadoFactura.innerHTML = `
            <div class="factura">
                <h4>Factura</h4>
                <p><strong>Cliente:</strong> ${cliente}</p>
                <table class="tabla-factura">
                <thead>
                    <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="3"><strong>IVA (12%)</strong></td>
                    <td>$${iva.toFixed(2)}</td>
                    </tr>
                    <tr>
                    <td colspan="3"><strong>Total</strong></td>
                    <td><strong>$${total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
                </table>
            </div>
            `;
        });
        break;

      default:
        panelDinamico.innerHTML = `<p>Sección no reconocida.</p>`;
    }
  }


// Ejecutamos un recorrido con forEach sobre los hijos del menu de navegacion
// en este caso la constante enlacesMenu, y agregamos un evento click a cada uno de ellos.
//luego al hacer click obtenemos el atributo de data-seccion del enlace y llamamos a la función cargarContenido con ese valor.

  enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const seccion = enlace.getAttribute("data-seccion");
      cargarContenido(seccion);
    });
  });
});
