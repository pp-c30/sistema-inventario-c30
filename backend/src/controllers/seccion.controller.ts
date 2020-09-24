import {conexion} from '../database'
import {Request, Response} from "express";
import {ISec} from "../models/seccion";

export class SeccionController {
    
    public async listarSeccion(req:Request, res:Response){

    
    
        const db = await conexion();
        
        let sec = await db.query('select * from seccion');
        
        return res.json(sec);
    }
    
    public async guardarSeccion(req:Request, res:Response){

        const db = await conexion();

        const sec:ISec = req.body;

        await db.query("insert into seccion set ?",[sec]);
    
        return res.json('La seccion fue creada exitosamente');
    }
    
    public async eliminarSeccion(req:Request, res:Response){

        const db = await conexion();

        let id_seccion = req.params.id_seccion;
        
        await db.query("delete from seccion where id_seccion = ?", [id_seccion]);

        return res.json('La seccion se eliminó con exito');
    }

    public async actualizarSeccion(req:Request, res:Response){

        const db = await conexion();

        let id_seccion = req.params.id_seccion;
        let new_seccion = req.body;

        await db.query("update seccion set ? where id_seccion = ?", [new_seccion, id_seccion]);

        return res.json('La seccion se actualizó con exito');
    }

    public async obtenerSeccion(req:Request, res:Response){

        const db = await conexion();

        let id_seccion = req.params.id_seccion;

        let unSeccion = await db.query("select * from seccion where id_seccion = ?", [id_seccion]);

        return res.json(unSeccion[0]);
    }
}
 