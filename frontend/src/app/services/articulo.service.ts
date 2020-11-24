import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IArt } from "../models/articulo";

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }
  
  getArticulos(){

    return this.http.get<IArt[]>('http://localhost:3000/articulo');
  }

  saveArticulo(unArt:IArt,file:File){

    const fd = new FormData();
    
    fd.append('img',file);
    fd.append('cant',String(unArt.cant));
    fd.append('cant_total',String(unArt.cant_total));
    fd.append('fecha_alta',String(unArt.fecha_alta));
    fd.append('descripcion',unArt.descripcion);
    fd.append('seccion',String(unArt.seccion));
    fd.append('estado',String(unArt.estado));
    fd.append('valor',unArt.valor);
    fd.append('origen',unArt.origen);
    fd.append('categoria',String(unArt.categoria));

    return this.http.post('http://localhost:3000/articulo',fd);
  }

  updateArticulo(unArt:IArt,file:File){

    const fd = new FormData();

    let id_articulo = unArt.id_articulo;

    fd.append('cant',String(unArt.cant));
    fd.append('cant_total',String(unArt.cant_total));
    fd.append('fecha_alta',String(unArt.fecha_alta));
    fd.append('descripcion',unArt.descripcion);
    fd.append('seccion',String(unArt.seccion));
    fd.append('estado',String(unArt.estado));
    fd.append('valor',unArt.valor);
    fd.append('origen',unArt.origen);
    fd.append('categoria',String(unArt.categoria));
    fd.append('img',file);
    fd.append('public_id',unArt.public_id);

    return this.http.put('http://localhost:3000/articulo/'+id_articulo,fd);

  }

}
