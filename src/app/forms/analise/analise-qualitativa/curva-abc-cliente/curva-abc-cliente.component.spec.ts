import { CurrencyPipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { DirectivesModule } from "app/shared/directives/directives.module";
import { NotificationService } from "app/shared/notification/notification.service";
import { ToastrModule } from "ngx-toastr";
import { AnaliseService } from "../../analise.service";
import { CurvaAbcClienteComponent } from "./curva-abc-cliente.component";
import { ModalDetalheCurvaAbcModule } from "./modal-detalhe-curva-abc/modal-detalhe-curva-abc.module";

describe("CurvaAbcClienteComponent", () => {
  let component: CurvaAbcClienteComponent;
  let fixture: ComponentFixture<CurvaAbcClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurvaAbcClienteComponent],
      imports: [
        ModalDetalheCurvaAbcModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        DirectivesModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [AnaliseService, MatDialog, CurrencyPipe, NotificationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvaAbcClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
