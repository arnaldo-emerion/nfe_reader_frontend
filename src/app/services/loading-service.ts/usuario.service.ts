import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInfoModel } from "app/model/user-info.model";
import { Auth } from "aws-amplify";
import { environment } from "environments/environment";
import { Subject } from "rxjs";

const API = environment.ApiUrl;

@Injectable({ providedIn: "root" })
export class UsuarioService {
  private userInfo: UserInfoModel;
  private userStatictics;
  private userInfo$ = new Subject<any>();
  private userStatictics$ = new Subject<any>();

  constructor(private http: HttpClient) {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userStatictics = JSON.parse(localStorage.getItem("userStatictics"));
  }

  public setUserInfo(userInfo: UserInfoModel) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    this.userInfo = userInfo;
    this.userInfo$.next(userInfo);
  }

  public getUserInfo(): UserInfoModel {
    return this.userInfo;
  }

  public getUserInfoAsObservable() {
    return this.userInfo$.asObservable();
  }

  public setUserStatistics(userStatictics) {
    localStorage.setItem("userStatictics", JSON.stringify(userStatictics));
    this.userStatictics = userStatictics;
    this.userStatictics$.next(userStatictics);
  }

  public getUserStatistics() {
    return this.userStatictics;
  }

  public getUserStatisticsAsObservable() {
    return this.userStatictics$.asObservable();
  }

  public loadUserInfoFromSession() {
    Auth.currentSession().then((session) => {
      const payload = session.getIdToken().payload;
      Auth.currentCredentials().then((auth) => {
        const userInfo = {
          cognitoUserName: payload["cognito:username"],
          email: payload.email,
          companyName: payload["custom:company"],
          grupos: payload["cognito:groups"],
          cnpj: payload["custom:cnpj"],
          isAdmin:
            payload["cognito:groups"] &&
            payload["cognito:groups"].includes("ADMIN"),
          idToken: session.getIdToken().getJwtToken(),
          identityId: auth.identityId,
          usuarioNome: payload["custom:userNome"],
          razaoSocial: payload["custom:razaoSocial"],
        };

        this.setUserInfo(userInfo);
        this.loadUserStatistics();
      });
    });
  }

  public loadUserStatistics() {
    this.http.get(API + "/user-statistic").subscribe((data) => {
      this.setUserStatistics(data);
    });
  }

  public unloadUserInfoFromSession() {
    this.setUserInfo(null);
    this.setUserStatistics(null);
  }
}
