import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AnaliseQualitativaModule } from "app/forms/analise/analise-qualitativa/analise-qualitativa.module";
import { DestModule } from "app/forms/dest/dest.module";
import { NfeModule } from "app/forms/nfe/nfe.module";
import { UsuarioComponent } from "./usuario.component";

@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,

    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NfeModule,
    AnaliseQualitativaModule,
    DestModule,
    FormsModule,
  ],
  exports: [UsuarioComponent],
})
export class UsuarioModule {}
