import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { TipoRiesgoService } from "src/app/shared/services/tipo-riesgo.service";
import { TipoCubrimientoService } from "src/app/shared/services/tipo-cobertura.service";
import { EstadoPolizaService } from "./estado-poliza.service";
import { AdministracionPolizaService } from "./administracion-poliza.service";
import { Subject, Observable, forkJoin, throwError, combineLatest } from "rxjs";
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
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TipoRiesgo } from "src/app/shared/interfaces/tipo-riesgo.model";
import { TipoCubrimiento } from "src/app/shared/interfaces/tipo-cubrimiento.model";
import { LIMITEEXCEDIDOCOBERTURARIESGOALTO } from 'src/app/shared/constants/excepciones-negocio';

@Component({
  selector: "app-administracion-poliza",
  templateUrl: "./administracion-poliza.component.html",
  styleUrls: ["./administracion-poliza.component.css"]
})
export class AdministracionPolizaComponent implements OnInit, OnDestroy {
  private _subscripcionFinalizada$ = new Subject();
  public tablaPolizasConfiguration: TableConfiguration;
  public polizas: PolizaViewModel[];
  public tiposRiesgo: TipoRiesgo[];
  public tiposCubrimiento: TipoCubrimiento[];
  public clientes: Usuario[];
  public esEditarPoliza: boolean;
  private _existeErrorConsultaPolizas: boolean;
  private _existeErrorConsultaClientes: boolean;
  private _existeErrorEliminarPoliza: boolean;
  private _existeErrorGuardarCambiosPolizas: boolean;
  private _existeErrorCrearNuevaPoliza: boolean;
  private _existeErrorConsultaTiposRiesgo: boolean;
  private _existeErrorConsultaTiposCubrimiento: boolean;
  private _clienteSeleccionado: Usuario;
  private _polizasSeleccionadas: Poliza[];
  private _crudPolizaModal: NgbModalRef;

  constructor(
    private _usuarioService: UsuarioService,
    private _tipoRiesgoService: TipoRiesgoService,
    private _tipoCubrimientoService: TipoCubrimientoService,
    private _estadoPolizaService: EstadoPolizaService,
    private _polizaService: AdministracionPolizaService,
    private modalService: NgbModal
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

  public onGuardarPoliza(poliza: Poliza): void {
    this.guardarPoliza(poliza);
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

  public onConsultarPolizas(): void {
    this.actualizarInformacionTablaPolizas();
  }

  public onCrearPoliza(plantillaCrudPoliza: any): void {
    mostrarLoading();
    this.cargarInformacionModalCrudPolizas()
      .pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe(
        () => {
          ocultarLoading();
          this.abrirModalCrudPoliza(plantillaCrudPoliza);
        },
        (error: any) => this.procesarError(error)
      );
  }

  public salirModalCrudPoliza(): void {
    this._crudPolizaModal.close();
  }

  private abrirModalCrudPoliza(plantillaCrudPoliza: any): void {
    this._crudPolizaModal = this.modalService.open(plantillaCrudPoliza, {
      size: "lg",
      backdrop: false,
      backdropClass: "dark-modal"
    });
  }

  private cargarInformacionModalCrudPolizas(): Observable<any> {
    return combineLatest(
      this.consultarTiposRiesgo(),
      this.consultarTiposCubrimiento()
    );
  }

  private consultarTiposRiesgo(): Observable<TipoRiesgo[]> {
    return this._tipoRiesgoService
      .consultarTiposRiesgo()
      .pipe(map((respuesta: TipoRiesgo[]) => (this.tiposRiesgo = respuesta)))
      .pipe(
        catchError((error: any) => {
          this._existeErrorConsultaTiposRiesgo = true;
          return throwError(error);
        })
      );
  }

  private consultarTiposCubrimiento(): Observable<TipoCubrimiento[]> {
    return this._tipoCubrimientoService
      .consultarTiposCobertura()
      .pipe(
        map(
          (respuesta: TipoCubrimiento[]) => (this.tiposCubrimiento = respuesta)
        )
      )
      .pipe(
        catchError((error: any) => {
          this._existeErrorConsultaTiposCubrimiento = true;
          return throwError(error);
        })
      );
  }

  private guardarPoliza(poliza: Poliza): void {
    if (!this.esEditarPoliza) {
      this.crearNuevaPoliza(poliza);
    } else {
    }
  }

  private crearNuevaPoliza(poliza: Poliza): void {
    mostrarLoading();
    poliza.estadoPolizaId = EstadosPoliza.activa;
    this._polizaService
      .crearPoliza(poliza)
      .pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe(
        () => {
          this.actualizarInformacionTablaPolizas();
          Swal.fire("Exito", "Póliza Creada", "success");
        },
        (error: any) => {
          this._existeErrorCrearNuevaPoliza = true;
          this.procesarError(error);
        }
      );
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
    this._existeErrorCrearNuevaPoliza = undefined;
    this._existeErrorGuardarCambiosPolizas = undefined;
    this._existeErrorConsultaTiposRiesgo = undefined;
    this._existeErrorConsultaTiposCubrimiento = undefined;
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
    combineLatest(this.consultarPolizas(), this.consultarClientes())
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
        if (this._existeErrorConsultaTiposRiesgo) {
          mensaje = "No hay Tipos de Riesgo Registrados.";
          this._existeErrorConsultaTiposRiesgo = undefined;
        }
        if (this._existeErrorConsultaTiposCubrimiento) {
          mensaje = "No hay Tipos de Cubrimiento Registrados.";
          this._existeErrorConsultaTiposCubrimiento = undefined;
        }
        break;
      }
      case HttpStatus.BAD_REQUEST: {
        if (
          this._existeErrorCrearNuevaPoliza &&
          error.error.Message &&
          error.error.Message === LIMITEEXCEDIDOCOBERTURARIESGOALTO
        ) {
          mensaje = "El valor de la cobertura excede el limite para tipo de riesgo alto.";
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
