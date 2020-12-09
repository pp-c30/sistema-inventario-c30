import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { IngresoComponent } from "./components/ingreso/ingreso.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [

  {
    path:'login',
    component:IngresoComponent
  },
  {
    path:'home',
    component:BodyComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
