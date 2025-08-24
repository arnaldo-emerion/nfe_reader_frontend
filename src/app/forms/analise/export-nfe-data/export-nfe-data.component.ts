import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ESTADOS_ARRAY } from 'app/arrays/estados.arrays';
import { NFeService } from 'app/forms/nfe/nfe.service';
import { DataUtils } from 'app/utils/data-utils';
import { log } from 'console';
import { of } from 'rxjs';

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


  constructor(private service: NFeService, private formBuilder: UntypedFormBuilder) { }

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
}
