import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { TotalImpostoComponent } from "./total-imposto.component";

@NgModule({
  declarations: [TotalImpostoComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectivesModule,
  ],
  exports: [TotalImpostoComponent],
})
export class TotalImpostoModule {}
