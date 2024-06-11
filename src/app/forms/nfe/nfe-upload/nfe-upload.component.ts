import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { LoadingService } from "app/services/loading-service.ts/loading-service";
import { StatusProcessamentoService } from "app/services/loading-service.ts/status-processamento.service";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { NotificationService } from "app/shared/notification/notification.service";
import { Observable } from "rxjs";
import { UploadFilesService } from "../upload-files.service";

@Component({
  selector: "app-nfe-upload",
  templateUrl: "./nfe-upload.component.html",
  styleUrls: ["./nfe-upload.component.scss"],
})
export class NfeUploadComponent implements OnInit {
  @ViewChild("paginatorLoadFiles") paginator: MatPaginator;
  @ViewChild("paginatorFilesLoaded") paginatorFilesLoaded: MatPaginator;

  displayedColumns: string[] = ["position", "name", "motivo"];

  dataSource;
  selectedFiles: FileList;
  progressInfos = [];
  indexToBeProcessed = 0;
  fileInfos: Observable<any>;

  totalGeral = 0;
  totalProcessado = 0;
  processando = false;
  allData;

  constructor(
    private uploadService: UploadFilesService,
    private location: Location,
    private usuarioService: UsuarioService,
    private msgService: NotificationService,
    private statusProcessamentoService: StatusProcessamentoService,
    private loadService: LoadingService
  ) {}

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  selectFiles(event) {
    this.processando = false;
    this.progressInfos = [];
    this.indexToBeProcessed = 0;
    this.dataSource.data = [...this.dataSource.data, ...event.target.files];
    this.allData = this.dataSource.data;
    this.selectedFiles = event.target.files;
    this.dataSource.paginator = this.paginator;

    this.totalProcessado = 0;
    this.totalGeral = this.dataSource.data.length;
  }

  voltar() {
    this.location.back();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  contemArquivoZIP = false;
  uploadFiles() {
    this.contemArquivoZIP = false;
    this.totalProcessado = 0;
    const userStatistics = this.usuarioService.getUserStatistics();
    const userInfo = this.usuarioService.getUserInfo();
    this.loadService.setLoading(true);
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (
        !userInfo.isAdmin &&
        userStatistics.qtdNFeProcessadas >= userStatistics.qtdMaxNFePermitidas
      ) {
        this.msgService.showError(
          "Usuário ultrapassou o limite de envios de NFe: " +
            userStatistics.qtdNFeProcessadas
        );
        break;
      }

      if (this.dataSource.data[i].name.endsWith(".zip")) {
        this.contemArquivoZIP = true;
      }

      this.dataSource.data[i].status = "processing";

      this.upload(i, this.dataSource.data[i]);
      userStatistics.qtdNFeProcessadas++;
    }
  }

  upload(idx, file) {
    const userInfo = this.usuarioService.getUserInfo();
    const userStatistics = this.usuarioService.getUserStatistics();
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.uploadToAwsS3Bucket(userInfo.cognitoUserName + "/" + file.name, file).then((file) => {
      this.dataSource.data[idx].status = "success";
      this.dataSource.data[idx].motivo =
        "Arquivo enviado corretamente, por favor aguarde seu processamento";

      this.totalProcessado++;

      if (
        this.totalProcessado == this.totalGeral ||
        this.totalProcessado == userStatistics.qtdMaxNFePermitidas
      ) {
        this.loadService.setLoading(false);
        this.statusProcessamentoService.ativarWatcher(this.contemArquivoZIP);
        this.msgService.showInfo(
          "Os arquivos foram recebidos com sucesso. Por favor aguarde seu processamento"
        );
      }
    });
  }
}
