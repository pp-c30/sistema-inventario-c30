import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './components/body/body.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from './components/registro/registro.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    ArticuloComponent,
    CategoriaComponent,
    SeccionComponent,
    MovimientoComponent,
    RegistroComponent,
    IngresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
