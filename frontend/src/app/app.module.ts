import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FormCategoriaComponent } from './components/form-categoria/form-categoria.component';
import { FormSeccionComponent } from './components/form-seccion/form-seccion.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    ArticuloComponent,
    CategoriaComponent,
    SeccionComponent,
    FormCategoriaComponent,
    FormSeccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
