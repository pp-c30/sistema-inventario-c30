export interface IMov{

    id_movimiento?:number;
    id_articulo:number;
    destino_seccion:number;
    fecha_hora:Date;
    cantidad:number;
    estado:number;
}
/*
"id_movimiento": "1",
"id_articulo": "1",
"destino_seccion": "2",
"fecha_hora": "2020-09-26"
*/