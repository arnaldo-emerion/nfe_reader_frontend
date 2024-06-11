import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nfe-totais",
  templateUrl: "./nfe-totais.component.html",
  styleUrls: ["./nfe-totais.component.css"],
})
export class NfeTotaisComponent implements OnInit {
  @Input() dadosTotais;

  constructor() {}

  ngOnInit(): void {}
}
