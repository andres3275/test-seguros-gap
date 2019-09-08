import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { TipoRiesgoService } from "src/app/shared/services/tipo-riesgo.service";
import { TipoCubrimientoService } from "src/app/shared/services/tipo-cobertura.service";
import { EstadoPolizaService } from "./estado-poliza.service";
import { AdministracionPolizaService } from "./administracion-poliza.service";
import { Subject, Observable, forkJoin, throwError } from "rxjs";
import { Poliza } from "src/app/shared/interfaces/poliza.model";
import { takeUntil, map, catchError } from "rxjs/operators";
import { TableConfiguration } from "src/app/shared/interfaces/table-configuration";
import { PolizaViewModel } from "src/app/shared/interfaces/poliza-view-model.model";
import Swal from "sweetalert2";
import * as HttpStatus from "http-status-codes";
import {
  ocultarLoading,
  mostrarLoading
} from "src/app/shared/utils/utilidades";
import { Usuario } from "src/app/shared/interfaces/usuario.model";
import { EstadosPoliza } from "src/app/shared/constants/estados-poliza.enum";

@Component({
  selector: "app-administracion-poliza",
  templateUrl: "./administracion-poliza.component.html",
  styleUrls: ["./administracion-poliza.component.css"]
})
export class AdministracionPolizaComponent implements OnInit, OnDestroy {
  private _subscripcionFinalizada$ = new Subject();
  public tablaPolizasConfiguration: TableConfiguration;
  public polizas: PolizaViewModel[];
  public clientes: Usuario[];
  private _existeErrorConsultaPolizas: boolean;
  private _existeErrorConsultaClientes: boolean;
  private _existeErrorEliminarPoliza: boolean;
  private _existeErrorGuardarCambiosPolizas: boolean;
  private _clienteSeleccionado: Usuario;
  private _polizasSeleccionadas: Poliza[];

  constructor(
    private _usuarioService: UsuarioService,
    private _tipoRiesgoService: TipoRiesgoService,
    private _tipoCubrimientoService: TipoCubrimientoService,
    private _estadoPolizaService: EstadoPolizaService,
    private _polizaService: AdministracionPolizaService
  ) {
    this.configurarTablas();
    this.inicializarVariables();
  }

  ngOnInit() {
    this.cargarInformacionAdministracionPolizas();
  }

  ngOnDestroy(): void {
    this.inicializarVariables();
    this.finalizarSubscripciones();
  }

  public onClienteSeleccionado(cliente: Usuario): void {
    this._clienteSeleccionado = cliente;
  }

  public onPolizaSeleccionada(poliza: PolizaViewModel): void {
    this.actualizarPolizasSeleccionadas(poliza);
  }

  public onCancelarPolizas(): void {
    if (this._polizasSeleccionadas && this._polizasSeleccionadas.length > 0) {
      this.CancelarPolizas();
      this.guardarCambiosPolizas();
    } else {
      Swal.fire(
        "Advertencia",
        "Debe seleccionar al menos una poliza.",
        "warning"
      );
    }
  }

  public onEditarPolizaSeleccionada(poliza: PolizaViewModel): void {
    console.log(poliza);
  }

  public onEliminarPolizaSeleccionada(poliza: PolizaViewModel): void {
    this.eliminarPoliza(poliza.id);
  }

  public onAsignarClientePolizas(): void {
    let mensajeError: string;
    mensajeError =
      !this._clienteSeleccionado || !this._clienteSeleccionado.id
        ? "Debe seleccionar el cliente primero."
        : !this._polizasSeleccionadas || this._polizasSeleccionadas.length === 0
        ? "Debe seleccionar al menos una poliza."
        : undefined;
    if (!mensajeError) {
      this.AsignarClientePolizas();
      this.guardarCambiosPolizas();
    } else {
      Swal.fire("Advertencia", mensajeError, "warning");
    }
  }

  private eliminarPoliza(id: number): void {
    mostrarLoading();
    this._polizaService
      .eliminarPoliza(id)
      .pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe(
        () => {
          this.removerPolizaEliminadaTabla(id);
          ocultarLoading();
        },
        (error: any) => {
          this._existeErrorEliminarPoliza = true;
          this.procesarError(error);
        }
      );
  }

  private removerPolizaEliminadaTabla(id: number): void {
    this.polizas = this.polizas.filter((poliza: Poliza) => poliza.id !== id);
  }

  private guardarCambiosPolizas(): void {
    mostrarLoading();
    forkJoin(
      this._polizasSeleccionadas.map((polizaSeleccionada: Poliza) =>
        this._polizaService.editarPoliza(polizaSeleccionada)
      )
    ).subscribe(
      () => {
        this.actualizarInformacionTablaPolizas();
        ocultarLoading();
        this._polizasSeleccionadas = [];
        Swal.fire("Exito", "Las polizas seleccionadas han sido actualizadas.");
      },
      (error: any) => {
        this._existeErrorGuardarCambiosPolizas = true;
        this.procesarError(error);
      }
    );
  }

  private actualizarInformacionTablaPolizas(): void {
    this.consultarPolizas()
      .pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe(
        () => {},
        (error: any) => {
          this._existeErrorConsultaPolizas = true;
          this.procesarError(error);
        }
      );
  }

  private CancelarPolizas(): void {
    this._polizasSeleccionadas.forEach((polizaSeleccionada: Poliza) => {
      polizaSeleccionada.estadoPolizaId = EstadosPoliza.cancelada;
    });
  }

  private AsignarClientePolizas(): void {
    this._polizasSeleccionadas.forEach((polizaSeleccionada: Poliza) => {
      polizaSeleccionada.usuarioId = this._clienteSeleccionado.id;
    });
  }

  private actualizarPolizasSeleccionadas(poliza: PolizaViewModel): void {
    if (
      this._polizasSeleccionadas.find(
        (polizaSeleccionada: Poliza) => polizaSeleccionada.id === poliza.id
      )
    ) {
      this.removerPolizaDeseleccionada(poliza);
    } else {
      this.agregarPolizaSeleccionada(poliza);
    }
  }

  private removerPolizaDeseleccionada(poliza: PolizaViewModel): void {
    this._polizasSeleccionadas = this._polizasSeleccionadas.filter(
      (polizaSeleccionada: Poliza) => polizaSeleccionada.id !== poliza.id
    );
  }

  private agregarPolizaSeleccionada(poliza: PolizaViewModel): void {
    this._polizasSeleccionadas.push(this.mapearPolizaViewModelAPoliza(poliza));
  }

  private mapearPolizaViewModelAPoliza(poliza: PolizaViewModel): Poliza {
    const nuevaPolizaSeleccionada: Poliza = {
      id: poliza.id,
      cobertura: poliza.cobertura,
      descripcion: poliza.descripcion,
      duracionMesesCobertura: poliza.duracionMesesCobertura,
      estadoPolizaId: poliza.estadoPolizaId,
      fechaInicioVigencia: poliza.fechaInicioVigencia,
      nombre: poliza.nombre,
      precio: poliza.precio,
      tipoCubrimientoId: poliza.tipoCubrimientoId,
      tipoRiesgoId: poliza.tipoCubrimientoId,
      usuarioId: poliza.usuarioId
    };
    return nuevaPolizaSeleccionada;
  }

  private inicializarVariables(): void {
    this._clienteSeleccionado = undefined;
    this._polizasSeleccionadas = [];
    this._existeErrorConsultaClientes = undefined;
    this._existeErrorConsultaPolizas = undefined;
    this._existeErrorEliminarPoliza = undefined;
  }

  private finalizarSubscripciones(): void {
    this._subscripcionFinalizada$.next();
    this._subscripcionFinalizada$.complete();
  }

  private consultarPolizas(): Observable<PolizaViewModel[]> {
    return this._polizaService
      .consultarPolizas()
      .pipe(
        map((resultado: PolizaViewModel[]) => {
          this.polizas = resultado;
          return resultado;
        })
      )
      .pipe(
        catchError((error: any) => {
          this._existeErrorConsultaPolizas = true;
          return throwError(error);
        })
      );
  }

  private consultarClientes(): Observable<Usuario[]> {
    return this._usuarioService
      .consultarClientes()
      .pipe(
        map((resultado: Usuario[]) => {
          this.clientes = resultado;
          return resultado;
        })
      )
      .pipe(
        catchError((error: any) => {
          this._existeErrorConsultaClientes = true;
          return throwError(error);
        })
      );
  }

  private cargarInformacionAdministracionPolizas(): void {
    mostrarLoading();
    forkJoin(this.consultarPolizas(), this.consultarClientes())
      .pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe(
        () => {
          ocultarLoading();
        },
        (error: any) => {
          this.procesarError(error);
        }
      );
  }

  private procesarError(error: any): void {
    let mensaje: string;
    switch (error.status) {
      case HttpStatus.NOT_FOUND: {
        if (this._existeErrorConsultaPolizas) {
          mensaje = "No hay Polizas Registradas en el sistema.";
          this._existeErrorConsultaPolizas = undefined;
        }
        if (this._existeErrorConsultaClientes) {
          mensaje = "No hay Clientes Registrados en el sistema.";
          this._existeErrorConsultaClientes = undefined;
        }
        if (this._existeErrorGuardarCambiosPolizas) {
          mensaje = "No fue posible Efectuar los cambios en las polizas.";
          this._existeErrorGuardarCambiosPolizas = undefined;
        }
        if (this._existeErrorEliminarPoliza) {
          mensaje = "No fue posible eliminar la poliza.";
          this._existeErrorEliminarPoliza = undefined;
        }
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
        "Seleccion",
        "Nombre",
        "Descripcion",
        "TipoCubrimiento",
        "Cobertura",
        "TipoRiesgo",
        "FechaInicioVigencia",
        "DuracionMesesCobertura",
        "Precio",
        "EstadoPoliza",
        "Cliente",
        "Operaciones"
      ]
    };
  }
}
