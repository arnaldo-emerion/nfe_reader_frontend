import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProdutoService } from "../produto.service";

@Component({
  selector: "app-prod-list",
  templateUrl: "./prod-list.component.html",
  styleUrls: ["./prod-list.component.scss"],
})
export class ProdListComponent implements OnInit {
  data$;
  itemSelecionado;

  displayedColumns = [
    { head: "Código", el: "codigo" },
    { head: "Descricao", el: "descricao" },
    { head: "EAN", el: "ean" },
    { head: "Unidade", el: "unidade" },
    { head: "NCM", el: "ncm" },
  ];

  constructor(public router: Router, private service: ProdutoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = this.service.getCabecalho();
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }

    this.router.navigate(["produto/" + $event.codigo], {
      queryParams: { tab: "6" },
    });
  }
}
