import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoKnjigaComponent } from './info-knjiga/info-knjiga.component';
import { KupacComponent } from './kupac/kupac.component';
import { RadnikComponent } from './radnik/radnik.component';

const routes: Routes = [
  {path:"kupac", component: KupacComponent},
  {path:"radnik", component: RadnikComponent},
  {path:"infoKnjiga", component: InfoKnjigaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
