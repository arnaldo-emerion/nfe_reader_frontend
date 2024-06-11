import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ProdListComponent } from "./prod-list.component";

@NgModule({
  declarations: [ProdListComponent],
  imports: [CommonModule, TabelasModule, ModalsModule],
  exports: [ProdListComponent],
})
export class ProdListModule {}
