import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({ providedIn: "root" })
export class EmitenteService {
  constructor(private http: HttpClient) {
    if (localStorage.getItem("empresaAtiva") == null) {
      localStorage.setItem("empresaAtiva", null);
    }
  }

  public getEmpresaAtiva() {
    return localStorage.getItem("empresaAtiva");
  }

  public setEmpresaAtiva(empresa) {
    localStorage.setItem("empresaAtiva", empresa.value);
  }

  getAll(): Observable<any> {
    return this.http.get(API + "/api/v1/emitente");
  }
}
