import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ModalDetalheCurvaAbcModule } from "../../analise-qualitativa/curva-abc-cliente/modal-detalhe-curva-abc/modal-detalhe-curva-abc.module";
import { DistVendasAnaliticoComponent } from "./dist-vendas-analitico.component";

@NgModule({
  declarations: [DistVendasAnaliticoComponent],
  imports: [
    CommonModule,
    ModalDetalheCurvaAbcModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
  ],
  exports: [DistVendasAnaliticoComponent],
})
export class DistVendasAnaliticoModule {}
