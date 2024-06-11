import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RouterTestingModule } from "@angular/router/testing";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { TotalImpostoComponent } from "./total-imposto.component";

describe("TotalImpostoComponent", () => {
  let component: TotalImpostoComponent;
  let fixture: ComponentFixture<TotalImpostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalImpostoComponent],
      imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        DirectivesModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalImpostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
