import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Form,Validators } from "@angular/forms";
import { ISec } from 'src/app/models/seccion';
import { SeccionService } from "../../services/seccion.service";
@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  getSec = [];
  formSec:FormGroup;


  constructor(private seService:SeccionService,private fb: FormBuilder) { 

    this.formSec = this.fb.group({
      id_seccion:[null],
      nombre_seccion:['', [Validators.required,Validators.minLength(3)]]

    });
  }

  ngOnInit(): void {
    this.listarSeccion();
  }

  listarSeccion(){
    this.seService.getSeccion().subscribe(
      resultado => this.getSec = resultado,
      error => console.log(error)
    )
  }
  guardarSeccion(){

    if(this.formSec.value.id_seccion)
    {
      //actualiza
      this.seService.updateSeccion(this.formSec.value).subscribe(
        respuesta=>{
          console.log('respuesta');
          this.listarSeccion();
          this.formSec.reset();
        },
        error=>console.log(error)
      )

    }else{

      this.seService.saveSeccion(this.formSec.value).subscribe(
    
        resultado=>{
          console.log(resultado)
          //refresca la grilla
          this.listarSeccion();
          this.formSec.reset();
        },
        error => console.log(error)
      );

    }

}
  editarSeccion(seccion:ISec)
  {

   this.formSec.setValue(seccion);
  }  

    eliminarSeccion(id:number)
    {

          if(confirm('¿Esta seguro que desea eliminar la seccion?')){
            this.seService.deleteSeccion(id).subscribe(
              respuesta => {
                console.log(respuesta);
                this.listarSeccion();
              },
              error=>console.log(error)
           );
 
          }
        
    }

}