import { Location, PopStateEvent } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Hub } from "aws-amplify";
import { Subscription } from "rxjs";
import "rxjs/add/operator/filter";
import { LoadingService } from "./services/loading-service.ts/loading-service";
import { StatusProcessamentoService } from "./services/loading-service.ts/status-processamento.service";
import { UsuarioService } from "./services/loading-service.ts/usuario.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    public loadingService: LoadingService,
    public location: Location,
    private router: Router,
    private userService: UsuarioService,
    private statusProcessamentoService: StatusProcessamentoService
  ) {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "signIn") {
        userService.loadUserInfoFromSession();
        router.navigate(["dashboard"]);
      } else if (event == "signOut") {
        userService.unloadUserInfoFromSession();
      }
    });
  }

  processingMsg;
  ngOnInit(): void {
    this.statusProcessamentoService
      .getStatusInfoAsObservable()
      .subscribe((data) => {
        this.processingMsg = data;
      });

    this.statusProcessamentoService.ativarWatcher(false);

    setTimeout(() => {
      if (this.userService.getUserInfo()) {
        this.userService.loadUserStatistics();
      }
    }, 1000);

    const isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (
      isWindows &&
      !document
        .getElementsByTagName("body")[0]
        .classList.contains("sidebar-mini")
    ) {
      // if we are on windows OS we activate the perfectScrollbar function

      document
        .getElementsByTagName("body")[0]
        .classList.add("perfect-scrollbar-on");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("perfect-scrollbar-off");
    }

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
  }

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
}
