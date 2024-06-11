import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get(API + "/dashboard");
  }

  getCurvaABCFaturamentoDiario(): Observable<any> {
    return this.http.get(API + "/curva-abc/faturamento/diario");
  }

  getQtdProdutosDiaADia(): Observable<any> {
    return this.http.get(API + "/api/v1/analise-produtos/dia-a-dia");
  }

  getQtdPedidoDiaADia(): Observable<any> {
    return this.http.get(API + "/api/v1/curva-abc/pedido/dia-a-dia");
  }
}
