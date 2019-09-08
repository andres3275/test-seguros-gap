import { Component, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { MatPaginatorIntl } from "@angular/material";
import { TableConfiguration } from "../../../shared/interfaces/table-configuration";

export const CONDITIONS_FUNCTIONS = {
  "is-empty": function(value: any) {
    return value === "";
  },
  "is-not-empty": function(value: any) {
    return value !== "";
  },
  "is-equal": function(value: any, filterdValue: any) {
    return value === filterdValue;
  },
  "is-not-equal": function(value: any, filterdValue: any) {
    return value !== filterdValue;
  }
};

@Component({
  selector: "app-table",
  template: "",
  styleUrls: ["./table.component.css"]
})
export class TableComponent extends MatPaginatorIntl
  implements OnInit, OnChanges {
  @Input() public tableConfiguration: TableConfiguration;
  public _data: Array<any>;
  public dataSource: MatTableDataSource<Object>;
  public itemsPerPageLabel = "";
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor() {
    super();
  }

  @Input() set data(lista: Array<any>) {
    this._data = lista;
    this.setDatosTabla();
  }

  get data(): Array<any> {
    return this._data;
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnChanges(changes: any): void {
    if (changes["tableConfiguration"]) {
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if (changes["data"]) {
      this.setDatosTabla();
    }
  }

  public setDatosTabla() {
    this.dataSource = new MatTableDataSource(this._data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
