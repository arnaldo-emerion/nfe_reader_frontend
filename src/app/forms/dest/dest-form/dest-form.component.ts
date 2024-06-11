import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { NFeService } from "../../nfe/nfe.service";
import { DestService } from "../dest.service";

@Component({
  selector: "app-dest-form",
  templateUrl: "./dest-form.component.html",
  styleUrls: ["./dest-form.component.scss"],
})
export class DestFormComponent implements OnInit {
  data$;

  identifier: string;
  obj$: Observable<any>;
  formulario: FormGroup;
  formularioEndereco: FormGroup;
  activeTab;

  displayedColumns = [
    { head: "N° NFe", el: "numeroNotaFiscal" },
    { head: "Razão Social", el: "razaoSocial" },
    { head: "Nat. Operação", el: "naturezaOperacao" },
    { head: "Chave de Acesso", el: "chaveAcesso" },
    { head: "Data", el: "emissao", format: { tipo: "DATE" } },
  ];

  constructor(
    private service: DestService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private nfeService: NFeService,
    private location: Location,
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
    this.identifier = this.route.snapshot.paramMap.get("identificador");
    this.service.getById(this.identifier).subscribe((data) => {
      const nfe = {
        id: data.id,
        cnpj: data.cnpj,
        nome: data.razaoSocial,
        ie: data.ie,
      };

      const endereco = {
        id: data.id,
        bairro: data.bairro,
        cep: data.cep,
        fone: data.telefone,
        uf: data.uf,
        xmun: data.municipio,
      };

      this.formulario.patchValue(nfe);
      this.formularioEndereco.patchValue(endereco);

      this.data$ = this.nfeService.getByCnpj(data.cnpj);
    });
  }

  voltar() {
    this.location.back();
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }
    this.router.navigate(["nfe/" + $event.id]);
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
      cnpj: [{ value: "", disabled: true }],
      nome: [{ value: "", disabled: true }],
      ie: [{ value: "", disabled: true }],
    });

    this.formularioEndereco = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      bairro: [{ value: "", disabled: true }],
      cep: [{ value: "", disabled: true }],
      fone: [{ value: "", disabled: true }],
      uf: [{ value: "", disabled: true }],
      xmun: [{ value: "", disabled: true }],
    });
  }
}
