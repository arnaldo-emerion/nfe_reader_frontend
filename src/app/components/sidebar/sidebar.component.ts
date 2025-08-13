import { Component, OnInit } from "@angular/core";
import { EmitenteService } from "app/services/loading-service.ts/emitente-service";
import { UsuarioService } from "app/services/loading-service.ts/usuario.service";
import { Auth } from "aws-amplify";
import { Observable } from "rxjs";

declare const $: any;
declare interface RouteInfo {
  id;
  path: string;
  title: string;
  icon: string;
  class: string;
  subItems: Object;
  descricao: string;
}
export const ROUTES: RouteInfo[] = [
  {
    id: null,
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    subItems: [],
    descricao: "Dashboard. Uma visão simplificada de seus dados",
  },
  {
    id: null,
    path: "/nfe-upload",
    title: "Processar Notas Fiscais",
    icon: "upload_file",
    class: "",
    subItems: [],
    descricao: "Realizar o upload de notas fiscais",
  },
  {
    id: null,
    path: "/nfe",
    title: "Documentos Processados",
    icon: "receipt",
    class: "",
    subItems: [],
    descricao:
      "Aqui estão relacionadas todas os documentos já processados com sucesso",
  },
  {
    id: "curva-abc",
    path: "/analise-qualitativa",
    title: "Analise Qualitativa",
    icon: "leaderboard",
    class: "",
    subItems: [
      {
        path: "/curva-abc-clientes",
        title: "Curva ABC de Cliente",
        icon: "analytics",
        class: "",
        descricao: "Curva ABC de Clientes",
      },
      {
        path: "/curva-abc-produtos",
        title: "Curva ABC de Produtos",
        icon: "analytics",
        class: "",
        descricao: "Curva ABC de Produtos",
      },
      {
        path: "/curva-abc-faturamento",
        title: "Faturamento",
        icon: "analytics",
        class: "",
        descricao: "Faturamento",
      },
    ],
    descricao: "",
  },

  {
    id: "distribuicao-vendas",
    path: "/distribuicao-vendas",
    title: "Distribuição",
    icon: "leaderboard",
    class: "",
    subItems: [
      {
        path: "/distribuicao-vendas/geral",
        title: "Geral",
        icon: "analytics",
        class: "",
        descricao: "Distribuição de vendas. Uma visão geral das NFes",
      },
      {
        path: "/distribuicao-vendas/analitico",
        title: "Gráfico",
        icon: "analytics",
        class: "",
        descricao: "Distribuição de vendas. Uma visão categorizada por estado",
      },
    ],
    descricao: "",
  },
  {
    id: null,
    path: "/analise/evolucao-mensal",
    title: "Evolução Mensal",
    icon: "person",
    class: "",
    subItems: [],
    descricao: "Evolução Mensal de Clientes",
  },
  {
    id: null,
    path: "/destinatario",
    title: "Clientes",
    icon: "person",
    class: "",
    subItems: [],
    descricao: "Lista de Clientes",
  },
  {
    id: null,
    path: "/produto",
    title: "Produtos",
    icon: "production_quantity_limits",
    class: "",
    subItems: [],
    descricao: "Lista de Itens",
  },

  /*{
    id: "items-nfe",
    path: "/items-nfe",
    title: "Itens",
    icon: "production_quantity_limits",
    class: "",
    subItems: [
      {
        path: "/produto",
        title: "Produtos",
        icon: "production_quantity_limits",
        class: "",
        descricao: "Lista de Itens",
      },
      {
        path: "/produto-por-nfe",
        title: "Item Fiscal Check",
        icon: "production_quantity_limits",
        class: "",
        descricao: "Relação de Itens por Nota Fiscal",
      },
    ],
    descricao: "",
  },*/

  {
    id: null,
    path: "/total-imposto",
    title: "Total de Impostos",
    icon: "calculate",
    class: "",
    subItems: [],
    descricao: "Total de Impostos",
  },

  {
    id: null,
    path: "/transportadora",
    title: "Transportadoras",
    icon: "calculate",
    class: "",
    subItems: [],
    descricao: "Lista de Transportadoras",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  emitenteData$: Observable<any>;
  selectedCNPJ = null;
  isUserAdmin = false;

  constructor(
    private emitenteService: EmitenteService,
    private userService: UsuarioService
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.isUserAdmin = this.userService.getUserInfo().isAdmin;
    this.loadData();
  }

  loadData() {
    this.selectedCNPJ = this.emitenteService.getEmpresaAtiva();
    this.emitenteData$ = this.emitenteService.getAll();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  setEmpresaAtiva(empresa) {
    this.emitenteService.setEmpresaAtiva(empresa);
    location.reload();
  }

  logout() {
    Auth.signOut();
  }
}
