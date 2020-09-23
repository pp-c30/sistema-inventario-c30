import {conexion} from '../database'
import {Request, Response} from "express";
import {ICat} from "../models/categoria";

export class CategoriaController {
    
    public async listarCategoria(req:Request, res:Response){

    
    
        const db = await conexion();
        
        let cat = await db.query('select * from categoria');
        
        return res.json(cat);
    }
    
    public async guardarCategoria(req:Request, res:Response){

        const db = await conexion();

        const cat:ICat = req.body;

        await db.query("insert into categoria set ?",[cat]);
    
        return res.json('La categoria fue creada exitosamente');
    }
    
    public async eliminarCategoria(req:Request, res:Response){

        const db = await conexion();

        let id_categoria = req.params.id_categoria;
        
        await db.query("delete from categoria where id_categoria = ?", [id_categoria]);

        return res.json('La categoria se eliminó con exito');
    }

    public async actualizarCategoria(req:Request, res:Response){

        const db = await conexion();

        let id_categoria = req.params.id_categoria;
        let new_categoria = req.body;

        await db.query("update categoria set ? where id_categoria = ?", [new_categoria, id_categoria]);

        return res.json('La categoria se actualizó con exito');
    }

    public async obtenerCategoria(req:Request, res:Response){

        const db = await conexion();

        let id_categoria = req.params.id_categoria;

        let unCategoria = await db.query("select * from categoria where id_categoria = ?", [id_categoria]);

        return res.json(unCategoria[0]);
    }
}
 