import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DomSanitizer } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AnaliseQualitativaModule } from "app/forms/analise/analise-qualitativa/analise-qualitativa.module";
import { DestModule } from "app/forms/dest/dest.module";
import { NfeModule } from "app/forms/nfe/nfe.module";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { NotificationService } from "app/shared/notification/notification.service";
import { ToastrModule } from "ngx-toastr";
import { UsuarioComponent } from "./usuario.component";
import { UsuarioCadastroService } from "./usuario.service";

describe("UsuarioComponent", () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;
  let mockUserService: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioComponent],
      imports: [
        MatFormFieldModule,

        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        NfeModule,
        AnaliseQualitativaModule,
        DestModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        UsuarioService,
        UsuarioCadastroService,
        FormBuilder,
        NotificationService,
        DomSanitizer,
      ],
    }).compileComponents();

    mockUserService = TestBed.inject(UsuarioService);
    spyOn(mockUserService, "getUserInfo").and.returnValue({
      cognitoUserName: "",
      email: "",
      companyName: "",
      grupos: [],
      cnpj: "",
      isAdmin: true,
      idToken: "",
      identityId: "",
      usuarioNome: "",
      razaoSocial: "",
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
