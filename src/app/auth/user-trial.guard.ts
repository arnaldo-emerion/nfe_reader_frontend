import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { NotificationService } from "app/shared/notification/notification.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserTrialGuard {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private msgService: NotificationService
  ) {}

  canActivate({
    route,
    state,
  }: {
    route: ActivatedRouteSnapshot;
    state: RouterStateSnapshot;
  }): boolean | Observable<boolean> | Promise<boolean> {
    const userInfo = this.usuarioService.getUserInfo();
    const userStatistics = this.usuarioService.getUserStatistics();

    return new Promise((resolve) => {
      if (!userInfo.isAdmin) {
        if (
          userStatistics.qtdNFeProcessadas > userStatistics.qtdMaxNFePermitidas
        ) {
          this.msgService.showError(
            "Usuário ultrapassou o limite de envios de NFe: " +
              userStatistics.qtdNFeProcessadas
          );

          setTimeout(() => {
            this.router.navigate(["dashboard"]);
            resolve(false);
          }, 1000);
        } else {
          resolve(true);
        }
      } else {
        resolve(true);
      }
    });
  }
}
