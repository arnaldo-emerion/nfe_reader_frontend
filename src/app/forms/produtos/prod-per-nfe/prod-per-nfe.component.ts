import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ESTADOS_ARRAY } from "app/arrays/estados.arrays";
import { Subject } from "rxjs";
import { ProdutoService } from "../produto.service";

@Component({
  selector: "app-prod-per-nfe",
  templateUrl: "./prod-per-nfe.component.html",
  styleUrls: ["./prod-per-nfe.component.css"],
})
export class ProdPerNfeComponent implements OnInit {
  data$ = new Subject();
  itemSelecionado;

  displayedColumns = [
    { head: "NFe", el: "nnf" },
    { head: "Código", el: "codigo" },
    { head: "Descricao", el: "descricao" },
    { head: "EAN", el: "ean" },
    { head: "Unidade", el: "unidade" },
    { head: "NCM", el: "ncm" },
    { head: "UF", el: "uf" },
    { head: "CST PIS", el: "cstpis" },
    { head: "PIS(%)", el: "ppis", format: { tipo: "PIPE", pipe: "decimal" } },
    { head: "Base Calc. PIS", el: "vbcpis" },
    { head: "Val. PIS", el: "vpis" },
    { head: "CST IPI", el: "cstipi" },
    { head: "IPI(%)", el: "pipi", format: { tipo: "PIPE", pipe: "decimal" } },
    { head: "Base Calc. IPI", el: "vbcipi" },
    { head: "Val. IPI", el: "vipi" },
    { head: "Cod. Enquadramento", el: "cenq" },
    { head: "CST ICMS", el: "csticms" },
    { head: "Mod. Base Calc. ICMS", el: "modbc" },
    { head: "Mod. Base Calc. ST", el: "modbcst " },
    { head: "orig", el: "orig" },
    { head: "ICMS (%)", el: "picms" },
    { head: "ICMS ST (%)", el: "picmsst" },
    { head: "MVA ST (%)", el: "pmvast" },
    { head: "Base Calc. ICMS", el: "vbcicms" },
    { head: "Base Calc. ST", el: "vbcst" },
    { head: "Val ICMS", el: "vicms" },
    { head: "Val. ICMS ST", el: "vicmsst" },
    { head: "CST Cofins", el: "cstcofins" },
    { head: "Cofins (%)", el: "pcofins" },
    { head: "Base Calc. Cofins", el: "vbccofins" },
    { head: "Val. Cofins", el: "vcofins" },
  ];

  constructor(public router: Router, readonly service: ProdutoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {}

  estados = ESTADOS_ARRAY;
  filteredResults($event: any[]) {}

  filtarRegistros(dataInicial, dataFinal, estado) {}

  limparSelecao(dataInicial, dataFinal) {
    dataInicial.datepickerInput._datepicker.select();
    dataFinal.datepickerInput._datepicker.select();
    //this.loadData();
  }
}
