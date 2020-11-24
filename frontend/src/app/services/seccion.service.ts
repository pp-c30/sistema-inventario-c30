import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISec } from '../models/seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private http:HttpClient) { }

  getSeccion(){

    return this.http.get<ISec[]>('http://localhost:3000/seccion');
  }
  saveSeccion(unSeccion:ISec){

    return this.http.post('http://localhost:3000/seccion', unSeccion);

}
updateSeccion(unSeccion:ISec){

  let id:number = unSeccion.id_seccion;
  return this.http.put('http://localhost:3000/seccion/'+id,unSeccion);
}

deleteSeccion(id:number){
  return this.http.delete('http://localhost:3000/seccion/'+id);

}
}
