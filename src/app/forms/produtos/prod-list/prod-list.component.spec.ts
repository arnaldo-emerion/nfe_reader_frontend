import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { of } from "rxjs";
import { ProdutoService } from "../produto.service";
import { ProdListComponent } from "./prod-list.component";

describe("ProdListComponent", () => {
  let component: ProdListComponent;
  let fixture: ComponentFixture<ProdListComponent>;
  let mockService: ProdutoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdListComponent],
      imports: [
        TabelasModule,
        ModalsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [ProdutoService],
    }).compileComponents();

    mockService = TestBed.inject(ProdutoService);
    spyOn(mockService, "getCabecalho").and.returnValue(
      of([
        {
          codigo: "12345",
          descricao: "descricao teste",
          ean: "ean teste",
          unidade: "unidade teste",
          ncm: "01234567",
        },
      ])
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdListComponent);
    component = fixture.componentInstance;
    spyOn(component.router, "navigate").and.returnValue(
      new Promise<boolean>((resolve) => resolve(true))
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call navigation to the details", () => {
    component.onRowSelect({ codigo: 12345 });
    expect(component.router.navigate).toHaveBeenCalledWith(
      ["produto/12345"],
      Object({ queryParams: Object({ tab: "6" }) })
    );
  });

  it("should not call navigation", () => {
    component.onRowSelect(null);
    expect(component.router.navigate).toHaveBeenCalledTimes(0);
  });
});
