import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { UserTrialGuard } from "./auth/user-trial.guard";
import { CurvaAbcClienteComponent } from "./forms/analise/analise-qualitativa/curva-abc-cliente/curva-abc-cliente.component";
import { CurvaAbcFaturamentoComponent } from "./forms/analise/analise-qualitativa/curva-abc-faturamento/curva-abc-faturamento.component";
import { CurvaAbcProdutoComponent } from "./forms/analise/analise-qualitativa/curva-abc-produto/curva-abc-produto.component";
import { DistVendasAnaliticoComponent } from "./forms/analise/dist-vendas/dist-vendas-analitico/dist-vendas-analitico.component";
import { DistVendasComponent } from "./forms/analise/dist-vendas/dist-vendas.component";
import { DestFormComponent } from "./forms/dest/dest-form/dest-form.component";
import { DestListComponent } from "./forms/dest/dest-list/dest-list.component";
import { NfeListagemComponent } from "./forms/nfe/nfe-listagem/nfe-listagem.component";
import { NfeUploadComponent } from "./forms/nfe/nfe-upload/nfe-upload.component";
import { NfeVisualizacaoComponent } from "./forms/nfe/nfe-visualizacao/nfe-visualizacao.component";
import { ProdFormComponent } from "./forms/produtos/prod-form/prod-form.component";
import { ProdListComponent } from "./forms/produtos/prod-list/prod-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ConfUserComponent } from "./forms/conf-user/conf-user.component";
import { ConfiguracaoComponent } from "./forms/configuracao/configuracao.component";
import { RelatorioErroComponent } from "./forms/relatorio-erro/relatorio-erro.component";
import { TotalImpostoComponent } from "./forms/total-imposto/total-imposto.component";
import { UsuarioComponent } from "./forms/usuario/usuario.component";
import { TranspListComponent } from "./forms/transportadora/transp-list/transp-list.component";
import { ProdPerNfeComponent } from "./forms/produtos/prod-per-nfe/prod-per-nfe.component";
import { EvolucaoMensalComponent } from "./forms/analise/evolucao-mensal/evolucao-mensal.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "curva-abc-clientes",
    component: CurvaAbcClienteComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "curva-abc-produtos",
    component: CurvaAbcProdutoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "curva-abc-faturamento",
    component: CurvaAbcFaturamentoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "distribuicao-vendas/geral",
    component: DistVendasComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "distribuicao-vendas/analitico",
    component: DistVendasAnaliticoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "destinatario",
    component: DestListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "destinatario/:identificador",
    component: DestFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "produto",
    component: ProdListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "produto/:codigoProduto",
    component: ProdFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "produto-por-nfe",
    component: ProdPerNfeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "nfe",
    component: NfeListagemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nfe/:identificador",
    component: NfeVisualizacaoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "nfe-upload",
    component: NfeUploadComponent,
    canActivate: [AuthGuard, UserTrialGuard],
  },

  {
    path: "configuracao",
    component: ConfiguracaoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "user",
    component: UsuarioComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "total-imposto",
    component: TotalImpostoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "conf-usuario",
    component: ConfUserComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "relatorio-erro",
    component: RelatorioErroComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "transportadora",
    component: TranspListComponent,
    canActivate: [AuthGuard],
  },

    {
    path: "analise/evolucao-mensal",
    component: EvolucaoMensalComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "**",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [],
})
export class AppRoutingModule {}
