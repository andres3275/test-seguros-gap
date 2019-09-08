import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministracionPolizaService } from "./administracion-poliza.service";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { TipoRiesgoService } from "src/app/shared/services/tipo-riesgo.service";
import { TipoCubrimientoService } from "src/app/shared/services/tipo-cobertura.service";
import { EstadoPolizaService } from "./estado-poliza.service";
import { AdministracionPolizaComponent } from "./administracion-poliza.component";

@NgModule({
  declarations: [AdministracionPolizaComponent],
  exports: [AdministracionPolizaComponent],
  imports: [CommonModule],
  providers: [
    AdministracionPolizaService,
    UsuarioService,
    TipoRiesgoService,
    TipoCubrimientoService,
    EstadoPolizaService
  ]
})
export class AdministracionPolizaModule {}
