import {conexion} from '../database';
import {Request, Response} from "express";
import {IArt} from "../models/articulo";
import cloudinary from "cloudinary";
import fs from "fs-extra";

cloudinary.v2.config ({
    cloud_name:'dcbnlcpb6',
    api_key:'188895581713543',
    api_secret:'Gq1EHc8G4xzv7W-QZxPhYTSM75Q'
});
export class ArticuloController {
    
    public async listarArticulo(req:Request, res:Response){

        const db = await conexion();
        
        let mov = await db.query('select * from articulo');
        
        return res.json(mov);
    }
    
    public async guardarArticulo(req:Request, res:Response){

        try {

        const db = await conexion();

        const url_img = req.file.path;
        //se busca la imagen en la carpeta upload para luego subirla a cloudinary
       const resultado_cloud = await cloudinary.v2.uploader.upload(req.file.path);
         console.log(resultado_cloud);

        //se guarda datos en la base

        const guardarArticulo:IArt = {
            categoria:Number(req.body.categoria),
            cant_total:Number(req.body.cant_total),
            cant:Number(req.body.cant),
            fecha_alta:req.body.fecha_alta,
            descripcion:req.body.descripcion,
            seccion:Number(req.body.seccion),
            estado:Number(req.body.estado),
            valor:parseFloat(req.body.valor),
            img:resultado_cloud.url,
            public_id:resultado_cloud.public_id,
            origen:req.body.origen
        }

        await db.query("insert into articulo set ?",[guardarArticulo]);

        fs.unlink(req.file.path);
    
        res.json('El articulo fue archivado exitosamente');
        }catch(error)
        {
            res.json('Error al guardar un artículo');
            console.log(error);
        }
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
