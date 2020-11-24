import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICat } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  getCategoria(){

    return this.http.get<ICat[]>('http://localhost:3000/categoria');
  }
    saveCategoria(unCategoria:ICat){

        return this.http.post('http://localhost:3000/categoria', unCategoria);

    }
    updateCategoria(unCategoria:ICat){

      let id:number = unCategoria.id_categoria;
      return this.http.put('http://localhost:3000/categoria/'+id,unCategoria);
    }

    deleteCategoria(id:number){
      return this.http.delete('http://localhost:3000/categoria/'+id);

    }
}
 