import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class ConfUserService {
  constructor(private http: HttpClient) {}

  getTipoNFeDisponiveisList(): Observable<any> {
    return this.http.get(API + "/api/v1/configuracao-usuario/tipos-disponiveis");
  }

  getUserConfiguration(): Observable<any> {
    return this.http.get(API + "/api/v1/configuracao-usuario");
  }

  saveUserConfiguration(userConf): Observable<any> {
    return this.http.post(API + "/api/v1/configuracao-usuario", userConf);
  }

  deleteAllNFe() {
    return this.http.delete(API + "/api/v1/nfe/nfe");
  }

  deleteAllCFe() {
    return this.http.delete(API + "/configuracao-usuario/cfe/all");
  }

  getEstatisticaUtilizacao() {
    return this.http.get(API + "/api/v1/configuracao-usuario/estatistica-registros");
  }
}
