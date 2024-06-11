import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSelectModule } from "@angular/material/select";
import { RouterTestingModule } from "@angular/router/testing";
import { ModalsModule } from "app/shared/modals/modals.module";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { DestService } from "../dest.service";
import { DestListComponent } from "./dest-list.component";

describe("DestListComponent", () => {
  let component: DestListComponent;
  let fixture: ComponentFixture<DestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestListComponent],
      imports: [
        TabelasModule,
        ModalsModule,
        MatSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [DestService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
