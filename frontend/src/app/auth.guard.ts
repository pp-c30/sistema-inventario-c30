import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from "./services/autenticacion.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router, private autService:AutenticacionService){


  }

  canActivate(){

    if (this.autService.verificarUsuarioLogueado()==true) {
      return true;
    }else{

      this.route.navigate(['/login']);
      return false;
    }
  }
}
