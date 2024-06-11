import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { CurvaAbcFaturamentoComponent } from "./curva-abc-faturamento.component";

@NgModule({
  declarations: [CurvaAbcFaturamentoComponent],
  imports: [CommonModule, MatButtonToggleModule],
  exports: [CurvaAbcFaturamentoComponent],
})
export class CurvaAbcFaturamentoModule {}
