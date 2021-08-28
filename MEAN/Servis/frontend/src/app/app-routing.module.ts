import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RadnikComponent } from './radnik/radnik.component';
import { ServiserComponent } from './serviser/serviser.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"radnik", component: RadnikComponent},
  {path:"serviser", component: ServiserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
