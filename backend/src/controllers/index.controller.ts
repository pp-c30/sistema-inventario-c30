import { Response, Request } from "express";

export function mensaje_bienvenida(req:Request, res:Response){

    res.json("esta es la ruta principal")
}