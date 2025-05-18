import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, Storage } from "aws-amplify";

@Injectable({ providedIn: "root" })
export class UsuarioCadastroService {
  constructor(private http: HttpClient) {}

  getCNPJInfo(cnpj) {
    return this.http.jsonp(
      "https://receitaws.com.br/v1/cnpj/" + cnpj,
      "callback"
    );
  }

  uploadProfilePicture(fileName: string, file: any) {
    return Storage.put(fileName, file, {
      level: "protected",
      contentType: "image/png",
    });
  }

  async download(fileKey) {
    const result = await Storage.get(fileKey, {
      level: "protected",
      download: true,
    });

    return result;
  }

  public getUserInfoFromSession() {
    return new Promise((resolve) => {
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
            razaoSocial: payload["custom:razaoSocial"],
            nomeFantasia: payload["custom:nomeFantasia"],
            endereco: payload["custom:endereco"],
            bairro: payload["custom:bairro"],
            municipio: payload["custom:municipio"],
            uf: payload["custom:uf"],
            cep: payload["custom:cep"],
            descricao: payload["custom:descricaoEmpresa"],
            usuarioNome: payload["custom:userNome"],
            usuarioCargoFuncao: payload["custom:userCargoFuncao"],
            usuarioDescricao: payload["custom:userDescricao"],
          };

          resolve(userInfo);
        });
      });
    });
  }
}
