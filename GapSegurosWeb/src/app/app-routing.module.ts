import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RutasAplicacion } from './shared/constants/rutas-aplicacion.enum';
import { AdministracionPolizaComponent } from './modules/administracion-poliza/administracion-poliza.component';
import { AutorizadorRuta } from './shared/utils/autorizador-ruta';
import { PaginaNoEncontradaComponent } from './modules/pagina-no-encontrada/pagina-no-encontrada.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AutorizadorRuta]
  },
  {
    path: RutasAplicacion.login,
    component: LoginComponent,
    canActivate: [AutorizadorRuta]
  },
  {
    path: RutasAplicacion.administrarPoliza,
    component: AdministracionPolizaComponent,
    canActivate: [AutorizadorRuta]
  },
  {
    path: '**',
    component: PaginaNoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
