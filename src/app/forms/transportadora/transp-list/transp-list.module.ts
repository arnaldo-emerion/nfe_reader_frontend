import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { TranspListComponent } from "./transp-list.component";

@NgModule({
  declarations: [TranspListComponent],
  imports: [CommonModule, TabelasModule, ModalsModule, MatSelectModule],
  exports: [TranspListComponent],
})
export class TranspListModule {}
