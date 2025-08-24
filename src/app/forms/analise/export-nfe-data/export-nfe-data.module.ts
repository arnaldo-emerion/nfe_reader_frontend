import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { ModalsModule } from 'app/shared/modals/modals.module';
import { TabelasModule } from 'app/shared/tabelas/tabelas.module';
import { DistVendasAnaliticoModule } from '../dist-vendas/dist-vendas-analitico/dist-vendas-analitico.module';
import { ExportNfeDataComponent } from './export-nfe-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExportNfeDataComponent
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

    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ExportNfeDataComponent]
})
export class ExportNfeDataModule { }
