import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RutasAplicacion } from './shared/constants/rutas-aplicacion.enum';
import { AdministracionPolizaComponent } from './modules/administracion-poliza/administracion-poliza.component';
import { AutorizadorRuta } from './shared/utils/autorizador-ruta';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: RutasAplicacion.login,
    component: LoginComponent
  },
  {
    path: RutasAplicacion.administrarPoliza,
    component: AdministracionPolizaComponent,
    canActivate: [AutorizadorRuta]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
