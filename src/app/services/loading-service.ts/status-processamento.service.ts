import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Subject } from "rxjs";
import { UsuarioService } from "./usuario.service";

const API = environment.ApiUrlStatusProcessamento;

@Injectable({ providedIn: "root" })
export class StatusProcessamentoService {
  private watcher;
  private statusInfo$ = new Subject();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  applyDelay = false;
  maxTry = 3;
  currentTry = 0;
  public ativarWatcher(applyDelay) {
    this.applyDelay = applyDelay;
    console.log("Watcher ATIVADO");
    this.watcher = setInterval(() => {
      this.getRegistrosEmProcessamento(
        this.usuarioService.getUserInfo().identityId.split(":")[1]
      ).subscribe(
        (data) => {
          if (data == 0) {
            this.desativarWatcher();
          } else {
            this.statusInfo$.next("Registros em Processamento: " + data);
          }
        },
        (err) => {
          this.desativarWatcher();
        }
      );
    }, 10_000);
  }

  private getRegistrosEmProcessamento(identityId) {
    return this.http.get(API + "?identityId=" + identityId, {});
  }

  public desativarWatcher() {
    if (this.applyDelay && this.currentTry < this.maxTry) {
      console.log("Retrying for ZIP");

      this.currentTry++;
    } else {
      this.currentTry = 0;
      clearInterval(this.watcher);
      console.log("Watcher DESATIVADO");
      this.statusInfo$.next("");
    }
  }

  public getStatusInfoAsObservable() {
    return this.statusInfo$.asObservable();
  }
}
