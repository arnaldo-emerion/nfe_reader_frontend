import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { NfeDestinatarioModule } from "./nfe-destinatario/nfe-destinatario.module";
import { NfeEmitenteModule } from "./nfe-emitente/nfe-emitente.module";
import { NfeTotaisModule } from "./nfe-totais/nfe-totais.module";
import { NfeTransporteModule } from "./nfe-transporte/nfe-transporte.module";
import { NfeVisualizacaoComponent } from "./nfe-visualizacao.component";

@NgModule({
  declarations: [NfeVisualizacaoComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    NfeEmitenteModule,
    NfeDestinatarioModule,
    NfeTotaisModule,
    NfeTransporteModule,
  ],
  exports: [NfeVisualizacaoComponent],
})
export class NfeVisualizacaoModule {}
