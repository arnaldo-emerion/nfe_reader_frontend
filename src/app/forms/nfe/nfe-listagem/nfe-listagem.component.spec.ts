import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RouterTestingModule } from "@angular/router/testing";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { ModalsModule } from "app/shared/modals/modals.module";
import { NotificationService } from "app/shared/notification/notification.service";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ToastrModule } from "ngx-toastr";
import { NFeService } from "../nfe.service";
import { NfeListagemComponent } from "./nfe-listagem.component";

describe("NfeListagemComponent", () => {
  let component: NfeListagemComponent;
  let fixture: ComponentFixture<NfeListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeListagemComponent],
      imports: [
        TabelasModule,
        ModalsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        DirectivesModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [NFeService, NotificationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
