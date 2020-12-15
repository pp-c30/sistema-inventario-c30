import {conexion} from '../database';
import {Request, Response} from "express";
import {IMov} from "../models/movimiento";

export class MovimientoController {
    
    public async listarMovimiento(req:Request, res:Response){
    
        const db = await conexion();
        
        let id_articulo = req.params.id_articulo;

        let mov = await db.query('select *,DATE_FORMAT(fecha_hora, "%d-%m-%Y %h:%m") as fecha_hora from movimiento where id_articulo = ?', [id_articulo]);
        
        return res.json(mov);
    }

    public async listarMovDisponible(req:Request, res:Response){
    
        const db = await conexion();
        
        let id_articulo = req.params.id_art;

        let mov = await db.query('select *,DATE_FORMAT(fecha_hora, "%d-%m-%Y %h:%m") as fecha_hora from mov_disponible where id_art = ?', [id_articulo]);
        
        return res.json(mov);
    }
    
    public async guardarMovDisponible(req:Request, res:Response){

        const db = await conexion();

        const cant=req.body.cant;

        const cantMov=req.body.cantMov;

        if (cant==cantMov) {
            
            const id_md=req.body.id_md;

            const disp = {

                fecha_hora:new Date(),
                destino_seccion:req.body.destino_seccion
            }

            await db.query("update mov_disponible set ? where id_md = ?", [disp, id_md]);

            const mov:IMov = {

                id_articulo:req.body.id_articulo,
                destino_seccion:req.body.destino_seccion,
                fecha_hora:new Date(),
                cantidad:req.body.cant,
                estado:req.body.estado
            }
    
            await db.query("insert into movimiento set ?",[mov]);
        }else{

            if (cantMov<cant) {

                const id_md=req.body.id_md;

                const disp = {

                    fecha_hora:new Date(),
                    cant:req.body.cant-req.body.cantMov
                }

                await db.query("update mov_disponible set ? where id_md = ?", [disp, id_md]);

                const dispNew = {

                    fecha_hora:new Date(),
                    destino_seccion:req.body.destino_seccion,
                    cant:req.body.cantMov,
                    id_art:req.body.id_articulo
                }

                await db.query("insert into mov_disponible set ?",[dispNew]);


                //aca se guarda el historial
                const mov:IMov = {

                    id_articulo:req.body.id_articulo,
                    destino_seccion:req.body.destino_seccion,
                    fecha_hora:new Date(),
                    cantidad:req.body.cant-req.body.cantMov,
                    estado:req.body.estado
                }

                const mov2:IMov = {

                    id_articulo:req.body.id_articulo,
                    destino_seccion:req.body.destino_seccion,
                    fecha_hora:new Date(),
                    cantidad:req.body.cantMov
                }
        
                await db.query("insert into movimiento set ?",[mov]);

                await db.query("insert into movimiento set ?",[mov2]);
            }
        }
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

        const disp = await db.query("select * from mov_disponible where destino_seccion = ? and id_art = ?", [req.body.destino_seccion, req.body.id_articulo]);

        if (disp[0]) {

            const movDisp = {

                fecha_hora:new Date(),
                cant:Number(req.body.cantidad) + Number(disp[0].cant),
            }

            await db.query("update mov_disponible set ? where id_md = ?",[movDisp, disp[0].id_md]);
            
        }else{

            const movDisp = {

                id_art:req.body.id_articulo,
                estado:req.body.estado,
                destino_seccion:req.body.destino_seccion,
                fecha_hora:new Date(),
                cant:req.body.cantidad,
            }
            
            await db.query("insert into mov_disponible set ?",[movDisp]);
            
        }
    
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
