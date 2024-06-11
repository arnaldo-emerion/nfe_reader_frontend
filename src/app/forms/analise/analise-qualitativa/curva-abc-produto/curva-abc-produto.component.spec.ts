import { CurrencyPipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { CurvaAbcProdutoComponent } from "./curva-abc-produto.component";

describe("CurvaAbcProdutoComponent", () => {
  let component: CurvaAbcProdutoComponent;
  let fixture: ComponentFixture<CurvaAbcProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurvaAbcProdutoComponent],
      imports: [
        MatButtonToggleModule,
        HttpClientTestingModule,
        RouterTestingModule,
        PipesModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvaAbcProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
