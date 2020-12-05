import { Response, Request } from "express";
import { conexion } from "../database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AutenticacionController {

    constructor() {
        
    }

    async registrar (req:Request,res:Response){

        const salt = await bcrypt.genSalt(10);

        const password_cifrada = await bcrypt.hash(req.body.password,salt);

        const unUsuario = {
            username:req.body.username,
            password:password_cifrada,
            email:req.body.email
        }

        const db = await conexion();

        const resultado = await db.query('insert into usuario set ?',[unUsuario]);

        const token:string = jwt.sign({_id:resultado.insertId},process.env.TOKEN_SECRET || 'Puto_el_que_lee');

        res.json(token);
    }

    async ingresar (req:Request,res:Response){

        const db = await conexion();

        const usuario = await db.query('selecto * from usuario where username = ?', [req.body.username])

        if (!usuario[0]) {
            
            res.json('Usuario o contraseña incorrecta')
        }else{

            const correctPassword = await bcrypt.compare(req.body.password, usuario[0].password)

            if (!correctPassword) {
                
                res.json('Contraseña incorrecta');
            }else{

                const token:string = jwt.sign({_id:usuario[0].id_usuario},process.env.TOKEN_SECRET || 'Puto_el_que_lee',{
                    expiresIn:60*60*24
                });

                res.header('auth-token',token).json(usuario[0]);
            }
        }
    }
}