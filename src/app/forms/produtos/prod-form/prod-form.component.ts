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
      format: { tipo: "PIPE", pipe: "currency", arguments: "BRL" },
    },
    { head: "Qtd", el: "quantidade" },
    {
      head: "Val Total",
      el: "valorTotal",
      format: { tipo: "PIPE", pipe: "currency", arguments: "BRL" },
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private nfeService: NFeService,
    private location: Location,
    private prodService: ProdutoService,
    private router: Router
  ) {}

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
    if($event.tipoDocumento == "CUPOM_FISCAL") {
      console.log("Visualização ainda não implementada")
    } else {
      this.router.navigate(["nfe/" + $event.id]);
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

  disponibilizarAtividade() {}

  indisponibilizarAtividade() {}

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
      (item) => item.dhEmi >= startDate && item.dhEmi <= endDate
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
    const nnfList = items.map((i) => i.nnf);
    if(nnfList.length == 0) return
    this.prodService
      .getProdutosByNFeByNfeListAndProdList(codPordList, nnfList)
      .subscribe((data: any[]) => {
        this.exportDataToExcel(data)
      });
  }

  exportToExcelFuncSpecific(items) {
    const codPordList = [this.identifier];
    const nnfList = items.map((i) => i.nnf);
    if(nnfList.length == 0) return
    this.prodService
      .getProdutosByNFeByNfeListAndProdList(codPordList, nnfList)
      .subscribe((data: any[]) => {
        this.exportDataToExcel(data, codPordList)
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
      let { sheetName } = this.getFileName(it.nnf);
      var ws = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_json(ws, [
        {
          "Num. NFe": it.nnf,
          // Dados do Emitente
          "CNPJ Emitente": it.emitente.cnpj,
          "Razao Social Emitente": it.emitente.nome,
          "Nome Fantasia Emitente": it.emitente.nomeFantasia,
          "Logradouro Emitente": it.emitente.logradouro,
          "Numero Emitente": it.emitente.numero,
          "Bairro Emitente": it.emitente.bairro,
          "Municipio Emitente": it.emitente.nomeMunicipio,
          "Uf Emitente": it.emitente.uf,
          "CEP Emitente": it.emitente.cep,
          "País Emitente": it.emitente.nomePais,
          "Telefone Emitente": it.emitente.fone,

          // Dados do Destinatario
          "CNPJ Destinatario": it.destinatario.cnpj,
          "Razao Social Destinatario": it.destinatario.nome,
          "Logradouro Destinatario": it.destinatario.logradouro,
          "Numero Destinatario": it.destinatario.numero,
          "Bairro Destinatario": it.destinatario.bairro,
          "Municipio Destinatario": it.destinatario.nomeMunicipio,
          "Uf Destinatario": it.destinatario.uf,
          "CEP Destinatario": it.destinatario.cep,
          "País Destinatario": it.destinatario.nomePais,
          "Telefone Destinatario": it.destinatario.fone,

          // Dados Totais
          "Base de Calculo": it.totais.baseCalculo,
          "Valor do Icms": it.totais.valorIcms,
          "Base de Calculo da ST": it.totais.baseCalculoST,
          "Valor da ST": it.totais.valorST,
          "Valor dos Produtos": it.totais.valorProduto,
          "Valor do Frete": it.totais.valorFrete,
          "Valor do Seguro": it.totais.valorSeguro,
          "Valor do Desconto": it.totais.valorDesconto,
          "Valor do Imposto de Importacao": it.totais.valorImpostoImportacao,
          "Valor do Ipi": it.totais.valorIpi,
          "Valor do Pis": it.totais.valorPis,
          "Valor do Cofins": it.totais.valorCofins,
          "Outros Valores": it.totais.valorOutros,
          "Valor da NFe": it.totais.valorNFe,
        },
      ]);

      var itemsFiltered: any[] = [];
      if (prod) {
        itemsFiltered = it.itens.filter(
          (produto) => produto.codigoProduto == prod
        );
      } else itemsFiltered = it.itens;

      const itemList = itemsFiltered.map((item) => {
        return {
          "Código do Item": item.codigoProduto,
          Ean: item.ean,
          "Descrição do Item": item.nomeProduto,
          Ncm: item.ncm,
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
          "Valor do ICMS": item.icms.valorICMS,
          "Mod da Base de Calculo de ST": item.icms.modBaseCalculoST,
          "Percentual de Mva ST": item.icms.percentualMvaST,
          "Valor da Basede Calculo de ST": item.icms.valorBaseCalculoST,
          "Percentual de Icms ST": item.icms.percentualIcmsST,
          "Valor de Icms ST": item.icms.valorIcmsST,

          // Ipi
          "IPI CST": item.ipi.cst,
          "IPI Base de Calculo": item.ipi.baseCalculo,
          "IPI Percentual": item.ipi.percentual,
          "IPI Valor": item.ipi.valor,

          // Pis
          "PIS CST": item.pis.cst,
          "PIS Base de Calculo": item.pis.baseCalculo,
          "PIS Percentual": item.pis.percentual,
          "PIS Valor": item.pis.valor,

          // Cofins
          "Cofins CST": item.cofins.cst,
          "Cofins Base de Calculo": item.cofins.baseCalculo,
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

}
