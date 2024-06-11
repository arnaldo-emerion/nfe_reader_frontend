import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ConfUserModule } from "./conf-user/conf-user.module";
import { ConfiguracaoModule } from "./configuracao/configuracao.module";
import { RelatorioErroModule } from "./relatorio-erro/relatorio-erro.module";
import { TotalImpostoModule } from "./total-imposto/total-imposto.module";
import { UsuarioModule } from "./usuario/usuario.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfiguracaoModule,
    UsuarioModule,
    TotalImpostoModule,
    ConfUserModule,
    RelatorioErroModule,
    HttpClientJsonpModule,
  ],
})
export class FormulariosModule {}
