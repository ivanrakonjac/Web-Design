import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadnikComponent } from './radnik/radnik.component';
import { KupacComponent } from './kupac/kupac.component';

@NgModule({
  declarations: [
    AppComponent,
    RadnikComponent,
    KupacComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
