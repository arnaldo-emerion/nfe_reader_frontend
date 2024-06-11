import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "aws-amplify";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class UploadFilesService {
  constructor(private http: HttpClient) {}

  uploadToAwsS3Bucket(fileName: string, file: any) {
    return Storage.put(fileName, file, {
      level: "private",
      contentType: "text/plain",
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${API}/files`);
  }

  getArquivosProcessados(): Observable<any> {
    return this.http.get(`${API}/nfe/processados`);
  }
}
