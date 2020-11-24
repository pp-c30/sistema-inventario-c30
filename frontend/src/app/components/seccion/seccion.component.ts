import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Form } from "@angular/forms";
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

      nombre_seccion:['']

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
