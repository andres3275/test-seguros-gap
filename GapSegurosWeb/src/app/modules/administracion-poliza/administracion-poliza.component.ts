import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { TipoRiesgoService } from "src/app/shared/services/tipo-riesgo.service";
import { TipoCubrimientoService } from "src/app/shared/services/tipo-cobertura.service";
import { EstadoPolizaService } from "./estado-poliza.service";
import { AdministracionPolizaService } from "./administracion-poliza.service";
import { Subject, Observable } from "rxjs";
import { Poliza } from "src/app/shared/interfaces/poliza.model";
import { takeUntil, map } from "rxjs/operators";
import { TableConfiguration } from "src/app/shared/interfaces/table-configuration";
import { PolizaViewModel } from "src/app/shared/interfaces/poliza-view-model.model";
import Swal from "sweetalert2";
import * as HttpStatus from "http-status-codes";
import { ocultarLoading, mostrarLoading } from 'src/app/shared/utils/utilidades';

@Component({
  selector: "app-administracion-poliza",
  templateUrl: "./administracion-poliza.component.html",
  styleUrls: ["./administracion-poliza.component.css"]
})
export class AdministracionPolizaComponent implements OnInit, OnDestroy {
  private _subscripcionFinalizada$ = new Subject();
  public tablaPolizasConfiguration: TableConfiguration;
  public polizas: PolizaViewModel[];

  constructor(
    private _usuarioService: UsuarioService,
    private _tipoRiesgoService: TipoRiesgoService,
    private _tipoCubrimientoService: TipoCubrimientoService,
    private _estadoPolizaService: EstadoPolizaService,
    private _polizaService: AdministracionPolizaService
  ) {
    this.configurarTablas();
  }

  ngOnInit() {
   this.cargarInformacionAdministracionPolizas();
  }

  ngOnDestroy(): void {
    this._subscripcionFinalizada$.next();
    this._subscripcionFinalizada$.complete();
  }

  private consultarPolizas(): Observable<PolizaViewModel[]> {
    return this._polizaService.consultarPolizas().pipe(
      map((resultado: PolizaViewModel[]) => {
        this.polizas = resultado;
        return resultado;
      })
    );
  }

  private cargarInformacionAdministracionPolizas():void{
    mostrarLoading();
    this.consultarPolizas()
    .pipe(takeUntil(this._subscripcionFinalizada$))
    .subscribe(
      () => {
        ocultarLoading();
      },
      (error: any) => {
        console.log(error);
        this.procesarError(error);
      }
    );
  }

  private procesarError(error: any): void {
    let mensaje: string;
    switch (error.status) {
      case HttpStatus.NOT_FOUND: {
        mensaje = "No hay Polizas Registradas en el sistema.";
        break;
      }
      case HttpStatus.INTERNAL_SERVER_ERROR: {
        mensaje = error.error;
        break;
      }
      default: {
        mensaje = "Ha ocurrido un error.";
        break;
      }
    }
    Swal.fire("Advertencia", mensaje, "warning");
  }

  private configurarTablas(): void {
    this.tablaPolizasConfiguration = {
      filtro: true,
      paginador: true,
      pageSizeOptions: [5, 10, 25, 100, 1000],
      displayedColumns: [
        "Nombre",
        "Descripcion",
        "TipoCubrimiento",
        "Cobertura",
        "TipoRiesgo",
        "FechaInicioVigencia",
        "DuracionMesesCobertura",
        "Precio",
        "EstadoPoliza",
        "Cliente"
      ]
    };
  }
}
