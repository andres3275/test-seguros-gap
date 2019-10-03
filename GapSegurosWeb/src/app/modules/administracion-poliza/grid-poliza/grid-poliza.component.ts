import { Component, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { TableComponent } from "src/app/shared/components/table/table.component";
import { PolizaViewModel } from "src/app/shared/interfaces/poliza-view-model.model";

@Component({
  selector: "app-grid-poliza",
  templateUrl: "./grid-poliza.component.html",
  styleUrls: ["./grid-poliza.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPolizaComponent extends TableComponent {
  @Output() polizaSeleccionadaEmmiter = new EventEmitter();
  @Output() eliminarPolizaEmmiter = new EventEmitter();
  @Output() editarPolizaEmmiter = new EventEmitter();

  constructor() {
    super();
  }

  public onRegistroSeleccionado(elemento: PolizaViewModel): void {
    this.polizaSeleccionadaEmmiter.emit(elemento);
  }

  public onEditarPoliza(element: PolizaViewModel): void {
    this.editarPolizaEmmiter.emit(element);
  }

  public onEliminarPoliza(element: PolizaViewModel): void {
    this.eliminarPolizaEmmiter.emit(element);
  }
}
