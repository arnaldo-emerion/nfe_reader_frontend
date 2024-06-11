import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { NfeUploadComponent } from "./nfe-upload.component";

@NgModule({
  declarations: [NfeUploadComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
  ],
  exports: [NfeUploadComponent],
})
export class NfeUploadModule {}
