import { NgModule } from "@angular/core";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
  imports: [ComponentsModule],
  exports: [ComponentsModule]
})
export class SharedModule {}
