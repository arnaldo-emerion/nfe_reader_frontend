import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";
import { AnaliseService } from "../../../analise.service";
@Component({
  templateUrl: "./modal-abc-produto-detalhe.component.html",
  styleUrls: ["./modal-abc-produto-detalhe.component.scss"],
})
export class ModalAbcProdutoDetalheComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private analiseService: AnaliseService,
    public dialogRef: MatDialogRef<ModalAbcProdutoDetalheComponent>
  ) {}

  produtoInfo$;
  produtoNome;

  ngOnInit(): void {
    this.produtoNome = this.data.produtoModel.descricao;

    this.produtoInfo$ = this.analiseService.getCurvaABCProdutosCompleto(
      this.data.produtoModel.codigo
    );
  }

  getDataFormatada(data) {
    return moment(data).format("DD/MM/yyyy");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
