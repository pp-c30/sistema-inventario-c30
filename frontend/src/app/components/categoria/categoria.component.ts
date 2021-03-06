import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../services/categoria.service";
import { FormBuilder, FormGroup,Form, Validators } from "@angular/forms";
import { ICat } from 'src/app/models/categoria';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  getCat = [];
  formCat:FormGroup;
// formgrup nos permite construir el formulario/ crea una instancia de caService 
  constructor(private caService:CategoriaService,private fb: FormBuilder) {

    this.formCat = this.fb.group({

      id_categoria:[null],

      descripcion:['', [Validators.required,Validators.minLength(3)]]

    });
   }

  ngOnInit(): void {
    this.listarCategoria();
  }

  btnreset(){

    this.formCat.reset();
  }

  listarCategoria(){
    this.caService.getCategoria().subscribe(
      resultado => this.getCat = resultado,
      error => console.log(error)
    )
  }
  guardarCategoria(){

      if(this.formCat.value.id_categoria)
      {
        //actualiza
        this.caService.updateCategoria(this.formCat.value).subscribe(
          respuesta=>{
            console.log('respuesta');
            this.listarCategoria();
            this.formCat.reset();
          },
          error=>console.log(error)
        )

      }else{

        this.caService.saveCategoria(this.formCat.value).subscribe(
      
          resultado=>{
            console.log(resultado)
            //refresca la grilla
            this.listarCategoria();
            this.formCat.reset();
          },
          error => console.log(error)
        );

      }

 }
    editarCategoria(categoria:ICat)
    {

     this.formCat.setValue(categoria);
    }  

      eliminarCategoria(id:number)
      {

            if(confirm('¿Esta seguro que desea eliminar la categoria?')){
              this.caService.deleteCategoria(id).subscribe(
                respuesta => {
                  console.log(respuesta);
                  this.listarCategoria();
                },
                error=>console.log(error)
             );
   
            }
          
      }

}
