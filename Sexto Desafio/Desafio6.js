//Antes de ejecutar el script, borrar el archivo "productos.txt" de la carpeta files.

import fs from "fs";

class Archivo {
    constructor(nombre){
        this.nombre = nombre
    }
    async leer(log) {
        try {
            if (fs.existsSync(`./files/${this.nombre}`)) {
                const lectura = await fs.promises.readFile(`./files/${this.nombre}`, "utf-8");
                const array = await JSON.parse(lectura);
                log && console.log(array);
                return array;
            }else{
                log && console.log([]);
                return [];
            }
        } catch (error) {
            console.log("No se pudo leer: " + error.message);
        }
    }
    async guardar(nuevoProducto){
        try {
            const array = await this.leer();
            nuevoProducto.id = array.length+1;
            array.push(nuevoProducto);
            await fs.promises.writeFile(`./files/${this.nombre}`,JSON.stringify(array,null,"\t"))
        } catch (error) {
            console.log("No se pudo guardar: " + error.message);
        }
    }
    async borrar(){
        try {
            await fs.promises.unlink(`./files/${this.nombre}`);
            console.log("Archivo borrado con exito");
        } catch (error) {
            console.log("No se pudo borrar: " + error.message);
        }
    }
}

const escuadra = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}
const calculadora = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
}
const globo = {
    title: "Globo Terraqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}

//Instanciamos un nuevo archivo "productos.txt"
const productos = new Archivo("productos.txt");

//Llamamos a su metodo "leer()" (con parametro "log" para que no omita el console.log) y como aun no existe el archivo, debe consologear un array vacio.
productos.leer("log");

//Guardamos los productos... para ello lo hacemos con async await ya que sino se superponen.
const guardarProductos = async () =>{
    await productos.guardar(escuadra);
    await productos.guardar(calculadora);
    await productos.guardar(globo);
}
guardarProductos();