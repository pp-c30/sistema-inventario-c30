import {conexion} from '../database';
import {Request, Response} from "express";
import {IArt} from "../models/articulo";

export class ArticuloController {
    
    public async listarArticulo(req:Request, res:Response){

        const db = await conexion();
        
        let mov = await db.query('select * from articulo');
        
        return res.json(mov);
    }
    
    public async guardarArticulo(req:Request, res:Response){

        const db = await conexion();

        const mov:IArt = req.body;

        const url_img = req.file.path;

        const guardarArticulo = {
            categoria:req.body.categoria,
            cant_total:req.body.cant_total,
            cant:req.body.cant,
            fecha_alta:req.body.fecha_alta,
            descripcion:req.body.descripcion,
            seccion:req.body.seccion,
            estado:req.body.estado,
            valor:req.body.valor,
            img:url_img,
            origen:req.body.origen
        }

        await db.query("insert into articulo set ?",[guardarArticulo, mov]);
    
        return res.json('El articulo fue archivado exitosamente');
    }
    
    public async eliminarArticulo(req:Request, res:Response){

        const db = await conexion();

        let id_articulo = req.params.id_articulo;
        
        await db.query("delete from articulo where id_articulo = ?", [id_articulo]);

        return res.json('El articulo se eliminó con exito');
    }

    public async actualizarArticulo(req:Request, res:Response){

        const db = await conexion();

        let id_articulo = req.params.id_articulo;
        let new_articulo = req.body;

        await db.query("update articulo set ? where id_articulo = ?", [new_articulo, id_articulo]);

        return res.json('El articulo se actualizó con exito');
    }

    public async obtenerArticulo(req:Request, res:Response){

        const db = await conexion();

        let id_articulo = req.params.id_articulo;

        let unArticulo = await db.query("select * from articulo where id_articulo = ?", [id_articulo]);

        return res.json(unArticulo[0]);
    }
}
