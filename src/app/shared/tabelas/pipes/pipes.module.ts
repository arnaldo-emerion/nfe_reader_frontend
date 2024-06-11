import { CommonModule, CurrencyPipe, DecimalPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipeFormacaoColunaPipe } from "./pipe-formacao-coluna.pipe";

@NgModule({
  declarations: [PipeFormacaoColunaPipe],
  imports: [CommonModule],
  exports: [PipeFormacaoColunaPipe],
  providers: [DecimalPipe, CurrencyPipe],
})
export class PipesModule {}
