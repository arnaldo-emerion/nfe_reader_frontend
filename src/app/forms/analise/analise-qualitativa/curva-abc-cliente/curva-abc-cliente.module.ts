import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CurvaAbcClienteComponent } from "./curva-abc-cliente.component";
import { ModalDetalheCurvaAbcModule } from "./modal-detalhe-curva-abc/modal-detalhe-curva-abc.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

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
  declarations: [CurvaAbcClienteComponent],
  imports: [
    CommonModule,
    ModalDetalheCurvaAbcModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    DirectivesModule,
  ],
  exports: [CurvaAbcClienteComponent],
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
export class CurvaAbcClienteModule {}
