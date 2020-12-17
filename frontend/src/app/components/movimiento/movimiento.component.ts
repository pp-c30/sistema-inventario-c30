import { Component, OnInit } from '@angular/core';
import { MovimientoService } from "../../services/movimiento.service";
import { IMov } from "../../models/movimiento";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SeccionService } from "../../services/seccion.service";
import { AutenticacionService } from "../../services/autenticacion.service";
import { IDisp } from 'src/app/models/disponible';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  getMov:IMov[] = [];
  listDisp:IDisp[] = [];
  id_articulo:Number;
  formMov:FormGroup;
  getSec = [];
  buscar1:any;
  buscar2:any;

  constructor(public autService:AutenticacionService, private seService:SeccionService, private fb:FormBuilder, private activated:ActivatedRoute, private movService:MovimientoService) {

    this.formMov = this.fb.group({

      id_md:[null],
      id_articulo:[null],
      destino_seccion:[0],
      fecha_hora:[null],
      cant:[null],
      cantMov:[null],
      estado:[-1],
      estado_origen:[null],
      destino_seccion_origen:[null]
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
    this.listarMovDisp();
    this.formMov.get('destino_seccion').setValue(0);
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

  listarMovDisp(){

    this.movService.getMovDisp(this.id_articulo).subscribe(

      resultado => {

        this.listDisp = resultado
      }, error => {

        console.log(error)
      }
    )}

  btnMovimiento(id_md:Number, id_articulo:Number, cant:Number, estado_origen:Number, destino_seccion_origen:Number){

    this.formMov.get('id_md').setValue(id_md);
    this.formMov.get('id_articulo').setValue(id_articulo);
    this.formMov.get('cant').setValue(cant);
    this.formMov.get('estado_origen').setValue(estado_origen);
    this.formMov.get('destino_seccion_origen').setValue(destino_seccion_origen);
    this.formMov.get('destino_seccion').setValue(0);
    this.formMov.get('estado').setValue(0);
  }

  guardarMovimiento(){

    this.movService.saveModDisp(this.formMov.value).subscribe(
      respuesta=>{

        this.formMov.reset();
        this.formMov.get('destino_seccion').setValue(0);
        this.listarMovDisp();
        this.listarMovimiento();
        console.log(respuesta);
      },error=>{

        console.log(error);
      }
    )
  }
}
