export interface IArt {

    id_articulo?:number;
    categoria:number;
    cant_total:number;
    cant:number;
    fecha_alta:Date;
    fecha_baja?:Date;
    descripcion:string;
    seccion:number;
    estado:boolean;
    valor:string;
    img:string;
    origen:string;
}