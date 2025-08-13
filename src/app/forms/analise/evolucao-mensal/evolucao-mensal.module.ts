import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvolucaoMensalComponent } from './evolucao-mensal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalDetalheCurvaAbcModule } from '../analise-qualitativa/curva-abc-cliente/modal-detalhe-curva-abc/modal-detalhe-curva-abc.module';
import { MatSelectModule } from '@angular/material/select';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { ModalsModule } from 'app/shared/modals/modals.module';
import { TabelasModule } from 'app/shared/tabelas/tabelas.module';
import { DistVendasAnaliticoModule } from '../dist-vendas/dist-vendas-analitico/dist-vendas-analitico.module';

@NgModule({
  declarations: [
    EvolucaoMensalComponent
  ],
  imports: [
    CommonModule,
    TabelasModule,
    ModalsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    DistVendasAnaliticoModule,
    DirectivesModule,
  ],
  exports: [EvolucaoMensalComponent]
})
export class EvolucaoMensalModule { }
