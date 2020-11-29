import { Component, OnInit } from '@angular/core';
import { MovimientoService } from "../../services/movimiento.service";

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  getMov = [];

  constructor(private movService:MovimientoService) { }

  ngOnInit(): void {

    this.listarMovimiento();
  }

  listarMovimiento(){

    this.movService.getMovimiento().subscribe(

      resultado => this.getMov = resultado,
      error => console.log(error)
    )
  }
}
