import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Usuario } from "src/app/shared/interfaces/usuario.model";

@Component({
  selector: "app-selector-cliente",
  templateUrl: "./selector-cliente.component.html",
  styleUrls: ["./selector-cliente.component.css"]
})
export class SelectorClienteComponent {
  @Input() public clientes: Usuario[];
  public clienteSeleccionado: Usuario;
  @Output() clienteSeleccionadoEmitter = new EventEmitter();

  constructor() {
    this.inicializarVariables();
  }

  private inicializarVariables(): void {
    if (!this.clienteSeleccionado) {
      this.clienteSeleccionado = {
        cedula: undefined,
        id: undefined,
        nombre: undefined
      };
    }
  }

  public onClienteSeleccionado(): void {
    this.clienteSeleccionadoEmitter.emit(this.clienteSeleccionado);
  }
}
