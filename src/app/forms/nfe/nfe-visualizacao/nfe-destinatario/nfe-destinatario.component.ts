import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nfe-destinatario",
  templateUrl: "./nfe-destinatario.component.html",
  styleUrls: ["./nfe-destinatario.component.css"],
})
export class NfeDestinatarioComponent implements OnInit {
  @Input() dadosDest;

  constructor() {}

  ngOnInit(): void {
    switch (this.dadosDest.indIEDest) {
      case "1":
        this.dadosDest.indIEDest =
          "01 - Contribuinte ICMS (informar a IE do destinatário) ";
        break;
    }
  }
}
