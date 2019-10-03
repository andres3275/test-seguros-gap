import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PeticionSalidaCabeceraInterceptor } from './shared/utils/peticion-salida-cabecera.httpinterceptor';
import { AlmacenamientoLocalService } from './shared/services/almacenamiento-local.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
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
