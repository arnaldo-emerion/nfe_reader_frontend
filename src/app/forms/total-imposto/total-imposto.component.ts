import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DataUtils } from "app/utils/data-utils";
import { TotaisImpostosService } from "./total-imposto.service";

@Component({
  selector: "app-total-imposto",
  templateUrl: "./total-imposto.component.html",
  styleUrls: ["./total-imposto.component.css"],
})
export class TotalImpostoComponent implements OnInit {
  dadosTotais$;

  constructor(
    private totaisImpostosService: TotaisImpostosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dadosTotais$ = this.totaisImpostosService.getTotaisImpostos();
  }

  filtarRegistros(dataInicial, dataFinal) {
    const startDate = DataUtils.dateCompToDateInicial(dataInicial);
    const endDate = DataUtils.dateCompToDateFinal(dataFinal);

    this.dadosTotais$ = this.totaisImpostosService.getTotaisImpostosByDate(
      startDate,
      endDate
    );
  }

  limparSelecao(dataInicial, dataFinal) {
    dataInicial.datepickerInput._datepicker.select();
    dataFinal.datepickerInput._datepicker.select();
    this.loadData();
  }

  voltar() {
    this.location.back();
  }
}
