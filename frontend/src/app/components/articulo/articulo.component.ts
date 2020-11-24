import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../services/categoria.service";
import { SeccionService } from "../../services/seccion.service";
import { ArticuloService } from "../../services/articulo.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface HTMLInputEvent{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  getCat = [];
  getSec = [];
  getArt = [];
  formArt: FormGroup; 
  file: File;
  imgPreview: string | ArrayBuffer;

  constructor(private caService:CategoriaService, private seService:SeccionService, private artService:ArticuloService, private fb: FormBuilder) { 

    this.formArt = this.fb.group({

      categoria:[0,[Validators.required]],
      cant_total:['',[Validators.required]],
      cant:[''],
      fecha_alta:['',[Validators.required]],
      descripcion:[''],
      seccion:[0,[Validators.required]],
      estado:['',[Validators.required]],
      valor:['',[Validators.required]],
      img:[''],
      origen:['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.listarCategoria();
    this.listarSeccion();
    this.listarArticulos();
    this.formArt.get('categoria').setValue(0);
    this.formArt.get('seccion').setValue(0);
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

  listarArticulos(){
    this.artService.getArticulos().subscribe(
      resultado => this.getArt = resultado,
      error => console.log(error)
    )
  }

  guardarArticulo(){

    console.log(this.formArt.value);
    this.artService.saveArticulo(this.formArt.value,this.file).subscribe(
      resultado=>{
        console.log(resultado);
        this.imgPreview = '';
        this.formArt.reset();
        this.listarArticulos();
      },
      error=>{
        console.log(error);
      }
    )
  }

  showImage(evento:HTMLInputEvent){

    if (evento.target.files && evento.target.files[0]){

      this.file = evento.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {

        this.imgPreview = reader.result;
      }
      reader.readAsDataURL(this.file);
    }
  }
}
