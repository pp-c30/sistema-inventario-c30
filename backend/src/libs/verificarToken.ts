import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function validarToken(req:Request,res:Response,next:NextFunction){

    const token:any = req.header('auth.token');

    if (!token) {
        
        res.json('Acceso denegado')
    }

    const datosToken = jwt.verify(token,process.env.TOKEN_SECRET || 'Puto_el_que_lee');

    console.log(datosToken);

    next();
}