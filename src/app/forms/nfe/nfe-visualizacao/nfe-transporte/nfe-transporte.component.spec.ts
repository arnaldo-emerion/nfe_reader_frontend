import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeTransporteComponent } from "./nfe-transporte.component";

describe("NfeTransporteComponent", () => {
  let component: NfeTransporteComponent;
  let fixture: ComponentFixture<NfeTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeTransporteComponent],
      imports: [PipesModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
