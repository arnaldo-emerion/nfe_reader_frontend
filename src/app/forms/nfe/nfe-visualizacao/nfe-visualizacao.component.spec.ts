import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { NFeService } from "../nfe.service";
import { NfeDestinatarioModule } from "./nfe-destinatario/nfe-destinatario.module";
import { NfeEmitenteModule } from "./nfe-emitente/nfe-emitente.module";
import { NfeTotaisModule } from "./nfe-totais/nfe-totais.module";
import { NfeTransporteModule } from "./nfe-transporte/nfe-transporte.module";
import { NfeVisualizacaoComponent } from "./nfe-visualizacao.component";

describe("NfeVisualizacaoComponent", () => {
  let component: NfeVisualizacaoComponent;
  let fixture: ComponentFixture<NfeVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeVisualizacaoComponent],
      imports: [
        MatTabsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatButtonModule,
        NfeEmitenteModule,
        NfeDestinatarioModule,
        NfeTotaisModule,
        NfeTransporteModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        NFeService,
        UntypedFormBuilder,
        Location,
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
    fixture = TestBed.createComponent(NfeVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
