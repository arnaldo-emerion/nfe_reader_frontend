import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { AnaliseQualitativaModule } from "./analise-qualitativa/analise-qualitativa.module";
import { DistVendasModule } from "./dist-vendas/dist-vendas.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, AnaliseQualitativaModule, DistVendasModule],
  exports: [DistVendasModule],
})
export class AnaliseModule {}
