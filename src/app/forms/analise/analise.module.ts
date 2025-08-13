import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { AnaliseQualitativaModule } from "./analise-qualitativa/analise-qualitativa.module";
import { DistVendasModule } from "./dist-vendas/dist-vendas.module";
import { EvolucaoMensalModule } from "./evolucao-mensal/evolucao-mensal.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, AnaliseQualitativaModule, DistVendasModule, EvolucaoMensalModule],
  exports: [DistVendasModule],
})
export class AnaliseModule {}
