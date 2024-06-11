import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EmitenteService } from "app/services/loading-service.ts/emitente-service";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { SidebarComponent } from "./sidebar.component";

describe("SidebarComponent", () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockUserService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EmitenteService, UsuarioService],
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
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
