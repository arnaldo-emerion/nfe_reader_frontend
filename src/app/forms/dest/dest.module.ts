import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DestFormComponent } from "./dest-form/dest-form.component";
import { DestFormModule } from "./dest-form/dest-form.module";
import { DestListComponent } from "./dest-list/dest-list.component";
import { DestListModule } from "./dest-list/dest-list.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, DestListModule, DestFormModule],
  exports: [DestListComponent, DestFormComponent],
})
export class DestModule {}
