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
        
        let mov = await db.query('select *,DATE_FORMAT(fecha_alta, "%d/%m/%Y") as fecha_alta, DATE_FORMAT(fecha_alta, "%d") as day, DATE_FORMAT(fecha_alta, "%m") as month, DATE_FORMAT(fecha_alta, "%Y") as year,(select descripcion from categoria where id_categoria = a.categoria) as categoria, categoria as id_categoria, seccion as id_seccion,(select nombre_seccion from seccion where id_seccion = a.seccion) as seccion from articulo a');
        
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
            console.log(req.body.fecha_alta);
        const guardarArticulo:IArt = {
            categoria:Number(req.body.categoria),
            cant_total:Number(req.body.cant_total),
            cant:Number(req.body.cant),
            fecha_alta:String(req.body.fecha_alta),
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

        let id_articulo = req.params.id_articulo;

        let public_id = req.params.public_id;

        await cloudinary.v2.uploader.destroy(public_id);
        
        const db = await conexion();
        
        await db.query("delete from articulo where id_articulo = ?", [id_articulo]);

        return res.json('El articulo se eliminó con exito');
    }

    public async actualizarArticulo(req:Request, res:Response){

        try {

            const db = await conexion();

            let id_articulo = req.params.id_articulo;

            var updateArticulo;

            var public_id_anterior = req.body.public_id

            if(req.file){

                const resultado_cloud = await cloudinary.v2.uploader.upload(req.file.path);

                updateArticulo = {

                    categoria:req.body.categoria,
                    seccion:req.body.seccion,
                    cant:req.body.cant,
                    cant_total:req.body.cant_total,
                    descripcion:req.body.descripcion,
                    estado:req.body.estado,
                    fecha_alta:req.body.fecha_alta,
                    valor:req.body.valor,
                    origen:req.body.origen,
                    fecha_baja:req.body.fecha_baja,
                    img:resultado_cloud.url,
                    public_id:resultado_cloud.public_id,

                
                }

                await db.query('update articulo set ? where id_articulo = ?',[updateArticulo, id_articulo]);
                
                fs.unlink(req.file.path);

                await cloudinary.v2.uploader.destroy(public_id_anterior);

                return res.json('El articulo se actualizó con exito');
            }else{

                updateArticulo = {
                    categoria:req.body.categoria,
                    seccion:req.body.seccion,
                    cant:req.body.cant,
                    cant_total:req.body.cant_total,
                    descripcion:req.body.descripcion,
                    estado:req.body.estado,
                    fecha_alta:req.body.fecha_alta,
                    valor:req.body.valor,
                    origen:req.body.origen,
                    fecha_baja:req.body.fecha_baja        
                }

                await db.query('update articulo set ? where id_articulo = ?', [updateArticulo,id_articulo]);

                return res.json('El articulo se actualizó con exito');
            }
            
        } 
        catch (error) {

            console.log(error);
        }


        
    }

    public async obtenerArticulo(req:Request, res:Response){

        const db = await conexion();

        let id_articulo = req.params.id_articulo;

        let unArticulo = await db.query("select * from articulo where id_articulo = ?", [id_articulo]);

        return res.json(unArticulo[0]);
    }
}
