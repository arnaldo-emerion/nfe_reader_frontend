import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { PipesModule } from "../pipes/pipes.module";
import { TabelaPaginationComponent } from "./tabela-pagination.component";

@NgModule({
  declarations: [TabelaPaginationComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterModule,
    MatIconModule,
    PipesModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  exports: [TabelaPaginationComponent],
})
export class TabelaPaginationModule {}
