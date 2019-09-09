import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministracionPolizaModule } from './modules/administracion-poliza/administracion-poliza.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { PeticionSalidaCabeceraInterceptor } from './shared/utils/peticion-salida-cabecera.httpinterceptor';
import { AlmacenamientoLocalService } from './shared/services/almacenamiento-local.service';
import { PaginaNoEncontradaComponent } from './modules/pagina-no-encontrada/pagina-no-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaNoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdministracionPolizaModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [
    AlmacenamientoLocalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PeticionSalidaCabeceraInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
