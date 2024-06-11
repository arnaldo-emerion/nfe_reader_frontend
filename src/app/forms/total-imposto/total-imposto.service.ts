import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class TotaisImpostosService {
  constructor(private http: HttpClient) {}

  getTotaisImpostos(): Observable<any> {
    return this.http.get(API + "/api/v1/total-imposto");
  }

  getTotaisImpostosByDate(dataInicial, dataFinal): Observable<any> {
    return this.http.get(
      API + "/api/v1/total-imposto?startDate=" + dataInicial + "&endDate=" + dataFinal
    );
  }
}
