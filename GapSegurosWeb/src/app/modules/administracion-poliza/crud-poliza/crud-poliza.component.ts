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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-poliza',
  templateUrl: './crud-poliza.component.html',
  styleUrls: ['./crud-poliza.component.css']
})
export class CrudPolizaComponent implements OnInit {
  private _poliza: Poliza;
  public polizaForm: FormGroup;
  @Input() public tiposRiesgo: TipoRiesgo[];
  @Input() public tiposCubrimiento: TipoCubrimiento[];
  @Input() public clientes: Usuario[];
  @Input() public esEditarPoliza: boolean;
  @Input() public estadosPoliza: EstadoPoliza[];
  @Output() salirModalCrudPolizaEmmiter = new EventEmitter();
  @Output() guardarPolizaEmmiter = new EventEmitter();

  @Input() public set poliza(value: Poliza) {
    this._poliza = value;
    if (this._poliza) {
      this._poliza.fechaInicioVigencia = this.aplicarFormatoFecha(
        this._poliza.fechaInicioVigencia
      );
      if (this.polizaForm) {
        this.asignarDatosPolizaFormulario();
      }
    }
  }

  public get poliza(): Poliza {
    return this._poliza;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.inicializarVariables();
  }

  ngOnInit() {}

  public onGuardarPoliza(fechaInicioVigencia: any) {
    const mensajeError = this.validarCondicionesGuardarPoliza(
      fechaInicioVigencia
    );
    if (!mensajeError) {
      const poliza = {
        cobertura: this.polizaForm.controls.cobertura.value,
        descripcion: this.polizaForm.controls.descripcionPoliza.value,
        duracionMesesCobertura: this.polizaForm.controls.duracionMesesCobertura.value,
        tipoRiesgoId: this.polizaForm.controls.tipoRiesgo.value,
        estadoPolizaId: this.polizaForm.controls.estadoPoliza.value,
        fechaInicioVigencia: fechaInicioVigencia.inputDate,
        id: this._poliza.id,
        nombre: this.polizaForm.controls.nombrePoliza.value,
        precio: this.polizaForm.controls.precioPoliza.value,
        tipoCubrimientoId: this.polizaForm.controls.tipoCubrimiento.value,
        usuarioId: this._poliza.usuarioId
      };
      this.guardarPolizaEmmiter.emit(poliza);
    } else {
      Swal.fire('Advertencia', mensajeError, 'warning');
    }
  }

  public onClienteSeleccionado(cliente: Usuario): void {
    this._poliza.usuarioId = cliente.id;
  }

  private asignarDatosPolizaFormulario(): void {
    this.polizaForm.patchValue({
      nombrePoliza: this._poliza.nombre,
      descripcionPoliza: this._poliza.descripcion,
      cobertura: this._poliza.cobertura,
      duracionMesesCobertura: this._poliza.duracionMesesCobertura,
      tipoRiesgo: this._poliza.tipoRiesgoId,
      tipoCubrimiento: this._poliza.tipoCubrimientoId,
      precioPoliza: this._poliza.precio,
      estadoPoliza: this._poliza.estadoPolizaId
    });
  }

  private aplicarFormatoFecha(fecha: string): string {
    return moment(fecha)
      .format('YYYY-MM-DD')
      .toString();
  }

  private validarCondicionesGuardarPoliza(fechaInicioVigencia: any): string {
    const mensajeError =
      !fechaInicioVigencia ||
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
    this.polizaForm = this._formBuilder.group({
      nombrePoliza: ['', [Validators.required, Validators.maxLength(40)]],
      descripcionPoliza: ['', Validators.maxLength(140)],
      cobertura: [
        '',
        [Validators.required, Validators.max(100), Validators.min(0)]
      ],
      duracionMesesCobertura: [
        '',
        [Validators.required, Validators.max(10000), Validators.min(1)]
      ],
      tipoRiesgo: ['', Validators.required],
      tipoCubrimiento: ['', Validators.required],
      precioPoliza: [
        '',
        [Validators.required, Validators.max(999999), Validators.min(0)]
      ],
      estadoPoliza: ['', Validators.required]
    });
  }
}
