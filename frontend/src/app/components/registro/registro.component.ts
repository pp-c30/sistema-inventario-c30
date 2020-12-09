import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro:FormGroup;

  constructor(private route:Router, private fb:FormBuilder, private autService:AutenticacionService) {

    this.formRegistro = this.fb.group({

      username:['',[Validators.required]],
      password:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  ngOnInit(): void {
  }

  registrar(){

    this.autService.register(this.formRegistro.value).subscribe(
      respuesta => {
        localStorage.setItem('token',String(respuesta));
        this.formRegistro.reset();
        this.route.navigate(['/home']);
      }
    )
  }
}
