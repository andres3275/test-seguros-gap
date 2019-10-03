import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada.component';
import { PaginaNoEncontradaRoutingModule } from './pagina-no-encontrada-routing.module';



@NgModule({
  declarations: [PaginaNoEncontradaComponent],
  imports: [
    CommonModule,
    PaginaNoEncontradaRoutingModule
  ]
})
export class PaginaNoEncontradaModule { }
