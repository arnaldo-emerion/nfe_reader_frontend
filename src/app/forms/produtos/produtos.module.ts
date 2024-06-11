import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProdFormComponent } from "./prod-form/prod-form.component";
import { ProdFormModule } from "./prod-form/prod-form.module";
import { ProdListComponent } from "./prod-list/prod-list.component";
import { ProdListModule } from "./prod-list/prod-list.module";
import { ProdPerNfeModule } from "./prod-per-nfe/prod-per-nfe.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, ProdListModule, ProdFormModule, ProdPerNfeModule],
  exports: [ProdListComponent, ProdFormComponent],
})
export class ProdutosModule {}
