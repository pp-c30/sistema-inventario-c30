import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../services/categoria.service";
import { SeccionService } from "../../services/seccion.service";

@Component({
  selector: 'app-form-articulo',
  templateUrl: './form-articulo.component.html',
  styleUrls: ['./form-articulo.component.css']
})
export class FormArticuloComponent implements OnInit {

  getCat = [];
  getSec = [];

  constructor(private caService:CategoriaService, private seService:SeccionService) { }

  ngOnInit(): void {
    this.listarCategoria();
    this.listarSeccion();
  }

  listarCategoria(){
    this.caService.getCategoria().subscribe(
      resultado => this.getCat = resultado,
      error => console.log(error)
    )
  }
  listarSeccion(){
    this.seService.getSeccion().subscribe(
      resultado => this.getSec = resultado,
      error => console.log(error)
    )
  }

}
