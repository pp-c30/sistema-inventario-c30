import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(public autService:AutenticacionService) { }

  ngOnInit(): void {
  }

}
