import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { RutasAplicacion } from './shared/constants/rutas-aplicacion.enum';
import { AutorizadorRuta } from './shared/utils/autorizador-ruta';
import { PaginaNoEncontradaModule } from './modules/pagina-no-encontrada/pagina-no-encontrada.module';
import { LoginModule } from './modules/login/login.module';
import { AdministracionPolizaModule } from './modules/administracion-poliza/administracion-poliza.module';
import { CustomPreloader } from './shared/utils/custom-preloader';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/login/login.module').then(m => LoginModule),
    canActivate: [AutorizadorRuta],
    data:{
      preload:true
    }
  },
  {
    path: RutasAplicacion.login,
    loadChildren: () => import('./modules/login/login.module').then(m => LoginModule),
    canActivate: [AutorizadorRuta]
  },
  {
    path: RutasAplicacion.administrarPoliza,
    loadChildren: () => import('./modules/administracion-poliza/administracion-poliza.module').then(m => AdministracionPolizaModule),
    canActivate: [AutorizadorRuta]
  },
  {
    path: '**',
    loadChildren: () => import('./modules/pagina-no-encontrada/pagina-no-encontrada.module').then(m => PaginaNoEncontradaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloader})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
