const { Producto,readLine } = require(`./caritoCompras`);


const rl = readLine

const pausa =()=>{
    return new Promise(resolve =>{

        rl.question(`\n presione ${`enter`.yellow} para continuar\n`, ()=>{

            resolve();
        });
    });
}




const agregarProducto = async (productosTienda) => {
    
    return new Promise((resolve) => {
       
        rl.question(`Ingrese el código del producto: `, (codigoProducto) => {
            rl.question(`Ingrese el nombre del producto: `, (nombreProducto) => {
                rl.question(`Ingrese el inventario del producto: `, (inventarioProducto) => {
                    rl.question(`Ingrese el precio del producto: `, (precioProducto) => { 
                        const producto = new Producto();
                        producto.setCodigoProducto = codigoProducto;
                        producto.setNombreProducto = nombreProducto;
                        producto.setInventarioProducto = Number(inventarioProducto);
                        producto.setPrecioProducto = Number(precioProducto);

                        productosTienda.getListaProductos.push(producto);

                        rl.question(`¿Desea agregar otro producto? (si/no): `, (respuesta) => {
                            if (respuesta.toLowerCase() === 'si') {
                                agregarProducto(productosTienda).then(resolve);

                            } else {
                                // await pausa()
                                resolve();
                            }
                        });
                    });
                });
            });
        });
    });
} 

const menu = () => {

    return new Promise(resolve => {
        console.log(`¿Quiere agregar un nuevo producto?`);
        console.log(`${`1. `.green} Cargar Datos`);
        console.log(`${`2. `.green} Copia de Respaldo`);
        console.log(`${`3. `.green} Reparacion de Datos` );
        console.log(`${`4. `.green} Grabar Nuevos Productos`);
        console.log(`${`5. `.green} Borrar Producto`);
        console.log(`${`6. `.green} Comprar productos`);
        console.log(`${`7. `.green} Imprimir Factura`);
        console.log(`${`0. `.green} Cerrar APP`);   
        rl.question(`Seleccione una opcion: `, async (opt) => {
            if (opt === '0') {
               readLine.close() 
            }
            resolve(opt);
        })
    })
};

module.exports = {
    pausa,
    menu,
    agregarProducto
  };