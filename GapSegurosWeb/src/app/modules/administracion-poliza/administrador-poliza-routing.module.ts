import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionPolizaComponent } from './administracion-poliza.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdministracionPolizaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionPolizaRoutingModule { }
