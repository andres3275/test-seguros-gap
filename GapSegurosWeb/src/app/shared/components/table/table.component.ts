import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  OnDestroy
} from "@angular/core";
import { State } from "./state.model";
import { sort } from "./table-utilities";
import { ITableFilterService } from "./table-filter-service.interface";
import { SortableTableHeaderDirective } from "./sortable.directive";
import { SortDirection } from "./sort-direction.type";
import { SortEvent } from "./sort-event.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-table",
  template: "",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnDestroy {
  private _subscripcionFinalizada$ = new Subject();
  public tableForm: FormGroup;
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
  protected _tableFilterService: ITableFilterService<any>;
  private _formBuilder: FormBuilder;

  @ViewChildren(SortableTableHeaderDirective) public headers: QueryList<
    SortableTableHeaderDirective
  >;

  constructor() {
    this.filteredData = [];
  }

  ngOnDestroy(): void {
    this.finalizarSubscripciones();
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

  set formBuilder(formBuilder: FormBuilder) {
    this._formBuilder = formBuilder;
    this.inicializarFormulario();
    this.subscribeInputForms();
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private subscribeInputForms(): void {
    this.tableForm
      .get("searchTerm")
      .valueChanges.pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe((value: string) => {
        this.searchTerm = value;
      });
    this.tableForm
      .get("pageSize")
      .valueChanges.pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe((value: number) => {
        this.pageSize = value;
      });
  }

  private finalizarSubscripciones(): void {
    this._subscripcionFinalizada$.next();
    this._subscripcionFinalizada$.complete();
  }

  private inicializarFormulario(): void {
    this.tableForm = this._formBuilder.group({
      searchTerm: [""],
      pageSize: [""]
    });
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
