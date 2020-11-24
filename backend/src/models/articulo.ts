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

/* 
{
  "categoria": "2",
	"cant_total": "20",
	"cant": "10",
	"fecha_alta": "2020-09-25",
	"fecha_baja": "",
	"descripcion": "esta es una descripcion",
	"seccion": "2",
	"estado": "bueno",
	"valor": "17999.99",
	"img": "puto el que lee",
	"origen": "tu vieja"
}
*/