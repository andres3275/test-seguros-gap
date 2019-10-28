import { Injectable } from "@angular/core";
import { ITableFilterService } from "src/app/shared/components/table/table-filter-service.interface";
import { PolizaViewModel } from "src/app/shared/interfaces/poliza-view-model.model";

@Injectable()
export class TablePolizaFilterService
  implements ITableFilterService<PolizaViewModel> {
  constructor() {}

  public matches(element: PolizaViewModel, searchTerm: string): boolean {
    return (
      element.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.tipoCubrimiento
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      this.matchNumber(element.cobertura, searchTerm) ||
      element.tipoRiesgo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.matchNumber(element.duracionMesesCobertura, searchTerm) ||
      element.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.matchNumber(element.precio, searchTerm) ||
      this.matchDates(element.fechaInicioVigencia, searchTerm)
    );
  }

  private matchNumber(value: number, searchTerm: string): boolean {
    const searchTermNumber = Number(searchTerm);
    return value === searchTermNumber;
  }

  private matchDates(fecha: string, searchTerm: string): boolean {
    return (
      !isNaN(Date.parse(searchTerm)) &&
      new Date(fecha)
        .toUTCString()
        .split(" ")
        .slice(0, 4)
        .join(" ") ===
        new Date(searchTerm)
          .toUTCString()
          .split(" ")
          .slice(0, 4)
          .join(" ")
    );
  }
}
