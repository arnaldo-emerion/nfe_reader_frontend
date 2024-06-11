import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  getCabecalho(): Observable<any> {
    return this.http.get(API + "/api/v1/produtos/cabecalho");
  }

  getProdutosByNFeByNfeListAndProdList(
    codProdList: any[],
    nnfList: any[]
  ): Observable<any> {
    return this.http.get(
      API + `/produto/per-nfe-02?codProdList=${codProdList}&nnfList=${nnfList}`
    );
  }

  getProdutoPerNFe(): Observable<any> {
    return this.http.get(API + "/produto/per-nfe");
  }

  buscaPaginada(pageSize: number, page: number): Observable<any> {
    return this.http.get(
      API + `/produto/per-nfe?size=${pageSize}&page=${page + 1}`
    );
  }

  getByCodigo(codigo): Observable<any> {
    return this.http.get(API + "/api/v1/produtos/codigo/" + codigo);
  }
}
