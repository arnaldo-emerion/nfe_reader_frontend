import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class NFeService {
  constructor(private http: HttpClient) {}

  getById(identificador): Observable<any> {
    return this.http.get(API + "/nfe/" + identificador);
  }

  getCabecalho(): Observable<any> {
    return this.http.get(API + "/documento-fiscal/cabecalho");
  }

  getCabecalhoFiltrado(dataInicial, dataFinal, estado): Observable<any> {
    return this.http.get(
      API + "/nfe/cabecalho/" + dataInicial + "/" + dataFinal + "/" + estado
    );
  }

  getByCnpj(cnpj): Observable<any> {
    return this.http.get(API + "/api/v1/nfe/cpf-cnpj/" + cnpj);
  }

  getByCodProd(cProd): Observable<any> {
    return this.http.get(API + "/api/v1/nfe/cprod/" + cProd);
  }
}
