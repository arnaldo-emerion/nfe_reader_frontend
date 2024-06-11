import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeEmitenteComponent } from "./nfe-emitente.component";

@NgModule({
  declarations: [NfeEmitenteComponent],
  imports: [CommonModule, PipesModule],
  exports: [NfeEmitenteComponent],
})
export class NfeEmitenteModule {}
