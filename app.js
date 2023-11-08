
require('colors');

const { ProductosTienda, Producto, Cliente} = require('./proy_modules/caritoCompras')
const{pausa, menu, agregarProducto, readLine} = require(`./proy_modules/funciones.js`)

// Se declara una constante llamada main que contiene una funcion flecha
const main = async () => {

    let opt = ""
     let productosTienda = new ProductosTienda;
     

    console.clear();
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` + 
    `~~~~~~~~~~~~~~~`);
    console.log(`+                   Carrito de  compras                      `+ 
    `         +`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` + 
    `~~~~~~~~~~~~~~~`);
 
    await pausa();
    
    console.clear()

    console.log(` menu `)
  
    console.clear()


    console.log(`DATOS APERTURA TIENDA`);

// Limbia la consola 
    console.clear();

// Imprime una interfaz en la consola
    console.log(`**********************`);
    console.log(`*   Proyecto clases  *`);
    console.log('**********************');



// se llama al metodo en la variable productosTienda
// let opt;

do {
    console.clear();
    console.log(` menu `);
    console.clear();

    opt = await menu();

    switch(opt) {
        case '1':
            console.clear();
            productosTienda.cargaArchivoProductos(); // Opción 1: Cargar Datos
                // productosTienda.mostrarProductos(); // Muestra los productos cargados
                await pausa(); // Pausa para esperar a que el usuario presione ENTER
                break;

        case '2':
            console.clear();
    console.log(`----- Hacer Copia de Seguridad -----`);
    productosTienda.hacerCopiaDeSeguridad();
    await pausa();
            break;
            case '3':
                ;
                break;
            
        case '4':
            console.clear()
            await agregarProducto(productosTienda); // Opción 4: Grabar Nuevos Productos
            
            productosTienda.grabaArchivoProductos();
            await pausa();
            break;
        case '5':
            console.clear();
            console.log(`----- Eliminar producto -----`);
            await productosTienda.eliminarProducto();
            await pausa();
    break;
        case '6':
            console.clear();
            const datos = new Cliente
            console.log(`----- Comprar productos -----`);
            await datos.comprar(productosTienda); // Añadir productosTienda como argumento
            await pausa();
            break;
        case '7':
            // Lógica para Imprimir Factura
            break;
        case '0':
            console.log("Gracias por ingresar, que tenga un feliz dia");
            break;
        default:
            if (opt >= '8') {
                console.log(`Opción no válida. Por favor seleccione 1 a 7.`);
            } else {
                console.log(`Opción no válida. Por favor seleccione 0 a 7.`);
            }
    }
    
} while (opt !== '0');

}
main();