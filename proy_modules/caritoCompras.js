
/*Se crea una constante fs que se solicita al modulo de nodejs file system que 
interectua con sistemas de archivo
*/

const readLine = require('readline').createInterface({
    input: process.stdin,
   output: process.stdout
});

const fs = require('fs');



/* se crea una clase que es un elemento fundamental en la programacion orientada 
a objetos donde para definirlas se usa la palabra reservada class y el uso del 
theUpperCamelCase*/

class Producto {

/*Se encapsula las propiedades de la clase Producto que permite dar una 
prodeccion de datos adicional como un tipo de caja negra en este caso codigoProducto
*/
    #codigoProducto;

// Encapsulamiento de la propiedad nombre producto
    #nombreProducto;

// Encapsulamiento de la propiedad inventario producto
    #inventarioProducto;

// Encapsulamiento de la propiedad precioProducto
    #precioProducto;

// El constructor se usa para inicializar las propiedades de las clases
    constructor(){

/* Las propiedades de la clase producto se utiliza para dar un valor que se
inicializa con valores vacios, en este caso codigoProducto se van a manejar en 
un string*/
        this.#codigoProducto = '';

//El valor de la propiedad nombreProducto que se maneja en string 
        this.#nombreProducto = '';

//El valor de la propiedad inventarioProducto que se maneja en number
        this.#inventarioProducto = 0;

//El valor de la propiedad precioProducto que se maneja en number
        this.#precioProducto = 0;
    }

// El metodo set se encarga de asignarle o modificar los valores de las propiedades  
    set setCodigoProducto(value){

//La propiedad que se le puede modificar el valor es codigoproducto
        this.#codigoProducto = value;  
    }

// El metodo getter se usa para obtener el valor de una propiedad
    get getCodigoProducto(){

// Se obtiene el valor de la propiedad codigoProducto
        return this.#codigoProducto;
    }
// Se hace un set de nombre setNombreProducto
    set setNombreProducto(value){

// La propiedad que se modifica o asigna el valor es nombre producto
        this.#nombreProducto = value;
    }

//El metodo get se nombra como getNombreProducto
    get getNombreProducto(){

//La propiedad que solicita el valor es nombreProducto
        return this.#nombreProducto;
    }

// Se crea un metodo set llamadoset InventarioProducto
    set setInventarioProducto(value){

// La propiedad a asignarle el valor es inventarioProducto
        this.#inventarioProducto = value;
    }

// Se crea un metodo get llamado getInventarioProducto
    get getInventarioProducto(){

// La propiedad que es solicitada es inventarioProducto
        return this.#inventarioProducto;
    }

// se crea un metodo set llamado setPrecioProducto
    set setPrecioProducto(value){

// La propiedad que se le asigna un valor es precioProducto
        this.#precioProducto = value;
    }

// Se crea un metodo get llamado getPrecioProducto
    get getPrecioProducto(){

// Se solicita la propiedad precioProducto
        return this.#precioProducto
    }
}

//Se crea una clase llamada ProductosTienda
class ProductosTienda{

// Se crea una propiedad llamada listaProductos que esta encapsulada
    #listaProductos;

//Se hace un nuevo constructor de la clase Productos tienda
    constructor(){

//La propiedad que se inicializa es listaProductos que se maneja como un array
        this.#listaProductos = [];
    }

    get getListaProductos(){

        return this.#listaProductos;
    }

    cargaArchivoProductos(){
        let contador = 0;

        const datosArchivo = require('../datos.json');

        if(datosArchivo.length > 0){

            datosArchivo.forEach(objeto =>{    
                contador++;
                let producto = new Producto;
                producto.setCodigoProducto = objeto.codigoProducto;
                producto.setNombreProducto = objeto.nombreProducto;
                producto.setInventarioProducto = objeto.inventarioProducto;
                producto.setPrecioProducto = objeto.precioProducto;
                this.#listaProductos.push(producto);
            });

            console.log(`Total de productos cargados ==> `.bgBlue + 
            ` ${contador} `.bgRed);

        }else{

            console.log(`Error, el archivo datos.json no contiene datos\n`.bgRed);
        }

        console.log(`            Total de productos cargados ==>       `.bgBlue + 
        `          ${contador} `.bgRed);

        
    }

    grabaArchivoProductos(){


        const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
            
            return {

                codigoProducto: producto.getCodigoProducto,

                nombreProducto: producto.getNombreProducto,

                inventarioProducto: producto.getInventarioProducto,

                precioProducto: producto.getPrecioProducto
            };
        });


        const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);

        const nombreArchivo = 'datos.json';

        fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

        console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);
    }

    mostrarProductos(){

        this.getListaProductos.forEach(producto => {

            console.log(`|    `+ producto.getCodigoProducto + `      |` +
                        `|      `+ producto.getNombreProducto+ `       |`+
                        `|       `+producto.getInventarioProducto+`     |`+
                        `|       `+producto.getPrecioProducto+`    |`);
        })
    }
    
    async eliminarProducto() {
        // const rl = readLine
        

        const codigoProductoAEliminar = await new Promise(resolve => {
            readLine.question(`Ingrese el código del producto que desea eliminar: `, (codigo) => {
                resolve(codigo);
                // rl.close();
            });
        });

        const productoIndex = this.#listaProductos.findIndex(producto => producto.getCodigoProducto === codigoProductoAEliminar);

        if (productoIndex !== -1) {
            this.#listaProductos.splice(productoIndex, 1);
            this.grabaArchivoProductos();
            console.log(`Producto con código ${codigoProductoAEliminar} eliminado exitosamente.`);
        } else {
            console.log(`No se encontró ningún producto con el código ${codigoProductoAEliminar}.`);
        }
    }
    
    hacerCopiaDeSeguridad() {
        const fechaHora = new Date().toISOString().replace(/[-T:]/g, '').slice(0, -5);
        const nombreArchivo = `backup_${fechaHora}.json`;

        fs.copyFileSync('datos.json', nombreArchivo);
        console.log(`Copia de seguridad realizada con éxito. Archivo guardado como ${nombreArchivo}.`);
    }

}

class Cliente {
    #nombreCompleto;
    #documento;
    #direccion;

    constructor(){
        this.#nombreCompleto = ""
        this.#documento = 0
        this.#direccion = ""
    }

    set setNombreCompleto(value){
        this.#nombreCompleto = value
    }

    get getNombreCompleto(){
        return this.#nombreCompleto
    }
    
    set setDocumento(value){
        this.#documento = value;
    }

    get getDocumento(){
        return this.#documento;
    }

    set setDireccion(value){
        this.#direccion = value
    }

    get getDireccion(){
        return this.#direccion
    }


   

    async comprar(productosTienda) {

        // const rl = readLine

        
        return new Promise(resolve => {
    
            readLine.question(`Ingrese su Nombre: `, (nombre) => {
                readLine.question(`Ingrese Numero de documento: `, (documento) => {
                    readLine.question(`Ingrese su Direccion: `, (direccion) => {
                        const datos = new Cliente();
                        datos.setNombreCompleto = nombre;
                        datos.setDocumento = documento;
                        datos.setDireccion = direccion;
    
                        readLine.question(`Ingrese el código del producto que desea comprar: `, (codigoProducto) => {
                            const productoEncontrado = productosTienda.getListaProductos.find(producto => producto.getCodigoProducto === codigoProducto);
    
                            if (productoEncontrado) {
                                readLine.question(`Ingrese la cantidad de unidades que desea comprar: `, (cantidad) => {
                                    if (productoEncontrado.getInventarioProducto >= cantidad) {
                                        productoEncontrado.setInventarioProducto -= cantidad;
                                        console.log(`Compra exitosa. Se han comprado ${cantidad} unidades de ${productoEncontrado.getNombreProducto}`);
                                    } else {
                                        console.log(`No hay suficientes unidades en inventario para este producto.`);
                                    }
    
                                    
                                    resolve(); // Resolver la promesa
                                });
                            } else {
                                console.log(`No se encontró ningún producto con el código ingresado.`);
                                // readline.close();
                                resolve(); // Resolver la promesa
                            }
                        });
                    });
                });
            });
        });
    }
}    

module.exports = {
    Producto,
    ProductosTienda,
    Cliente,
    readLine
}
