import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";
import { ESTADOS_ARRAY } from "app/arrays/estados.arrays";
import { DataUtils } from "app/utils/data-utils";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import * as XLSX from "xlsx";
import { NFeService } from "../../nfe/nfe.service";
import { ProdutoService } from "../produto.service";
import * as moment from "moment";
import { debug } from "console";
@Component({
  selector: "app-prod-form",
  templateUrl: "./prod-form.component.html",
  styleUrls: ["./prod-form.component.scss"],
})
export class ProdFormComponent implements OnInit {
  estados = ESTADOS_ARRAY;

  @ViewChild("estado") estado: MatSelect;
  @ViewChild("municipio") municipio: MatSelect;
  @ViewChild("dataInicial") dataInicial: any;
  @ViewChild("dataFinal") dataFinal: any;

  data$;

  identifier: string;
  obj$: Observable<any>;
  formulario: UntypedFormGroup;
  activeTab;

  descricaoSubTitle;

  allData;
  municipioList;

  displayedColumns = [
    { head: "N° NFe", el: "numeroNotaFiscal" },
    { head: "Razão Social", el: "razaoSocial" },
    { head: "Nat. Operação", el: "naturezaOperacao" },
    { head: "UF", el: "uf" },
    { head: "Emissão", el: "emissao", format: { tipo: "DATE" } },
    {
      head: "Preço de Venda nesta NFe",
      el: "valorUnitario",
      format: { tipo: "PIPE", pipe: "decimal"},
    },
    { head: "Qtd", el: "quantidade" },
    {
      head: "Val Total",
      el: "valorTotal",
      format: { tipo: "PIPE", pipe: "decimal"},
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private nfeService: NFeService,
    private location: Location,
    private prodService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.carregarDados();
    this.route.queryParams.subscribe((params) => {
      this.activeTab = params["tab"] || 0;
    });
  }

  carregarDados() {
    this.identifier = this.route.snapshot.paramMap.get("codigoProduto");
    this.prodService.getByCodigo(this.identifier).subscribe((data) => {
      this.descricaoSubTitle =
        data.codigo + " (NCM: " + data.ncm + ") - " + data.descricao;
      const prod = {
        id: data.id,
        codigo: data.codigo,
        ncm: data.ncm,
        nome: data.descricao,
        unidade: data.unidade,
      };

      this.formulario.patchValue(prod);

      this.data$ = this.nfeService.getByCodProd(data.codigo).pipe(
        tap((d) => {
          this.allData = d;
          this.filteredDataList = d;
          this.fulfillMunicipioComboBox(d);
        })
      );
    });
  }

  voltar() {
    this.location.back();
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }
    if ($event.tipoDocumento == "CUPOM_FISCAL") {
      console.log("Visualização ainda não implementada")
    } else {
      this.router.navigate(["nfe/" + $event.seqNFe]);
    }
  }

  update() {
    Object.keys(this.formulario.controls).forEach((field) => {
      const control = this.formulario.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.formulario.invalid) {
      return;
    }
  }

  disponibilizarAtividade() { }

  indisponibilizarAtividade() { }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      codigo: [{ value: "", disabled: true }],
      ncm: [{ value: "", disabled: true }],
      nome: [{ value: "", disabled: true }],
      unidade: [{ value: "", disabled: true }],
    });
  }

  filteredDataList;
  filtrarEstado(estado) {
    this.limparDatas();
    let filteredData: [];
    if (estado != "TODOS") {
      filteredData = this.allData.filter((item) => item.uf == estado);
    } else {
      filteredData = this.allData;
      this.municipio.value = "TODOS";
    }

    this.fulfillMunicipioComboBox(filteredData);
    this.data$ = of(filteredData);
    this.filteredDataList = filteredData;
  }

  filtrarMunicipio(municipio) {
    this.limparDatas();
    let filteredData: [];
    if (municipio != "TODOS") {
      filteredData = this.allData.filter((item) => item.municipio == municipio);
      this.data$ = of(filteredData);
      this.filteredDataList = filteredData;
    } else {
      this.filtrarEstado(this.estado.value);
    }
  }

  fulfillMunicipioComboBox(data: any[]) {
    let allMunicipios = data.map((i) => i.municipio);
    const mList = allMunicipios.filter((el, i, a) => i === a.indexOf(el));
    mList.sort();

    this.municipioList = mList;
  }

  filtarRegistros() {
    const startDate = DataUtils.dateCompToDateInicial(this.dataInicial);
    const endDate = DataUtils.dateCompToDateFinal(this.dataFinal);

    const dataFilter = this.filteredDataList.filter(
      (item) => item.emissao >= startDate && item.emissao <= endDate
    );

    this.data$ = of(dataFilter);
  }

  limparSelecao() {
    this.limparDatas();
    this.estado.value = "TODOS";
    this.filtrarEstado("TODOS");
  }

  limparDatas() {
    this.dataInicial.datepickerInput._datepicker.select();
    this.dataFinal.datepickerInput._datepicker.select();
    this.data$ = of(this.allData);
  }

  exportToExcelFunc(items) {
    const codPordList = [this.identifier];
    const nnfList = items.map((i) => i.seqNFe);
    if (nnfList.length == 0) return
    this.prodService
      .getProdutosByNFeByNfeListAndProdList(nnfList)
      .subscribe((data: any[]) => {
        this.exportDataToExcel(data)
      });
  }

  exportToExcelFuncSpecific(items) {
    const codPordList = [this.identifier];
    const nnfList = items.map((i) => i.seqNFe);
    if (nnfList.length == 0) return
    this.prodService
      .getProdutosByNFeByNfeListAndProdList(nnfList)
      .subscribe((data: any[]) => {
        this.exportDataToExcel(data, codPordList)
      });
  }

  exportAsOneTable(items) {
    const codPordList = [this.identifier];
    const nnfList = items.map((i) => i.seqNFe);
    if (nnfList.length == 0) return
    this.prodService
      .getProdutosByNFeByNfeListAndProdList(nnfList)
      .subscribe((data: any[]) => {
        this.exportDataToExcelAsOne(data, codPordList)
      });
  }

  getFileName(name) {
    return {
      sheetName: "informacoes-nfe-" + name,
      fileName: "informacoes-nfe-" + name,
    };
  }

  exportDataToExcel(data: any[], prod?) {
    var wb = XLSX.utils.book_new();
    data.forEach((it) => {
      let { sheetName } = this.getFileName(it.numeroNotaFiscal);
      var ws = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_json(ws, [
        {
          "Num. NFe": it.numeroNotaFiscal,
          // Dados do Emitente
          "CNPJ Emitente": it.emitente.cpfCnpj,
          "Razao Social Emitente": it.emitente.razaoSocial,
          "Nome Fantasia Emitente": it.emitente.nomeFantasia,
          "Logradouro Emitente": it.emitente.logradouro,
          "Numero Emitente": it.emitente.numero,
          "Bairro Emitente": it.emitente.bairro,
          "Municipio Emitente": it.emitente.municipio,
          "Uf Emitente": it.emitente.uf,
          "CEP Emitente": it.emitente.cep,
          "País Emitente": it.emitente.xPais,
          "Telefone Emitente": it.emitente.telefone,

          // Dados do Destinatario
          "CNPJ Destinatario": it.destinatario.cpfCnpj,
          "Razao Social Destinatario": it.destinatario.razaoSocial,
          "Logradouro Destinatario": it.destinatario.logradouro,
          "Numero Destinatario": it.destinatario.numero,
          "Bairro Destinatario": it.destinatario.bairro,
          "Municipio Destinatario": it.destinatario.municipio,
          "Uf Destinatario": it.destinatario.uf,
          "CEP Destinatario": it.destinatario.cep,
          "País Destinatario": it.destinatario.xPais,
          "Telefone Destinatario": it.destinatario.telefone,

          // Dados Totais
          "Base de Calculo": it.totalIcms.valorBaseCalculo,
          "Valor do Icms": it.totalIcms.valorIcms,
          "Base de Calculo da ST": it.totalIcms.valorBaseCalculoST,
          "Valor da ST": it.totalIcms.valorST,
          "Valor dos Produtos": it.totalIcms.valorProdutos,
          "Valor do Frete": it.totalIcms.valorFrete,
          "Valor do Seguro": it.totalIcms.valorSeguro,
          "Valor do Desconto": it.totalIcms.valorDesconto,
          "Valor do Imposto de Importacao": it.totalIcms.valorImpostoImportacao,
          "Valor do Ipi": it.totalIcms.valorIpi,
          "Valor do Pis": it.totalIcms.valorPis,
          "Valor do Cofins": it.totalIcms.valorCofins,
          "Outros Valores": it.totalIcms.valorOutros,
          "Valor da NFe": it.totalIcms.valorTotalTributos,
        },
      ]);

      var itemsFiltered: any[] = [];
      if (prod) {
        itemsFiltered = it.items.filter(
          (p) => p.produto.codigo == prod
        );
      } else itemsFiltered = it.items;

      const itemList = itemsFiltered.map((item) => {
        return {
          "Código do Item": item.produto.codigo,
          Ean: item.produto.ean,
          "Descrição do Item": item.produto.descricao,
          Ncm: item.produto.ncm,
          CFOP: item.cfop,
          Unidade: item.unidade,
          Quantidade: item.quantidade,
          "Valor Unitario": item.valorUnitario,
          "Valor Total": item.valorTotal,

          // Icms
          Origem: item.icms.origem,
          CST: item.icms.cst,
          "Mod Base de Calculo": item.icms.modBaseCalculo,
          "Valor da Base de Calculo": item.icms.valorBaseCalculo,
          "Percentual do Icms": item.icms.percentualIcms,
          "Valor do ICMS": item.icms.valor,
          "Mod da Base de Calculo de ST": item.icms.modBaseCalculoST,
          "Percentual de Mva ST": item.icms.percentualMVAST,
          "Valor da Basede Calculo de ST": item.icms.valorBaseCalculoST,
          "Percentual de Icms ST": item.icms.percentualST,
          "Valor de Icms ST": item.icms.valorST,

          // Ipi
          "IPI CST": item.ipi.cst,
          "IPI Base de Calculo": item.ipi.valorBaseCalculo,
          "IPI Percentual": item.ipi.percentual,
          "IPI Valor": item.ipi.valor,

          // Pis
          "PIS CST": item.pis.cst,
          "PIS Base de Calculo": item.pis.valorBaseCalculo,
          "PIS Percentual": item.pis.percentual,
          "PIS Valor": item.pis.valor,

          // Cofins
          "Cofins CST": item.cofins.cst,
          "Cofins Base de Calculo": item.cofins.valorBaseCalculo,
          "Cofins Percentual": item.cofins.percentual,
          "Cofins Valor": item.cofins.valor,
        };
      });
      XLSX.utils.sheet_add_json(ws, itemList, { origin: "A5" });
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });
    XLSX.writeFile(
      wb,
      "dados-fiscais_" + moment().format("DD_MM_YYYY_HH_mm_ss") + ".xlsx"
    );
  }

  exportDataToExcelAsOne(data: any[], prod?) {
    var wb = XLSX.utils.book_new();
    const items: any[] = [];
    let { sheetName } = this.getFileName(prod);
    var ws = XLSX.utils.json_to_sheet([]);

    data.forEach((it) => {
      var itemsFiltered: any[] = [];
      if (prod) {
        itemsFiltered = it.items.filter(
          (p) => p.produto.codigo == prod
        );
      } else itemsFiltered = it.items;

      const itemList = itemsFiltered.map((item) => {
        return {
          "Nota Fiscal": it.numeroNotaFiscal,
          "Operacao": it.naturezaOPeracao,
          "Destinatario": it.destinatario.cpfCnpj,
          "UF Destino": it.destinatario.uf,
          "Código do Item": item.produto.codigo,
          Ean: item.produto.ean,
          "Descrição do Item": item.produto.descricao,
          Ncm: item.produto.ncm,
          CFOP: item.cfop,
          Unidade: item.unidade,
          Quantidade: item.quantidade,
          "Valor Unitario": item.valorUnitario,
          "Valor Total": item.valorTotal,

          // Icms
          Origem: item.icms.origem,
          CST: item.icms.cst,
          "Mod Base de Calculo": item.icms.modBaseCalculo,
          "Valor da Base de Calculo": item.icms.valorBaseCalculo,
          "Percentual do Icms": item.icms.percentual,
          "Valor do ICMS": item.icms.valor,
          "Mod da Base de Calculo de ST": item.icms.modBaseCalculoST,
          "Percentual de Mva ST": item.icms.percentualMVAST,
          "Valor da Basede Calculo de ST": item.icms.valorBaseCalculoST,
          "Percentual de Icms ST": item.icms.percentualST,
          "Valor de Icms ST": item.icms.valorST,

          // Ipi
          "IPI CST": item.ipi.cst,
          "IPI Base de Calculo": item.ipi.valorBaseCalculo,
          "IPI Percentual": item.ipi.percentual,
          "IPI Valor": item.ipi.valor,

          // Pis
          "PIS CST": item.pis.cst,
          "PIS Base de Calculo": item.pis.valorBaseCalculo,
          "PIS Percentual": item.pis.percentual,
          "PIS Valor": item.pis.valor,

          // Cofins
          "Cofins CST": item.cofins.cst,
          "Cofins Base de Calculo": item.cofins.valorBaseCalculo,
          "Cofins Percentual": item.cofins.percentual,
          "Cofins Valor": item.cofins.valor,
        };
      });

      items.push(...itemList)

    });

    XLSX.utils.sheet_add_json(ws, items, { origin: "A5" });
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(
      wb,
      "dados-fiscais_" + moment().format("DD_MM_YYYY_HH_mm_ss") + ".xlsx"
    );
  }

}
