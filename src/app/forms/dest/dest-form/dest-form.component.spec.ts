import { Location } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NFeService } from "app/forms/nfe/nfe.service";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { of } from "rxjs";
import { DestService } from "../dest.service";
import { DestFormComponent } from "./dest-form.component";

describe("DestFormComponent", () => {
  let component: DestFormComponent;
  let fixture: ComponentFixture<DestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestFormComponent],
      imports: [
        MatTabsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        TabelasModule,
        ModalsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        DestService,
        FormBuilder,
        NFeService,
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
              tab: 1,
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
