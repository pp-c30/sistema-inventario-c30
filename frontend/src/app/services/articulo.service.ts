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

}
