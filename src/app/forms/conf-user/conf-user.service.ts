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
    return this.http.get(API + "/configuracao-usuario/tipos-disponiveis");
  }

  getUserConfiguration(): Observable<any> {
    return this.http.get(API + "/configuracao-usuario");
  }

  saveUserConfiguration(userConf): Observable<any> {
    return this.http.post(API + "/configuracao-usuario", userConf);
  }

  deleteAllNFe() {
    return this.http.delete(API + "/configuracao-usuario/nfe/all");
  }

  getEstatisticaUtilizacao() {
    return this.http.get(API + "/configuracao-usuario/estatistica-registros");
  }
}
