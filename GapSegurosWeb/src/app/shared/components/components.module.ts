import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table/table.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
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
    BrowserAnimationsModule,
    DateControlComponent,
    MenuCabeceraComponent
  ],
  entryComponents: [],
  providers: []
})
export class ComponentsModule {}
