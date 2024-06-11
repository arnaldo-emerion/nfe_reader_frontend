import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeTotaisComponent } from "./nfe-totais.component";

describe("NfeTotaisComponent", () => {
  let component: NfeTotaisComponent;
  let fixture: ComponentFixture<NfeTotaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeTotaisComponent],
      imports: [PipesModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
