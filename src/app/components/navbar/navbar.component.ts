import { Location } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ConfUserService } from "app/forms/conf-user/conf-user.service";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { Auth } from "aws-amplify";
import { ROUTES } from "../sidebar/sidebar.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  title;
  activeProfile;

  userInfo;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private usuarioService: UsuarioService,
    private confUserService: ConfUserService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const subitems = ROUTES.filter((item) => item.subItems).map(
      (i) => i.subItems
    );
    subitems.forEach((i: any) => {
      this.listTitles.push(...i);
    });
    this.title = this.getTitle();

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
      if (event instanceof NavigationEnd) {
        this.title = this.getTitle();
      }
    });

    this.userInfo = this.usuarioService.getUserInfo();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    this.loadActiveProfile();
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].descricao;
      }
    }
    return "";
  }

  loadActiveProfile() {
    this.confUserService.getUserConfiguration().subscribe((config) => {
      const activeConf = config.parametroNatOperacaoList.filter(
        (d) => d.active
      );
      if (activeConf && activeConf.length > 0) {
        this.activeProfile = "Perfil Ativo: " + activeConf[0].name;
      }
    });
  }

  goto(route) {
    this.router.navigate([route]);
  }

  signOut() {
    Auth.signOut();
  }
}
