import { Component, OnInit } from '@angular/core';
import { ArticuloService } from "../../services/articulo.service";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  getArt = [];

  constructor(private arService:ArticuloService) { }

  ngOnInit(): void {
    this.listarArticulos();
  }

  listarArticulos(){
    this.arService.getArticulos().subscribe(
      resultado => this.getArt = resultado,
      error => console.log(error)
    )
  }

}
