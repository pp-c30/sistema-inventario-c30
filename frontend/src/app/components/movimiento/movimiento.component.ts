import { Component, OnInit } from '@angular/core';
import { MovimientoService } from "../../services/movimiento.service";
import { IMov } from "../../models/movimiento";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SeccionService } from "../../services/seccion.service";
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  getMov:IMov[] = [];
  id_articulo:Number;
  formMov:FormGroup;
  getSec = [];

  constructor(public autService:AutenticacionService, private seService:SeccionService, private fb:FormBuilder, private activated:ActivatedRoute, private movService:MovimientoService) {

    this.formMov = this.fb.group({

      id_movimiento:[null],
      id_articulo:[null],
      destino_seccion:[null],
      fecha_hora:[null],
      cantidad:[null]
    })
  }

  ngOnInit(): void {

    this.activated.params.subscribe(

      params => {

        this.id_articulo = params.id_articulo;
      }, error =>{
        console.log(error);
      }
    )
    this.listarMovimiento();
    this.listarSeccion();
  }

  listarSeccion(){
    this.seService.getSeccion().subscribe(
      resultado => this.getSec = resultado,
      error => console.log(error)
    )
  }

  listarMovimiento(){

    this.movService.getMovimiento(this.id_articulo).subscribe(

      resultado => {

        this.getMov = resultado
      }, error => {

        console.log(error)
      }
    )
  }

  guardarMovimiento(){


  }
}
