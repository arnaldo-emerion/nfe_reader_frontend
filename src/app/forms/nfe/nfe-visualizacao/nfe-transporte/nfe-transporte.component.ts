import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nfe-transporte",
  templateUrl: "./nfe-transporte.component.html",
  styleUrls: ["./nfe-transporte.component.css"],
})
export class NfeTransporteComponent implements OnInit {
  @Input() dadosTransporte;

  constructor() {}

  ngOnInit(): void {}
}
