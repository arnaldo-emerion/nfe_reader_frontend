import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ESTADOS_ARRAY } from "app/arrays/estados.arrays";
import { DataUtils } from "app/utils/data-utils";
import { tap } from "rxjs/operators";
import { NFeService } from "../../nfe/nfe.service";

@Component({
  selector: "app-dist-vendas",
  templateUrl: "./dist-vendas.component.html",
  styleUrls: ["./dist-vendas.component.scss"],
})
export class DistVendasComponent implements OnInit {
  data$;
  itemSelecionado;

  qtdNotas;
  qtdClientes;
  totalNF;
  qtdEstados;

  displayedColumns = [
    { head: "N° NFe", el: "numeroDocumento" },
    { head: "Razão Social", el: "razaoSocial" },
    { head: "Nat. Operação", el: "naturezaOperacao" },
    { head: "UF", el: "uf" },
    { head: "Data", el: "dhEmi", format: { tipo: "DATE" } },
    { head: "Qtd. Pedido", el: "totalPedidos" },
    {
      head: "Valor",
      el: "valorNotaFiscal",
      format: { tipo: "PIPE", pipe: "currency", arguments: "BRL" },
    },
  ];

  constructor(private router: Router, private service: NFeService) {}

  estados = ESTADOS_ARRAY;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = this.service.getCabecalho().pipe(
      tap((data: any[]) => {
        this.filteredResults(data);
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

  filteredResults($event: any[]) {
    this.qtdNotas = $event.length;
    this.totalNF = $event.reduce((a, b) => (a += b.vnf), 0);
    const clientes = Array.from(
      $event.reduce((m, t) => m.set(t.cpfCnpjDestinatario, t), new Map()).values()
    );
    this.qtdClientes = clientes.length;

    const ufList = Array.from(
      $event.reduce((m, t) => m.set(t.uf, t), new Map()).values()
    );
    this.qtdEstados = ufList.length;
  }

  filtarRegistros(dataInicial, dataFinal, estado) {
    const startDate = DataUtils.dateCompToDateInicial(dataInicial);
    const endDate = DataUtils.dateCompToDateFinal(dataFinal);

    const estadoValor = !estado.value ? "TODOS" : estado.value;
    this.data$ = this.service
      .getCabecalhoFiltrado(startDate, endDate, estadoValor)
      .pipe(
        tap((data: any[]) => {
          this.filteredResults(data);
        })
      );
  }

  limparSelecao(dataInicial, dataFinal) {
    dataInicial.datepickerInput._datepicker.select();
    dataFinal.datepickerInput._datepicker.select();
    this.loadData();
  }
}
