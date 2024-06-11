import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { NfeListagemComponent } from "./nfe-listagem.component";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/yyyy",
  },
  display: {
    dateInput: "DD/MM/yyyy",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};

@NgModule({
  declarations: [NfeListagemComponent],
  imports: [
    CommonModule,
    TabelasModule,
    ModalsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectivesModule,
  ],
  exports: [NfeListagemComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NfeListagemModule {}
