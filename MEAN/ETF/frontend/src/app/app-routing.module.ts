import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetaljiComponent } from './detalji/detalji.component';
import { LoginComponent } from './login/login.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { ZamenaComponent } from './zamena/zamena.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"nastavnik", component:NastavnikComponent},
  {path:"detalji", component:DetaljiComponent},
  {path:"zamene", component:ZamenaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
