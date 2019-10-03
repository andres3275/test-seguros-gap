import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PaginaNoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaNoEncontradaRoutingModule { }
