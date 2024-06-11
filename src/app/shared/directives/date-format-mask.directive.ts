import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[dateMask]",
})
export class DateFormatMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener("keyup", ["$event"])
  onKeyDown(event) {
    const input = event.target as HTMLInputElement;

    const trimmed = input.value.replace(/[^0-9\.]+/g, "");

    if (trimmed.length > 2 && trimmed.length < 5) {
      return (input.value = `${trimmed.slice(0, 2)}/${trimmed.slice(2, 4)}`);
    }

    if (trimmed.length >= 5) {
      return (input.value = `${trimmed.slice(0, 2)}/${trimmed.slice(
        2,
        4
      )}/${trimmed.slice(4, 8)}`);
    }

    return (input.value = trimmed);
  }
}
