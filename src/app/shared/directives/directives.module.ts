import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DateFormatMaskDirective } from "./date-format-mask.directive";

@NgModule({
  declarations: [DateFormatMaskDirective],
  imports: [CommonModule],
  exports: [DateFormatMaskDirective],
})
export class DirectivesModule {}
