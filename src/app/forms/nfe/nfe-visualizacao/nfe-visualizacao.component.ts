import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, NgForm } from "@angular/forms";
import { MatAccordion } from "@angular/material/expansion";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "aws-amplify";
import * as moment from "moment";
import { NFeService } from "../nfe.service";

@Component({
  selector: "app-nfe-visualizacao",
  templateUrl: "./nfe-visualizacao.component.html",
  styleUrls: ["./nfe-visualizacao.component.scss"],
})
export class NfeVisualizacaoComponent implements OnInit {
  @ViewChild("formAtividade") ngForm: NgForm;
  @ViewChild("formEmitente") ngFormEmitente: NgForm;
  @ViewChild("formDestinatario") ngFormDestinatario: NgForm;
  @ViewChild("accordion", { static: true }) accordion: MatAccordion;

  identifier: string;
  itemList: [];
  formulario: UntypedFormGroup;
  formularioEmitente: UntypedFormGroup;
  formularioDestinatario: UntypedFormGroup;

  activeTab;

  constructor(
    private service: NFeService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.carregarDados();

    this.route.queryParams.subscribe((params) => {
      this.activeTab = params["tab"] || 0;
    });
  }

  dadosEmit;
  dadosDest;
  dadosTotais;
  dadosTransporte;
  infoAdicional;
  infoNFe;
  carregarDados() {
    this.identifier = this.route.snapshot.paramMap.get("identificador");
    this.service.getById(this.identifier).subscribe((data) => {
      this.dadosEmit = data.emitente;
      this.dadosDest = data.destinatario;
      this.dadosTotais = data.totalIcms;
      this.dadosTransporte = data.transportadora;
      this.infoAdicional = data.infoAdicional;

      this.infoNFe = "( " + data.numeroNotaFiscal + " ) " + data.destinatario.razaoSocial;

      const nfe = {
        id: data.id,
        natOp: data.naturezaOPeracao,
        tpNF: data.natOperacao == 0 ? "Entrada" : "Saida",
        chaveNFe: data.chaveAcesso,
        nNF: data.numeroNotaFiscal,
        dhEmi: moment(data.dataEmissao).format("DD/MM/yyyy"),
        vprod: data.totalIcms.valorProdutos,
        vicms: data.totalIcms.valorIcms,
        vipi: data.totalIcms.valorIpi,
        vnf: data.totalIcms.valorNotaFiscal,
      };

      const emitente = {
        cnpj: data.emitente.cpfCnpj,
        ie: data.emitente.inscricaoEstadual,
        razaoSocial: data.emitente.razaoSocial,
        municipio: data.emitente.municipio,
        uf: data.emitente.uf,
      };

      const destinatario = {
        id: data.destinatario.id,
        cnpj: data.destinatario.cpfCnpj,
        ie: data.destinatario.ie,
        razaoSocial: data.destinatario.razaoSocial,
        municipio: data.destinatario.municipio,
        uf: data.destinatario.uf,
      };

      this.itemList = data.items;
      this.arquivoNFe = data.fileName;

      this.formulario.patchValue(nfe);
      this.formularioEmitente.patchValue(emitente);
      this.formularioDestinatario.patchValue(destinatario);
    });
  }

  voltar() {
    this.location.back();
  }

  goToClienteDetail() {
    const destId = this.formularioDestinatario.get("id").value;
    this.router.navigate(["destinatario/" + destId]);
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      natOp: [{ value: "", disabled: true }],
      tpNF: [{ value: "", disabled: true }],
      chaveNFe: [{ value: "", disabled: true }],
      nNF: [{ value: "", disabled: true }],
      dhEmi: [{ value: "", disabled: true }],
      vprod: [{ value: "", disabled: true }],
      vipi: [{ value: "", disabled: true }],
      vicms: [{ value: "", disabled: true }],
      vnf: [{ value: "", disabled: true }],
    });

    this.formularioEmitente = this.formBuilder.group({
      cnpj: [{ value: "", disabled: true }],
      ie: [{ value: "", disabled: true }],
      razaoSocial: [{ value: "", disabled: true }],
      municipio: [{ value: "", disabled: true }],
      uf: [{ value: "", disabled: true }],
    });

    this.formularioDestinatario = this.formBuilder.group({
      id: [],
      cnpj: [{ value: "" }],
      ie: [{ value: "", disabled: true }],
      razaoSocial: [{ value: "", disabled: true }],
      municipio: [{ value: "", disabled: true }],
      uf: [{ value: "", disabled: true }],
    });
  }

  arquivoNFe;
  downloadArquivo() {
    this.download(this.arquivoNFe);
  }

  async download(fileKey) {
    const result = await Storage.get(fileKey, {
      level: "private",
      download: true,
    });
    this.downloadBlob(result.Body, fileKey);
  }

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download";
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };
    a.addEventListener("click", clickHandler, false);
    a.click();
    return a;
  }
}
