import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WritersComponent } from './writers/writers.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {path:'about', component: AboutComponent},
  {path:'writers', component: WritersComponent},
  {path:'books', component: BooksComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
