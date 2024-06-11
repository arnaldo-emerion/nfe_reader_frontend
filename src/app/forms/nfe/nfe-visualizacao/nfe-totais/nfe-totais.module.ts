import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeTotaisComponent } from "./nfe-totais.component";

@NgModule({
  declarations: [NfeTotaisComponent],
  imports: [CommonModule, PipesModule],
  exports: [NfeTotaisComponent],
})
export class NfeTotaisModule {}
