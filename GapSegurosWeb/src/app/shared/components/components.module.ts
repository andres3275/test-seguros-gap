import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import {
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";
import { DateControlComponent } from "./date-control/date-control.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuCabeceraComponent } from './menu-cabecera/menu-cabecera.component';

@NgModule({
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    NgbModule
  ],
  declarations: [TableComponent, DateControlComponent, MenuCabeceraComponent],
  exports: [
    TableComponent,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    DateControlComponent,
    MenuCabeceraComponent
  ],
  entryComponents: [],
  providers: []
})
export class ComponentsModule {}
