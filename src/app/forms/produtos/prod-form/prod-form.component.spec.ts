import { Location } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NFeService } from "app/forms/nfe/nfe.service";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { of } from "rxjs";
import { ProdutoService } from "../produto.service";
import { ProdFormComponent } from "./prod-form.component";

describe("ProdFormComponent", () => {
  let component: ProdFormComponent;
  let fixture: ComponentFixture<ProdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdFormComponent],
      imports: [
        MatTabsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        TabelasModule,
        ModalsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UntypedFormBuilder,
        NFeService,
        Location,
        ProdutoService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                codigoProduto: 1,
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
    fixture = TestBed.createComponent(ProdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
