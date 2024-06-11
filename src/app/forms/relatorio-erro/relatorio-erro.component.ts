import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RelatorioErroService } from "./relatorio-erro.service";

@Component({
  selector: "app-relatorio-erro",
  templateUrl: "./relatorio-erro.component.html",
  styleUrls: ["./relatorio-erro.component.css"],
})
export class RelatorioErroComponent implements OnInit {
  data$;
  itemSelecionado;

  displayedColumns = [
    {
      head: "Data Processamento",
      el: "dataProcessamento",
      format: { tipo: "DATE_TIME" },
    },
    { head: "Nome do Arquivo", el: "nomeArquivo" },
    { head: "Descrição", el: "motivo" },
  ];

  constructor(private router: Router, private service: RelatorioErroService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = this.service.getAll();
  }
}
