import {
  Directive,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  HostListener
} from "@angular/core";
import { SortDirection } from "./sort-direction.type";
import { SortEvent } from "./sort-event.model";

const rotate: { [key: string]: SortDirection } = {
  asc: "desc",
  desc: "",
  "": "asc"
};

@Directive({
  selector: "th[appSortable]"
})
export class SortableTableHeaderDirective {
  @Input() appSortable: string;
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();
  @HostBinding("class.asc") asc = 'direction === "asc"';
  @HostBinding("class.desc") desc = 'direction === "desc"';
  @HostListener("click") onClick() {
    this.rotate();
  }

  public rotate(): void {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.appSortable, direction: this.direction });
  }
}
