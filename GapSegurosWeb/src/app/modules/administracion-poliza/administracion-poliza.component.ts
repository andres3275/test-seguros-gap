import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { TipoRiesgoService } from "src/app/shared/services/tipo-riesgo.service";
import { TipoCubrimientoService } from "src/app/shared/services/tipo-cobertura.service";
import { EstadoPolizaService } from "./estado-poliza.service";
import { AdministracionPolizaService } from "./administracion-poliza.service";
import { Subject } from "rxjs";
import { Poliza } from "src/app/shared/interfaces/poliza.model";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-administracion-poliza",
  templateUrl: "./administracion-poliza.component.html",
  styleUrls: ["./administracion-poliza.component.css"]
})
export class AdministracionPolizaComponent implements OnInit, OnDestroy {
  private _subscripcionFinalizada$ = new Subject();

  constructor(
    private _usuarioService: UsuarioService,
    private _tipoRiesgoService: TipoRiesgoService,
    private _tipoCubrimientoService: TipoCubrimientoService,
    private _estadoPolizaService: EstadoPolizaService,
    private _polizaService: AdministracionPolizaService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._subscripcionFinalizada$.next();
    this._subscripcionFinalizada$.complete();
  }
}
