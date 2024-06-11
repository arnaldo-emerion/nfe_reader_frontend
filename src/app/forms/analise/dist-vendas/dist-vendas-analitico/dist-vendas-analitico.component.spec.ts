import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { ToastrModule } from "ngx-toastr";
import { ModalDetalheCurvaAbcModule } from "../../analise-qualitativa/curva-abc-cliente/modal-detalhe-curva-abc/modal-detalhe-curva-abc.module";
import { DistVendasAnaliticoComponent } from "./dist-vendas-analitico.component";

describe("DistVendasAnaliticoComponent", () => {
  let component: DistVendasAnaliticoComponent;
  let fixture: ComponentFixture<DistVendasAnaliticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistVendasAnaliticoComponent],
      imports: [
        ModalDetalheCurvaAbcModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        PipesModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistVendasAnaliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
