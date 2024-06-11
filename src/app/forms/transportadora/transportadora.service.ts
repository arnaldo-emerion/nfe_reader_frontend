import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class TransportadoraService {
  constructor(private http: HttpClient) {}

  getCabecalho(): Observable<any> {
    return this.http.get(API + "/api/v1/transportadora/cabecalho");
  }
}
