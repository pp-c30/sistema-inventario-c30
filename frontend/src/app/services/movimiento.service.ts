import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IMov } from '../models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http:HttpClient) { }

  getMovimiento(id_articulo:Number){

    return this.http.get<IMov[]>('http://localhost:3000/movimiento/'+id_articulo);
  }

  saveMovimiento(unMovimiento:IMov){

    return this.http.post('http://localhost:3000/movimiento', unMovimiento);
  }
}
