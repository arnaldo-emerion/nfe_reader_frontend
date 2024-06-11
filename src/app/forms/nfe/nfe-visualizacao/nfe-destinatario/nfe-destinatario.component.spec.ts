import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeDestinatarioComponent } from "./nfe-destinatario.component";

describe("NfeDestinatarioComponent", () => {
  let component: NfeDestinatarioComponent;
  let fixture: ComponentFixture<NfeDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeDestinatarioComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeDestinatarioComponent);
    component = fixture.componentInstance;
    component.dadosDest = {
      indIEDest: 0,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
