import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poliza } from 'src/app/shared/interfaces/poliza.model';
import { TipoRiesgo } from 'src/app/shared/interfaces/tipo-riesgo.model';
import { TipoCubrimiento } from 'src/app/shared/interfaces/tipo-cubrimiento.model';
import { Usuario } from 'src/app/shared/interfaces/usuario.model';
import {
  LimitesPorcentajesCobertura,
  LimitesDuracionCobertura,
  LimitesPrecioPoliza
} from 'src/app/shared/constants/valores-limites';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { EstadoPoliza } from 'src/app/shared/interfaces/estado-poliza.model';

@Component({
  selector: 'app-crud-poliza',
  templateUrl: './crud-poliza.component.html',
  styleUrls: ['./crud-poliza.component.css']
})
export class CrudPolizaComponent implements OnInit {
  private _poliza: Poliza;
  @Input() public tiposRiesgo: TipoRiesgo[];
  @Input() public tiposCubrimiento: TipoCubrimiento[];
  @Input() public clientes: Usuario[];
  @Input() public esEditarPoliza: boolean;
  @Input() public estadosPoliza: EstadoPoliza[];
  @Output() salirModalCrudPolizaEmmiter = new EventEmitter();
  @Output() guardarPolizaEmmiter = new EventEmitter();

  @Input() public set poliza(value: Poliza) {
    this._poliza = value;
    if (
      value &&
      value.fechaInicioVigencia &&
      value.fechaInicioVigencia !== ''
    ) {
      this._poliza.fechaInicioVigencia = this.aplicarFormatoFecha(
        value.fechaInicioVigencia
      );
    }
  }

  public get poliza(): Poliza {
    return this._poliza;
  }

  constructor() {
    this.inicializarVariables();
  }

  ngOnInit() {}

  public onGuardarPoliza(fechaInicioVigencia: any) {
    const mensajeError = this.validarCondicionesGuardarPoliza(
      fechaInicioVigencia
    );
    if (!mensajeError) {
      this.poliza.fechaInicioVigencia = fechaInicioVigencia.inputDate;
      this.guardarPolizaEmmiter.emit(this.poliza);
    } else {
      Swal.fire('Advertencia', mensajeError, 'warning');
    }
  }

  public onClienteSeleccionado(cliente: Usuario ): void {
    this._poliza.usuarioId = cliente.id;
  }

  private aplicarFormatoFecha(fecha: string): string {
    return moment(fecha)
      .format('YYYY-MM-DD')
      .toString();
  }

  private validarCondicionesGuardarPoliza(fechaInicioVigencia: any): string {
    const mensajeError =
      this.poliza.cobertura >
        LimitesPorcentajesCobertura.porcentajeCoberturaMaximo ||
      this.poliza.cobertura <
        LimitesPorcentajesCobertura.porcentejeCoberturaMinimo
        ? 'Valor de Cobertura invalido, debe estar entre 0 y 100'
        : this.poliza.duracionMesesCobertura >
            LimitesDuracionCobertura.duracionMaximaCobertura ||
          this.poliza.duracionMesesCobertura <
            LimitesDuracionCobertura.duracionMinimaCobertura
        ? 'Duración de cubertura invalido, debe estar entre 0 y 10000'
        : this.poliza.precio > LimitesPrecioPoliza.precioPolizaMaximo ||
          this.poliza.precio < LimitesPrecioPoliza.precioPolizaMinimo
        ? 'Precio invalido, debe estar entre 0 y 999999'
        : !this.poliza.usuarioId
        ? 'Debe seleccionar un cliente a quien asignar la póliza'
        : !this.poliza.tipoRiesgoId
        ? 'Debe seleccionar un tipo de Riesgo'
        : !this.poliza.tipoCubrimientoId
        ? 'Debe seleccionar un tipo de Cubrimiento'
        : !fechaInicioVigencia ||
          !fechaInicioVigencia.inputDate ||
          fechaInicioVigencia.inputDate === ''
        ? 'Debe seleccionar una fecha de inicio de vigencia.'
        : undefined;
    return mensajeError;
  }

  public onSalirModal() {
    this.salirModalCrudPolizaEmmiter.emit();
  }

  private inicializarVariables(): void {
    this.poliza = {
      cobertura: undefined,
      descripcion: undefined,
      duracionMesesCobertura: undefined,
      tipoRiesgoId: undefined,
      estadoPolizaId: undefined,
      fechaInicioVigencia: undefined,
      id: undefined,
      nombre: undefined,
      precio: undefined,
      tipoCubrimientoId: undefined,
      usuarioId: undefined
    };
  }
}
