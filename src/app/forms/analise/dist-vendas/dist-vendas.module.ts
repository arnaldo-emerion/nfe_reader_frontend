import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { DistVendasAnaliticoComponent } from "./dist-vendas-analitico/dist-vendas-analitico.component";
import { DistVendasAnaliticoModule } from "./dist-vendas-analitico/dist-vendas-analitico.module";
import { DistVendasComponent } from "./dist-vendas.component";

@NgModule({
  declarations: [DistVendasComponent],
  imports: [
    CommonModule,
    TabelasModule,
    ModalsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    DistVendasAnaliticoModule,
    DirectivesModule,
  ],
  exports: [DistVendasComponent, DistVendasAnaliticoComponent],
})
export class DistVendasModule {}
