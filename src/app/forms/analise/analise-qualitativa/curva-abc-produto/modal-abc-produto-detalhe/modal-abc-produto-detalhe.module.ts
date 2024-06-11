import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalAbcProdutoDetalheComponent } from "./modal-abc-produto-detalhe.component";

@NgModule({
  declarations: [ModalAbcProdutoDetalheComponent],
  imports: [CommonModule],
  exports: [ModalAbcProdutoDetalheComponent],
  entryComponents: [ModalAbcProdutoDetalheComponent],
})
export class ModalAbcProdutoDetalheModule {}
