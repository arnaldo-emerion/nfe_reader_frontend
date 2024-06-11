import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { RelatorioErroComponent } from "./relatorio-erro.component";

@NgModule({
  declarations: [RelatorioErroComponent],
  imports: [CommonModule, TabelasModule, ModalsModule],
  exports: [RelatorioErroComponent],
})
export class RelatorioErroModule {}
