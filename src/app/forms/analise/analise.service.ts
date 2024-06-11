import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class AnaliseService {
  constructor(private http: HttpClient) {}

  getCurvaABCClientesValorTotal(): Observable<any> {
    return this.http.get(API + "/api/v1/analise-clientes/valor-total");
  }

  getCurvaABCClientesValorTotalPorData(startDate, endDate): Observable<any> {
    return this.http.get(
      API + "/api/v1/analise-clientes/valor-total?startDate=" + startDate + "&endDate=" + endDate
    );
  }

  getCurvaABCClientesQtdPedidos(): Observable<any> {
    return this.http.get(API + "/api/v1/analise-clientes/qtd-pedidos");
  }

  getCurvaABCClientesQtdPedidosPorData(startDate, endDate): Observable<any> {
    return this.http.get(
      API + "/api/v1/analise-clientes/qtd-pedidos?startDate=" + startDate + "&endDate=" + endDate
    );
  }

  getCurvaABCClientesDetalhe(cnpj): Observable<any> {
    return this.http.get(API + "/api/v1/analise-clientes/detalhes/" + cnpj);
  }

  getCurvaABCProdutosCompleto(codigo): Observable<any> {
    return this.http.get(API + "/api/v1/analise-produtos/curva-abc/" + codigo);
  }

  getCurvaABCProdutosPorCriterio(criterio): Observable<any> {
    return this.http.get(API + "/api/v1/analise-produtos/estatistica-" + criterio);
  }

  getCurvaABCFaturamentoMensal(): Observable<any> {
    return this.http.get(API + "/api/v1/curva-abc/faturamento-mensal");
  }

  getCurvaABCFaturamentoAnual(): Observable<any> {
    return this.http.get(API + "/api/v1/curva-abc/faturamento-anual");
  }

  getCurvaABCFaturamentoPorEstadoValorTotal(
    datainicial?,
    dataFinal?
  ): Observable<any> {
    let filtro =
      datainicial != null && dataFinal != null
        ? "?startDate=" + datainicial + "&endDate=" + dataFinal
        : "";
    return this.http.get(
      API + "/api/v1/curva-abc/faturamento/estado/valor-total" + filtro
    );
  }

  getCurvaABCFaturamentoPorEstadoFrequencia(
    datainicial?,
    dataFinal?
  ): Observable<any> {
    let filtro =
      datainicial != null && dataFinal != null
        ? "?startDate=" + datainicial + "&endDate=" + dataFinal
        : "";
    return this.http.get(
      API + "/api/v1/curva-abc/faturamento/estado/frequencia" + filtro
    );
  }

  getCurvaABCFaturamentoPorEstadoPorData(startDate, endDate): Observable<any> {
    return this.http.get(
      API + "/curva-abc/faturamento/estado/" + startDate + "/" + endDate
    );
  }
}
