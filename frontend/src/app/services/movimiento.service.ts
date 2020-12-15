import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IMov } from '../models/movimiento';
import { IDisp } from '../models/disponible';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http:HttpClient) { }

  getMovimiento(id_articulo:Number){

    return this.http.get<IMov[]>('http://localhost:3000/movimiento/'+id_articulo);
  }

  getMovDisp(id_art:Number){

    return this.http.get<IDisp[]>('http://localhost:3000/mov_disponible/'+id_art);
  }

  saveMovimiento(unMovimiento:IMov){

    return this.http.post('http://localhost:3000/movimiento', unMovimiento);
  }

  saveModDisp(movDisp:IDisp){

    return this.http.post('http://localhost:3000/mov_disponible', movDisp);

  }
}
