// importamos la funcion "conexion" desde data base 
import {conexion} from '../database';
// importamos las interfaces "Response" y "Resquest" desde "express"
import {Request, Response} from "express";
// importamos la interfaz "IArticulo" desde el archivo "consola" 
import {ICat} from "../models/categoria";

// clase que nos permitira almacenar metodos
export class CategoriaController {
    
    // metodo que nos permite listar consolas
    public async listarCategoria(req:Request, res:Response){
 
        // guardamos la funcion "conexion" en las constante "db", para conectarnos con la db
        const db = await conexion();
        // realizamos la consulta para mostrar los datos en la consola
        let cat = await db.query('select * from categoria');
        
        // retorna una respuesta en formato json de cat
        return res.json(cat);
    }
    // metodo que guardara datos en la DB
    public async guardarCategoria(req:Request, res:Response){
        // conexion con la db
        const db = await conexion();
        // guardamos los datos ingresados en el body en una variable 
        const cat:ICat = req.body;
        // inserta los datos en la DB
        await db.query("insert into categoria set ?",[cat]);
        // retorna un mensaje 
        return res.json('La categoria fue creada exitosamente');
    }
    // metodo que permite eliminar datos
    public async eliminarCategoria(req:Request, res:Response){
        // conexion con la base de datos 
        const db = await conexion();
        // recibe el codigo por parte de la categoria
        let id_categoria = req.params.id_categoria;
        // realiza la eliminacion de la categoria 
        await db.query("delete from categoria where id_categoria = ?", [id_categoria]);
        // retorna un mensaje 
        return res.json('La categoria se eliminó con exito');
    }
        // permite actualizar datos
    public async actualizarCategoria(req:Request, res:Response){
        // conexion con la db
        const db = await conexion();
        // recibimos el codigo en la categoria
        let id_categoria = req.params.id_categoria;
        // nuevos datos de la categoria 
        let new_categoria = req.body;
        // realiza la actualizacion 
        await db.query("update categoria set ? where id_categoria = ?", [new_categoria, id_categoria]);
        // retorna un mensaje 
        return res.json('La categoria se actualizó con exito');
    }
    // lista
    public async obtenerCategoria(req:Request, res:Response){
        // conexion con la db
        const db = await conexion();
        // recibimos el codigo de la categoria
        let id_categoria = req.params.id_categoria;
        // realiza la seleccion de una categoria y guarda en una variable 
        let unCategoria = await db.query("select * from categoria where id_categoria = ?", [id_categoria]);
        // retorna un mensaje 
        return res.json(unCategoria[0]);
    }
}
 