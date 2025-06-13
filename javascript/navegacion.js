
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

      case "facturacion":
        panelDinamico.innerHTML = `
            <h2>Generar Factura</h2>
            <form id="formFactura">
            <input type="text" id="clienteFactura" placeholder="Nombre del Cliente" required />
            <input type="text" id="productoFactura" placeholder="Producto" required />
            <input type="number" id="cantidadFactura" placeholder="Cantidad" required />
            <input type="number" id="precioFactura" placeholder="Precio Unitario" required />
            <button type="submit">Generar Factura</button>
            </form>
            <h3>Factura Generada</h3>
            <div id="resultadoFactura"></div>
        `;

        // Función inline para generar la factura
        const formFactura = document.getElementById("formFactura");
        const resultadoFactura = document.getElementById("resultadoFactura");

        formFactura.addEventListener("submit", function (e) {
            e.preventDefault();

            const cliente = document.getElementById("clienteFactura").value;
            const producto = document.getElementById("productoFactura").value;
            const cantidad = parseInt(document.getElementById("cantidadFactura").value);
            const precio = parseFloat(document.getElementById("precioFactura").value);
            const subtotal = cantidad * precio;
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
                    <tr>
                    <td>${producto}</td>
                    <td>${cantidad}</td>
                    <td>$${precio.toFixed(2)}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    </tr>
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
