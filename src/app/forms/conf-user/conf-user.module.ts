import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ConfUserComponent } from "./conf-user.component";
import { ManutencaoRegistrosModule } from "./manutencao-registros/manutencao-registros.module";

@NgModule({
  declarations: [ConfUserComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    TabelasModule,
    ManutencaoRegistrosModule,
  ],
  exports: [ConfUserComponent],
})
export class ConfUserModule {}
