import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { RouterTestingModule } from "@angular/router/testing";
import { AnaliseService } from "../../analise.service";
import { CurvaAbcFaturamentoComponent } from "./curva-abc-faturamento.component";

describe("CurvaAbcFaturamentoComponent", () => {
  let component: CurvaAbcFaturamentoComponent;
  let fixture: ComponentFixture<CurvaAbcFaturamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurvaAbcFaturamentoComponent],
      imports: [
        MatButtonToggleModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AnaliseService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvaAbcFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
