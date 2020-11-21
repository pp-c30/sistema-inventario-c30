import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../services/categoria.service";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  getCat = [];

  constructor(private arService:CategoriaService) { }

  ngOnInit(): void {
    this.listarCategoria();
  }
  listarCategoria(){
    this.arService.getCategoria().subscribe(
      resultado => this.getCat = resultado,
      error => console.log(error)
    )
  }

}
