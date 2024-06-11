import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { CognitoUser } from "@aws-amplify/auth";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { NotificationService } from "app/shared/notification/notification.service";
import { Auth, Storage } from "aws-amplify";
import { UsuarioCadastroService } from "./usuario.service";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.css"],
})
export class UsuarioComponent implements OnInit {
  editing = false;
  formEmpresa: FormGroup;
  formUser: FormGroup;
  userInfo;
  imageSource;

  constructor(
    private userService: UsuarioService,
    private usuarioCadastroService: UsuarioCadastroService,
    private formBuilder: FormBuilder,
    private msgService: NotificationService,
    private sanitizer: DomSanitizer,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.loadUserInformation();
    this.loadProfilePicture();
  }

  toggleEdicao() {
    this.editing = !this.editing;
  }

  loadUserInformation() {
    this.usuarioCadastroService
      .getUserInfoFromSession()
      .then((userInfo: any) => {
        this.userInfo = userInfo;
        this.formEmpresa.patchValue(userInfo);
        this.formUser.patchValue(userInfo);
      });
  }

  getCNPJInfo(cnpj) {
    this.usuarioCadastroService.getCNPJInfo(cnpj).subscribe(
      (data: any) => {
        if (data.cnpj) {
          const empresa = {
            cnpj: data.cnpj,
            razaoSocial: data.nome,
            nomeFantasia: data.fantasia,
            endereco: data.logradouro,
            bairro: data.bairro,
            municipio: data.municipio,
            uf: data.uf,
            cep: data.cep,
            descricao: this.userInfo.descricao,
          };

          this.formEmpresa.patchValue(empresa);
        }
      },
      () => {
        this.msgService.showError(
          "Não foi possível buscar automaticamente as informações da empresa, favor preencher dados manualente"
        );
      }
    );
  }

  saveCompanyInfo() {
    const companyInfo = this.formEmpresa.getRawValue();
    Auth.currentAuthenticatedUser().then((user: CognitoUser) => {
      Auth.updateUserAttributes(user, {
        "custom:cnpj": companyInfo.cnpj,
        "custom:razaoSocial": companyInfo.razaoSocial,
        "custom:nomeFantasia": companyInfo.nomeFantasia
          ? companyInfo.nomeFantasia
          : "",
        "custom:endereco": companyInfo.endereco ? companyInfo.endereco : "",
        "custom:bairro": companyInfo.bairro ? companyInfo.bairro : "",
        "custom:municipio": companyInfo.municipio ? companyInfo.municipio : "",
        "custom:uf": companyInfo.uf ? companyInfo.uf : "",
        "custom:cep": companyInfo.cep ? companyInfo.cep : "",
        "custom:descricaoEmpresa": companyInfo.descricao,
      }).then((data) => {
        this.loadUserInformation();
        this.usuarioService.loadUserInfoFromSession();
        this.msgService.showSucess("Registro salvo com sucesso!");
      });
    });
  }

  saveUserInfo() {
    const userInfo = this.formUser.getRawValue();
    Auth.currentAuthenticatedUser().then((user: CognitoUser) => {
      Auth.updateUserAttributes(user, {
        "custom:userNome": userInfo.usuarioNome,
        "custom:userCargoFuncao": userInfo.usuarioCargoFuncao,
        "custom:userDescricao": userInfo.usuarioDescricao,
      }).then((data) => {
        this.editing = false;
        this.loadUserInformation();
        this.msgService.showSucess("Registro salvo com sucesso!");
      });
    });
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      this.usuarioCadastroService
        .uploadProfilePicture(this.userService.getUserInfo().identityId, file)
        .then((data) => {
          this.msgService.showSucess("Foto de Perfil alterada com sucesso.");
          this.loadProfilePicture();
        });
    }
  }

  private loadProfilePicture() {
    Storage.list(this.userService.getUserInfo().identityId, {
      level: "protected",
    }).then((img) => {
      if (img && img.length > 0) {
        this.usuarioCadastroService
          .download(this.userService.getUserInfo().identityId)
          .then((data) => {
            let img: any;
            img = data.Body;
            const imgUrl = URL.createObjectURL(img);
            this.imageSource = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
          });
      } else {
        this.imageSource = "./assets/img/faces/marc.jpg";
      }
    });
  }

  private construirFormulario() {
    this.formEmpresa = this.formBuilder.group({
      cnpj: [""],
      razaoSocial: [{ value: "", disabled: true }],
      nomeFantasia: [{ value: "", disabled: true }],
      endereco: [{ value: "", disabled: true }],
      bairro: [{ value: "", disabled: true }],
      municipio: [{ value: "", disabled: true }],
      uf: [{ value: "", disabled: true }],
      cep: [{ value: "", disabled: true }],
      descricao: ["", Validators.required],
    });

    this.formUser = this.formBuilder.group({
      usuarioNome: [""],
      usuarioCargoFuncao: [""],
      usuarioDescricao: [""],
    });
  }
}
