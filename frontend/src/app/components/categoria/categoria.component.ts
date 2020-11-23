import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../services/categoria.service";
import { FormBuilder, FormGroup,Form } from "@angular/forms";
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  getCat = [];
   formCat:FormGroup;

  constructor(private caService:CategoriaService,private fb: FormBuilder) {

    this.formCat = this.fb.group({

      descripcion:['']

    });
   }

  ngOnInit(): void {
    this.listarCategoria();
  }
  listarCategoria(){
    this.caService.getCategoria().subscribe(
      resultado => this.getCat = resultado,
      error => console.log(error)
    )
  }
  guardarCategoria(){
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
