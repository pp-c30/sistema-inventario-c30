// importamos el metodo "createPool" que nos permite conectarnos a la db desde "promise-mysql"
import { createPool } from "promise-mysql"

//funcion que se encarga de la conexion a la DB 
export async function conexion(){

    // constante en la que se define las propiedades del "createPool" en la constante "connect",para poder conectar a la BD
    const con = await createPool({

        host:'localhost',
        user:'root',
        password:'',
        database:'sistema_inventario'
    })
// entrega una respuesta 
    return con;
}
