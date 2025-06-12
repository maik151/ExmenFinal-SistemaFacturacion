
// Definimos un array global de clientes (aquel que va a contener todos los clientes)
let clientes = [];

// Definimos el objeto de tipo cliente (con sus claves y valores para mapear luego las operaciones)
let cliente = {
  id: 0,
  nombre: " ",
  cedula: " ",
  direccion: " "
};

function MapearClienteObject(idParam, nombreParam, cedulaParam, direccionParam){
    let clienteObjetc = {
        id: idParam,
        nombre: nombreParam,
        cedula: cedulaParam,
        direccion: direccionParam
    };
    return clienteObjetc;
}


function agregarCliente(clienteObject){
    clientes.push(clienteObject);
    console.log("cliente agregado de manera exitosa");

}


function guardarClientesEnLocalStorage() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  console.log("Clientes guardados en Local Storage.");
}

//Flujo del Programa inicial

// Crear y agregar un nuevo cliente
let nuevoCliente = MapearClienteObject(1, "Ana Gómez", "87654321", "Calle Luna 123");
agregarCliente(nuevoCliente);

console.log(clientes);

// Guardar después de agregar
guardarClientesEnLocalStorage();