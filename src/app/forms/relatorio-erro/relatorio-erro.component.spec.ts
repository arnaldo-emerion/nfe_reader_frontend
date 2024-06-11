import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { of } from "rxjs";
import { RelatorioErroComponent } from "./relatorio-erro.component";
import { RelatorioErroService } from "./relatorio-erro.service";

describe("RelatorioErroComponent", () => {
  let component: RelatorioErroComponent;
  let fixture: ComponentFixture<RelatorioErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioErroComponent],
      imports: [
        TabelasModule,
        ModalsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        RelatorioErroService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                identificador: 1,
              }),
            },
            queryParams: of({
              identificador: 1,
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
