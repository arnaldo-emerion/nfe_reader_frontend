import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PipesModule } from "app/shared/tabelas/pipes/pipes.module";
import { NfeEmitenteComponent } from "./nfe-emitente.component";

describe("NfeEmitenteComponent", () => {
  let component: NfeEmitenteComponent;
  let fixture: ComponentFixture<NfeEmitenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeEmitenteComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeEmitenteComponent);
    component = fixture.componentInstance;
    component.dadosEmit = {
      crt: 0,
    };
    fixture.detectChanges();
  });

  it("should create.", () => {
    expect(component).toBeTruthy();
  });
});
