import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { CurvaAbcClienteModule } from "./curva-abc-cliente/curva-abc-cliente.module";
import { CurvaAbcFaturamentoModule } from "./curva-abc-faturamento/curva-abc-faturamento.module";
import { CurvaAbcProdutoModule } from "./curva-abc-produto/curva-abc-produto.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    CurvaAbcClienteModule,
    CurvaAbcProdutoModule,
    CurvaAbcFaturamentoModule,
  ],
  exports: [],
})
export class AnaliseQualitativaModule {}
