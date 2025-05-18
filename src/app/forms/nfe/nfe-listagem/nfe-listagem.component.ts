import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "app/shared/notification/notification.service";
import { DataUtils } from "app/utils/data-utils";
import * as moment from "moment";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { NFeService } from "../nfe.service";
import { log } from "console";

@Component({
  selector: "app-nfe-listagem",
  templateUrl: "./nfe-listagem.component.html",
  styleUrls: ["./nfe-listagem.component.scss"],
})
export class NfeListagemComponent implements OnInit {
  @ViewChild("dataInicial") startDate;
  @ViewChild("dataFinal") endDate;

  data$;
  itemSelecionado;
  allData;

  displayedColumns = [
    { head: "N° NFe", el: "nnf" },
    { head: "Razão Social", el: "razaoSocial" },
    { head: "Nat. Operação", el: "natOp" },
    { head: "Chave de Acesso", el: "chNFe" },
    { head: "Emissão", el: "dhEmi", format: { tipo: "DATE" } },
    { head: "Tipo Documento", el: "tipoDocumento"},
  ];

  constructor(
    private router: Router,
    private service: NFeService,
    private messageService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = this.service.getCabecalho().pipe(
      tap((d) => {
        this.allData = d;
      })
    );
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }
    if($event.tipoDocumento == "CUPOM_FISCAL") {
      console.log("Visualização ainda não implementada")
    } else {
      this.router.navigate(["nfe/" + $event.id]);
    }
  }

  executarAcao(acaoPropagate) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case "add-new":
        this.router.navigate(["atividades/atividade/0"]);
        break;
    }
  }

  filtrarRegistros(dataInicial, dataFinal) {
    const startDate = DataUtils.dateCompToDateInicial(dataInicial);
    const endDate = DataUtils.dateCompToDateFinal(dataFinal);

    dataInicial = moment(startDate).format("DD/MM/yyyy");
    dataFinal = moment(endDate).format("DD/MM/yyyy");

    const filteredData = this.allData.filter(
      (item) => item.dhEmi >= startDate && item.dhEmi <= endDate
    );

    this.data$ = of(filteredData);
  }

  limparSelecao(dataInicial, dataFinal) {
    dataInicial.datepickerInput._datepicker.select();
    dataFinal.datepickerInput._datepicker.select();
    dataInicial = null;
    dataFinal = null;

    this.data$ = of(this.allData);
  }
}
