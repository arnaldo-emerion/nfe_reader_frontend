import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { AnaliseService } from "app/forms/analise/analise.service";
import { ModalAbcProdutoDetalheComponent } from "./modal-abc-produto-detalhe.component";

describe("ModalAbcProdutoDetalheComponent", () => {
  let component: ModalAbcProdutoDetalheComponent;
  let fixture: ComponentFixture<ModalAbcProdutoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAbcProdutoDetalheComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AnaliseService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            produtoModel: {
              codigo: "1",
              descricao: "descricao",
            },
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAbcProdutoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
