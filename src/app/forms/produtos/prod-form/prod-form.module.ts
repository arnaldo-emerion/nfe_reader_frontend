import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProdFormComponent } from "./prod-form.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ModalsModule } from "app/shared/modals/modals.module";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DirectivesModule } from "app/shared/directives/directives.module";

@NgModule({
  declarations: [ProdFormComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    TabelasModule,
    ModalsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectivesModule,
  ],
  exports: [ProdFormComponent],
})
export class ProdFormModule {}
