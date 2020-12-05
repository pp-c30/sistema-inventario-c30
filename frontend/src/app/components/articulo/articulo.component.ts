import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../services/categoria.service";
import { SeccionService } from "../../services/seccion.service";
/*import { MovimientoService } from "../../services/movimiento.service";*/
import { ArticuloService } from "../../services/articulo.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IArt } from 'src/app/models/articulo';
import { NgxSpinnerService } from "ngx-spinner";

interface HTMLInputEvent{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  show = true;
  display = 'display:none';
  op = false;

  getCat = [];
  getSec = [];
  getArt = [];
  formArt: FormGroup; 
  file: File;
  imgPreview: string | ArrayBuffer;

  buscarArt:any;

  constructor(/*private movService:MovimientoService, */private spinner:NgxSpinnerService, private caService:CategoriaService, private seService:SeccionService, private artService:ArticuloService, private fb: FormBuilder) { 

    this.formArt = this.fb.group({

      id_articulo:[''],
      categoria:[0,[Validators.required]],
      cant_total:['',[Validators.required]],
      cant:[''],
      fecha_alta:['',[Validators.required]],
      fecha_baja:[''],
      descripcion:[''],
      seccion:[0,[Validators.required]],
      estado:[''],
      valor:['',[Validators.required]],
      img:[''],
      origen:['',[Validators.required]]
    })
  }
  // esto se inicia cuando arranca el componente
  ngOnInit(): void {
    this.listarCategoria();
    this.listarSeccion();
    this.listarArticulos();
    this.formArt.get('categoria').setValue(0);
    this.formArt.get('seccion').setValue(0);
  }

  btnNuevoArt(){

    this.display = 'display:none';
    this.imgPreview = '';
    this.formArt.reset();
    this.formArt.get('categoria').setValue(0);
    this.formArt.get('seccion').setValue(0);
  }

  btnModoEdicion(){

    this.op = !this.op;
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

    if(this.formArt.value.id_articulo){

      this.spinner.show();

    //Actualizar
      this.artService.updateArticulo(this.formArt.value,this.file).subscribe(
        resultado=>{
          console.log(resultado);
          this.imgPreview = '';
          this.formArt.reset();
          this.listarArticulos();
      this.spinner.hide();

        },
        error=> console.log(error)
        
      )

    }else{

      this.spinner.show();
      //Guardar
    console.log(this.formArt.value);
    this.artService.saveArticulo(this.formArt.value,this.file).subscribe(
      resultado=>{
        console.log(resultado);
        this.imgPreview = '';
        this.formArt.reset();
        this.listarArticulos();
    this.spinner.hide();

      },
      error=>{
        console.log(error);
      }
    )

    }

    
  }
/*
  guardarMovimiento(articulo:IArt){

    this.movService.saveMovimiento(this.formArt.value).subscribe(

      resultado => {

        console.log(resultado);
        this.formArt.reset();
      },
      error => console.log(error)
    )
  }
  */
  editarArticulo(articulo:IArt){

    this.display = 'display:block';

    this.formArt.setValue({

      id_articulo:articulo.id_articulo,
      categoria:articulo.id_categoria,
      seccion:articulo.id_seccion,
      cant:articulo.cant,
      cant_total:articulo.cant_total,
      descripcion:articulo.descripcion,
      estado:articulo.estado,
      fecha_alta:{year:Number(articulo.year),month:Number(articulo.month),day:Number(articulo.day)},
      valor:articulo.valor,
      origen:articulo.origen,
      fecha_baja:articulo.fecha_baja,
      img:''
    });
    this.imgPreview = articulo.img;
  }

  eliminarArticulo(articulo:IArt){

    if(confirm('¿Esta seguro que desea eliminar este Articulo?')){

      this.spinner.show();
      this.artService.deleteArticulo(articulo).subscribe(

      resultado => {

        console.log(resultado)
        this.listarArticulos();
        this.spinner.hide();
      },
      error => {

        console.log(error)
      }
    )
  }
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
