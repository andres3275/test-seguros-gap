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
  @Input() public clienteSeleccionado: Usuario;
  public clientesFormControl: FormControl;
  @Output() clienteSeleccionadoEmitter = new EventEmitter();

  constructor() {
    this.inicializarVariables();
  }

  private inicializarVariables(): void {
    this.clientesFormControl = new FormControl('', Validators.required);
    this.asignarClienteSeleccionado();
  }

  private asignarClienteSeleccionado(): void {
    if (this.clienteSeleccionado && this.clienteSeleccionado.id) {
      this.clientesFormControl.setValue(this.clienteSeleccionado.id);
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
