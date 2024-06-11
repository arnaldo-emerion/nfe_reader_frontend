import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ConfiguracaoComponent } from "./configuracao.component";

@NgModule({
  declarations: [ConfiguracaoComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    TabelasModule,
  ],
  exports: [ConfiguracaoComponent],
})
export class ConfiguracaoModule {}
