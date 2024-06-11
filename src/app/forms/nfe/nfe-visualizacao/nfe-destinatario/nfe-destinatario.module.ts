import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeDestinatarioComponent } from "./nfe-destinatario.component";

@NgModule({
  declarations: [NfeDestinatarioComponent],
  imports: [CommonModule, PipesModule],
  exports: [NfeDestinatarioComponent],
})
export class NfeDestinatarioModule {}
