import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { NotificationService } from "app/shared/notification/notification.service";
import { ConfiguracaoGeralService } from "./configuracao.service";

@Component({
  selector: "app-configuracao",
  templateUrl: "./configuracao.component.html",
  styleUrls: ["./configuracao.component.css"],
})
export class ConfiguracaoComponent implements OnInit {
  formulario: UntypedFormGroup;

  constructor(
    private location: Location,
    private formBuilder: UntypedFormBuilder,
    private configGeralService: ConfiguracaoGeralService,
    private msgService: NotificationService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.loadData();
  }

  loadData() {
    this.configGeralService.getConfiguracao().subscribe((data) => {
      this.formulario.patchValue(data);
    });
  }

  saveConfig() {
    const formData = this.formulario.getRawValue();
    this.configGeralService.saveConfiguracao(formData).subscribe((data) => {
      this.msgService.showSucess("Registro salvo com sucesso");
    });
  }

  voltar() {
    this.location.back();
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      qtdMaxNFe: [""],
    });
  }
}
