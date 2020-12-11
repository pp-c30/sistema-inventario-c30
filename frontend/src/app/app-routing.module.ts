import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { IngresoComponent } from "./components/ingreso/ingreso.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { AuthGuard } from "./auth.guard";
import { MovimientoComponent } from './components/movimiento/movimiento.component';

const routes: Routes = [

  {
    path:'', redirectTo:'/login',
    pathMatch:'full'
  },
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
  },
  {
    path:'movimientos/:id_articulo',
    component:MovimientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
