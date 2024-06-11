import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { DestListComponent } from "./dest-list.component";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [DestListComponent],
  imports: [CommonModule, TabelasModule, ModalsModule, MatSelectModule],
  exports: [DestListComponent],
})
export class DestListModule {}
