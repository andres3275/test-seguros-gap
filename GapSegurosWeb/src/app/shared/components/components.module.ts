import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table/table.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DateControlComponent } from "./date-control/date-control.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuCabeceraComponent } from "./menu-cabecera/menu-cabecera.component";
import { SortableTableHeaderDirective } from "./table/sortable.directive";

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, FormsModule, NgbModule],
  declarations: [
    TableComponent,
    DateControlComponent,
    MenuCabeceraComponent,
    SortableTableHeaderDirective
  ],
  exports: [
    TableComponent,
    BrowserAnimationsModule,
    DateControlComponent,
    MenuCabeceraComponent,
    SortableTableHeaderDirective
  ],
  entryComponents: [],
  providers: []
})
export class ComponentsModule {}
