import { Location } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { LoadingService } from "app/services/loading-service.ts/loading-service";
import { StatusProcessamentoService } from "app/services/loading-service.ts/status-processamento.service";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { NotificationService } from "app/shared/notification/notification.service";
import { UploadFilesService } from "../upload-files.service";
import { NfeUploadComponent } from "./nfe-upload.component";

describe("NfeUploadComponent", () => {
  let component: NfeUploadComponent;
  let fixture: ComponentFixture<NfeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NfeUploadComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatCheckboxModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UploadFilesService,
        Location,
        UsuarioService,
        NotificationService,
        StatusProcessamentoService,
        LoadingService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
