import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { CurvaAbcProdutoComponent } from "./curva-abc-produto.component";

@NgModule({
  declarations: [CurvaAbcProdutoComponent],
  imports: [CommonModule, MatButtonToggleModule],
  exports: [CurvaAbcProdutoComponent],
})
export class CurvaAbcProdutoModule {}
