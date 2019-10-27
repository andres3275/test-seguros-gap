import { Component, Input, ViewChildren, QueryList } from "@angular/core";
import { State } from "./state.model";
import { sort } from "./table-utilities";
import { ITableFilterService } from "./table-filter-service.interface";
import { SortableTableHeaderDirective } from "./sortable.directive";
import { SortDirection } from "./sort-direction.type";
import { SortEvent } from "./sort-event.model";

@Component({
  selector: "app-table",
  template: "",
  styleUrls: ["./table.component.css"]
})
export class TableComponent {
  private _data: any[];
  public filteredData: any[];
  private _total: number;
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: "",
    sortColumn: "",
    sortDirection: ""
  };
  private _tableFilterService: ITableFilterService<any>;
  @ViewChildren(SortableTableHeaderDirective) headers: QueryList<
    SortableTableHeaderDirective
  >;

  constructor() {
    this.filteredData = [];
  }

  @Input() set data(data: any[]) {
    this._data = data;
    if (this._data) {
      this._total = this._data.length;
      Object.assign(this.filteredData, this._data);
    }
  }

  get data(): any[] {
    return this._data;
  }

  get total() {
    return this._total;
  }

  get page() {
    return this._state.page;
  }

  set page(page: number) {
    this._set({ page });
  }

  get pageSize() {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set tableFilterService(tableFilterService: ITableFilterService<any>) {
    this._tableFilterService = tableFilterService;
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search();
  }

  private _search(): void {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm
    } = this._state;
    this.filteredData = sort(this._data, sortColumn, sortDirection);
    this.filteredData = this.filteredData.filter(element =>
      this._tableFilterService.matches(element, searchTerm)
    );
    this._total = this.filteredData.length;
    this.filteredData = this.filteredData.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
  }

  public onSort({ column, direction }: SortEvent): void {
    this.headers.forEach(header => {
      if (header.appSortable !== column) {
        header.direction = "";
      }
    });
    this.sortColumn = column;
    this.sortDirection = direction;
  }
}
