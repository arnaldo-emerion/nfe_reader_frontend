import { Component, OnInit } from "@angular/core";
import { MustConfirm } from "app/decorators/must-confirm.decorators";
import { NotificationService } from "app/shared/notification/notification.service";
import { ConfUserService } from "../conf-user.service";

@Component({
  selector: "app-manutencao-registros",
  templateUrl: "./manutencao-registros.component.html",
  styleUrls: ["./manutencao-registros.component.css"],
})
export class ManutencaoRegistrosComponent implements OnInit {
  tipoCadastriList;

  constructor(
    private confUserService: ConfUserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.confUserService.getEstatisticaUtilizacao().subscribe((data:any) => {
      this.tipoCadastriList = [
        {
          labelCadastro: "Notas Fiscais",
          qtd: data.nfeCount,
          labelBotao: "Deletar todas as Notas Fiscais",
          tipoCadastro: "NFE",
        },
        {
          labelCadastro: "Cumpons Fiscais",
          qtd: data.cupomCount,
          labelBotao: "Deletar todos os Cupons Fiscais",
          tipoCadastro: "CFE",
        },
      ];
    });
  }

  @MustConfirm("Deseja realmente excluir todas os Registros?")
  executarAcao(item) {
    switch (item.tipoCadastro) {
      case "NFE":
        {
          this.confUserService.deleteAllNFe().subscribe(() => {
            this.notificationService.showSucess(
              "Todas as notas Ficais foram removidas com sucesso"
            );

            this.tipoCadastriList = [
              {
                labelCadastro: "Notas Fiscais",
                qtd: 0,
                labelBotao: "Deletar todas as Notas Fiscais",
                tipoCadastro: "NFE",
              },
            ];
          });
        }
        break;
      case "CFE":
        {
          this.confUserService.deleteAllCFe().subscribe(() => {
            this.notificationService.showSucess(
              "Todos os Cupons Fiscais foram removidos com sucesso"
            );

            this.tipoCadastriList = [
              {
                labelCadastro: "Cumpons Fiscais",
                qtd: 0,
                labelBotao: "Deletar todas os Cumpons Fiscais",
                tipoCadastro: "CFE",
              },
            ];
          });
        }
        break;
    }
  }
}
