import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ESTADOS_ARRAY } from 'app/arrays/estados.arrays';
import { NFeService } from 'app/forms/nfe/nfe.service';
import { ProdutoService } from 'app/forms/produtos/produto.service';
import { DataUtils } from 'app/utils/data-utils';
import { log } from 'console';
import { of } from 'rxjs';
import * as XLSX from "xlsx";
import * as moment from "moment";

@Component({
  selector: 'app-export-nfe-data',
  templateUrl: './export-nfe-data.component.html',
  styleUrls: ['./export-nfe-data.component.css'],
})
export class ExportNfeDataComponent implements OnInit {
  data$;
  showHeader = true;
  estados = ESTADOS_ARRAY;
  formPesquisa: UntypedFormGroup;

  displayedColumns = [
    { head: "N° NFe", el: "numeroDocumento" },
    { head: "Razão Social", el: "razaoSocial" },
    { head: "Nat. Operação", el: "naturezaOperacao" },
    { head: "UF", el: "uf" },
    { head: "Data", el: "emissao", format: { tipo: "DATE" } },
    { head: "Qtd. Pedido", el: "totalPedidos" },
    {
      head: "Valor",
      el: "valorNotaFiscal",
      format: { tipo: "PIPE", pipe: "currency", arguments: "BRL" },
    },
  ];


  constructor(private service: NFeService, private formBuilder: UntypedFormBuilder,
    private prodService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.data$ = of([])
    this.construirFormulario()
  }

  loadData() {
    this.service.getDataToExport()
      .subscribe((data: any[]) => {
        console.log(data)
      })
  }

  applyFilters() {
    const raw = this.formPesquisa.getRawValue();
    console.log(raw)

    const params: any = {
      startDate: DataUtils.formatStartMoment(raw.startDate),
      endDate: DataUtils.formatEndMoment(raw.endDate),
      ufDest: raw.ufDest,
      cnpj: raw.cnpj,
      codigo: raw.codigo,
      ean: raw.ean,
      ncm: raw.ncm,
      descricao: raw.descricao
    };

    Object.keys(params).forEach(
      key => (params[key] == null || params[key] === '') && delete params[key]
    );

    const parameters = new URLSearchParams(params).toString()
    console.log(parameters)

    this.data$ = this.service.getDataToExport(parameters)
  }

  private construirFormulario() {
    this.formPesquisa = this.formBuilder.group({
      startDate: [null],
      endDate: [null],
      ufDest: [null],
      cnpj: [null],
      codigo: [null],
      ean: [null],
      ncm: [null],
      descricao: [null],
    });
  }

  identifier: string;

  exportAsOneTable(items) {
    const codPordList = [this.identifier];
    const nnfList = items.map((i) => i.seqNFe);
    if (nnfList.length == 0) return
    this.prodService
      .getProdutosByNFeByNfeListAndProdList(nnfList)
      .subscribe((data: any[]) => {
        this.exportDataToExcelAsOne(data)
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
          "Valor da NFe": it.totalIcms.valorNotaFiscal,
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
      XLSX.utils.sheet_add_json(ws, itemList, { origin: "A2" });
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
    let currentNFeNumber = ""
    let firstOccurrence = false
    data.forEach((it) => {
      var itemsFiltered: any[] = [];
      if (prod) {
        itemsFiltered = it.items.filter(
          (p) => p.produto.codigo == prod
        );
      } else itemsFiltered = it.items;

      const itemList = itemsFiltered.map((item) => {
        if (it.numeroNotaFiscal == currentNFeNumber) {
          firstOccurrence = false
        } else {
          firstOccurrence = true
        }
        currentNFeNumber = it.numeroNotaFiscal

        return {
          "Nota Fiscal": it.numeroNotaFiscal,
          "Operacao": it.naturezaOPeracao,
          "CNPJ Destinatario": it.destinatario.cpfCnpj,
          "Razao Social Destinatario": it.destinatario.razaoSocial,
          "UF Destinatario": it.destinatario.uf,
          "CNPJ Emitente": it.emitente.cpfCnpj,
          "Razao Social Emitente": it.emitente.razaoSocial,
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

          // Totais
          "Valor Total Produtos": it.totalIcms.valorProdutos,
          "Valor Nota Fiscal": this.getValorNotaFiscal(firstOccurrence, it.totalIcms.valorNotaFiscal)
        };
      });

      items.push(...itemList)

    });

    XLSX.utils.sheet_add_json(ws, items, { origin: "A2" });
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(
      wb,
      "dados-fiscais_" + moment().format("DD_MM_YYYY_HH_mm_ss") + ".xlsx"
    );
  }

  getValorNotaFiscal(firstOcurrence, valor) {
    if (firstOcurrence) {
      return valor
    } else return ""
  }
}
