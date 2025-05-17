import { Location } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationService } from "app/shared/notification/notification.service";
import { TabelasModule } from "app/shared/tabelas/tabelas.module";
import { ToastrModule } from "ngx-toastr";
import { ConfiguracaoComponent } from "./configuracao.component";
import { ConfiguracaoGeralService } from "./configuracao.service";

describe("ConfiguracaoComponent", () => {
  let component: ConfiguracaoComponent;
  let fixture: ComponentFixture<ConfiguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracaoComponent],
      imports: [
        MatTabsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatCheckboxModule,
        TabelasModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        Location,
        UntypedFormBuilder,
        ConfiguracaoGeralService,
        NotificationService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
