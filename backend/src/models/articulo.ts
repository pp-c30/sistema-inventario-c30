//  el modeles se encarga de indicar en de que tipo y en que orden son ingresados los datos
 export interface IArt {

    id_articulo?:number;
    categoria:number;
    cant_total:number;
    cant:number;
    fecha_alta:Date;
    fecha_baja?:Date;
    descripcion:string;
    seccion:number;
    estado:Number;
    valor:Number;
    img?:string;
    origen:string;
    public_id:string;
}
