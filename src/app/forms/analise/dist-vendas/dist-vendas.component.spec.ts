import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NFeService } from "app/forms/nfe/nfe.service";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { DistVendasAnaliticoModule } from "./dist-vendas-analitico/dist-vendas-analitico.module";
import { DistVendasComponent } from "./dist-vendas.component";

describe("DistVendasComponent", () => {
  let component: DistVendasComponent;
  let fixture: ComponentFixture<DistVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistVendasComponent],
      imports: [
        TabelasModule,
        ModalsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatSelectModule,
        DistVendasAnaliticoModule,
        DirectivesModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [NFeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
