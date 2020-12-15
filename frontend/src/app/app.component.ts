import { Component } from '@angular/core';
import { AutenticacionService } from "./services/autenticacion.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (public autService:AutenticacionService){


  }
  title = 'frontend';
}
