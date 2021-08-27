import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { ZamenaComponent } from './zamena/zamena.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NastavnikComponent,
    DetaljiComponent,
    ZamenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
