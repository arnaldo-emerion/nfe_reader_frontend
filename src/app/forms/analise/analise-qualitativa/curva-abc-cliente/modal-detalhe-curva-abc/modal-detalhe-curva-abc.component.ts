import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";
import { AnaliseService } from "../../../analise.service";
@Component({
  selector: "app-modal-detalhe-curva-abc",
  templateUrl: "./modal-detalhe-curva-abc.component.html",
  styleUrls: ["./modal-detalhe-curva-abc.component.scss"],
})
export class ModalDetalheCurvaAbcComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private analiseService: AnaliseService,
    public dialogRef: MatDialogRef<ModalDetalheCurvaAbcComponent>
  ) {}

  clienteInfo$;

  ngOnInit(): void {
    this.clienteInfo$ = this.analiseService.getCurvaABCClientesDetalhe(
      this.data.clientModel.cnpj
    );
  }

  getDataFormatada(data) {
    return moment(data).format("DD/MM/yyyy");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
