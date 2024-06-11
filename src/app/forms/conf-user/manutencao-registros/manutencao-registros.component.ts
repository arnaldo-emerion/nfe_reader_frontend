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
    this.confUserService.getEstatisticaUtilizacao().subscribe((data) => {
      this.tipoCadastriList = [
        {
          labelCadastro: "Notas Fiscais",
          qtd: data,
          labelBotao: "Deletar todas as Notas Fiscais",
          tipoCadastro: "NFE",
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
    }
  }
}
