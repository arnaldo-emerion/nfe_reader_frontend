import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { AnaliseService } from "app/forms/analise/analise.service";
import { ModalDetalheCurvaAbcComponent } from "./modal-detalhe-curva-abc.component";

describe("ModalDetalheCurvaAbcComponent", () => {
  let component: ModalDetalheCurvaAbcComponent;
  let fixture: ComponentFixture<ModalDetalheCurvaAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDetalheCurvaAbcComponent],
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        AnaliseService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            clientModel: {
              cnpj: "01234567890123",
            },
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalheCurvaAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
