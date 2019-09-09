import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministracionPolizaService } from "./administracion-poliza.service";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { TipoRiesgoService } from "src/app/shared/services/tipo-riesgo.service";
import { TipoCubrimientoService } from "src/app/shared/services/tipo-cobertura.service";
import { EstadoPolizaService } from "./estado-poliza.service";
import { AdministracionPolizaComponent } from "./administracion-poliza.component";
import { GridPolizaComponent } from "./grid-poliza/grid-poliza.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SelectorClienteComponent } from './selector-cliente/selector-cliente.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CrudPolizaComponent } from './crud-poliza/crud-poliza.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AdministracionPolizaComponent, GridPolizaComponent, SelectorClienteComponent, CrudPolizaComponent],
  exports: [AdministracionPolizaComponent],
  imports: [CommonModule, SharedModule,FormsModule,NgSelectModule,NgbModule],
  providers: [
    AdministracionPolizaService,
    UsuarioService,
    TipoRiesgoService,
    TipoCubrimientoService,
    EstadoPolizaService
  ]
})
export class AdministracionPolizaModule {}
