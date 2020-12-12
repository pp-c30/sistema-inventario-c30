export interface IArt {

    id_articulo?:number;
    categoria:number;
    cant_total:number;
    cant:number;
    fecha_alta:any;
    fecha_baja?:Date;
    descripcion:string;
    seccion:number;
    estado:boolean;
    valor:string;
    img?:string;
    origen:string;
    public_id:string;
    day?:number;
    month?:number;
    year?:number;
    id_categoria?:number;
    id_seccion?:number;
}