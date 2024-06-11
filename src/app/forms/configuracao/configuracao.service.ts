import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class ConfiguracaoGeralService {
  constructor(private http: HttpClient) {}

  getConfiguracao(): Observable<any> {
    return this.http.get(API + "/api/v1/configuracao-geral");
  }

  saveConfiguracao(conf): Observable<any> {
    return this.http.post(API + "/configuracao-geral", conf);
  }
}
