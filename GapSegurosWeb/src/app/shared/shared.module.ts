import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
  imports: [CommonModule, ComponentsModule],
  exports: [ComponentsModule]
})
export class SharedModule {}
