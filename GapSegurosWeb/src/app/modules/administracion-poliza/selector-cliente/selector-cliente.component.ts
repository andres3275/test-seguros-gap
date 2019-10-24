import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/shared/interfaces/usuario.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-cliente',
  templateUrl: './selector-cliente.component.html',
  styleUrls: ['./selector-cliente.component.css']
})
export class SelectorClienteComponent {
  @Input() public clientes: Usuario[];
  public clientesFormControl: FormControl;
  @Output() clienteSeleccionadoEmitter = new EventEmitter();

  constructor() {
    this.inicializarVariables();
  }

  @Input()
  public set clienteSeleccionadoId(value: number) {
    this.asignarClienteSeleccionado(value);
  }

  private inicializarVariables(): void {
    this.clientesFormControl = new FormControl('', Validators.required);
  }

  private asignarClienteSeleccionado(clienteId: number): void {
    if (clienteId) {
      this.clientesFormControl.setValue(clienteId);
    }
  }

  public onClienteSeleccionado(): void {
    const cliente: Usuario = {
      cedula: undefined,
      id: this.clientesFormControl.value,
      nombre: undefined
    };
    this.clienteSeleccionadoEmitter.emit(cliente);
  }
}
