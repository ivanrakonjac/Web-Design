import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspektorComponent } from './inspektor/inspektor.component';
import { KandidatComponent } from './kandidat/kandidat.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "kandidat", component: KandidatComponent},
  {path: "inspektor", component: InspektorComponent},
  {path: "", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
