import { createPool } from "promise-mysql"



export async function conexion(){

    const con = await createPool({

        host:'localhost',
        user:'root',
        password:'',
        database:'sistema_inventario'
    })

    return con;
}
