import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NfeListagemComponent } from "./nfe-listagem/nfe-listagem.component";
import { NfeListagemModule } from "./nfe-listagem/nfe-listagem.module";
import { NfeUploadComponent } from "./nfe-upload/nfe-upload.component";
import { NfeUploadModule } from "./nfe-upload/nfe-upload.module";
import { NfeVisualizacaoComponent } from "./nfe-visualizacao/nfe-visualizacao.component";
import { NfeVisualizacaoModule } from "./nfe-visualizacao/nfe-visualizacao.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NfeListagemModule,
    NfeVisualizacaoModule,
    NfeUploadModule,
  ],
  exports: [NfeListagemComponent, NfeVisualizacaoComponent, NfeUploadComponent],
})
export class NfeModule {}
