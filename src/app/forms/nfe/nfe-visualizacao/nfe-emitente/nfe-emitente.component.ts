import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nfe-emitente",
  templateUrl: "./nfe-emitente.component.html",
  styleUrls: ["./nfe-emitente.component.css"],
})
export class NfeEmitenteComponent implements OnInit {
  @Input() dadosEmit;

  constructor() {}

  ngOnInit(): void {
    switch (this.dadosEmit.crt) {
      case "3":
        this.dadosEmit.crt = "3 - Regime Normal";
        break;
    }
  }
}
