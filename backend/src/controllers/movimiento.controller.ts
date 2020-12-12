import {conexion} from '../database';
import {Request, Response} from "express";
import {IMov} from "../models/movimiento";

export class MovimientoController {
    
    public async listarMovimiento(req:Request, res:Response){
    
        const db = await conexion();
        
        let mov = await db.query('select * from movimiento');
        
        return res.json(mov);
    }
    
    public async guardarMovimiento(req:Request, res:Response){

        const db = await conexion();

        const mov:IMov = {

            id_articulo:req.body.id_articulo,
            destino_seccion:req.body.destino_seccion,
            fecha_hora:new Date(),
            cantidad:req.body.cantidad,
            estado:req.body.estado
        }

        await db.query("insert into movimiento set ?",[mov]);

        const art = {

            cant:req.body.cantidad_total - req.body.cantidad
        }

        await db.query("update articulo set ? where id_articulo = ?", [art, req.body.id_articulo]);
    
        return res.json('El movimiento fue archivado exitosamente');
    }
    
    public async eliminarMovimiento(req:Request, res:Response){

        const db = await conexion();

        let id_movimiento = req.params.id_movimiento;
        
        await db.query("delete from movimiento where id_movimiento = ?", [id_movimiento]);

        return res.json('El movimiento se eliminó con exito');
    }

    public async actualizarMovimiento(req:Request, res:Response){

        const db = await conexion();

        let id_movimiento = req.params.id_movimiento;
        let new_movimiento = req.body;

        await db.query("update movimiento set ? where id_movimiento = ?", [new_movimiento, id_movimiento]);

        return res.json('El movimiento se actualizó con exito');
    }

    public async obtenerMovimiento(req:Request, res:Response){

        const db = await conexion();

        let id_movimiento = req.params.id_movimiento;

        let unMovimiento = await db.query("select * from movimiento where id_movimiento = ?", [id_movimiento]);

        return res.json(unMovimiento[0]);
    }
}
