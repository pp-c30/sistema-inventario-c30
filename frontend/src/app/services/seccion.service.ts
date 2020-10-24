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

}
