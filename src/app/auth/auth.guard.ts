import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { CognitoUser } from "@aws-amplify/auth";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { NotificationService } from "app/shared/notification/notification.service";
import { Auth } from "aws-amplify";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private msgService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        Auth.currentSession()
          .then((currentSesion) => {
            const refresh_token = currentSesion.getRefreshToken();
            user.refreshSession(refresh_token, (refErr, refSession) => {
              if (refErr) {
                Auth.signOut();
              }
            });
          })
          .catch((ex) => {
            Auth.signOut();
          });
      })
      .catch((ex) => {
        Auth.signOut();
      });

    if (state.url != "/user") {
      if (
        this.usuarioService.getUserInfo() &&
        !!!this.usuarioService.getUserInfo().cnpj
      ) {
        this.msgService.showInfo(
          "Por favor preencha o CNPJ da empresa antes de prosseguir"
        );
        this.router.navigate(["user"]);
      }
    }

    return new Promise<boolean>((resolve) => {
      Auth.currentSession().then(
        (currentSesion) => {
          if (this.usuarioService.getUserInfo() != null) {
            this.usuarioService.getUserInfo().idToken = currentSesion
              .getIdToken()
              .getJwtToken();
          }
          resolve(currentSesion.isValid());
        },
        (err) => {
          Auth.signOut();
        }
      );
    });
  }
}
