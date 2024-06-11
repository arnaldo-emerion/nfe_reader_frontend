import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NfeTransporteComponent } from "./nfe-transporte.component";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";

@NgModule({
  declarations: [NfeTransporteComponent],
  imports: [CommonModule, PipesModule],
  exports: [NfeTransporteComponent],
})
export class NfeTransporteModule {}
