import { Injectable } from "@angular/core";
import { ITableFilterService } from "src/app/shared/components/table/table-filter-service.interface";
import { PolizaViewModel } from "src/app/shared/interfaces/poliza-view-model.model";

@Injectable()
export class TablePolizaFilterService
  implements ITableFilterService<PolizaViewModel> {
  constructor() {}

  public matches(element: PolizaViewModel, searchTerm: string): boolean {
    return element.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
