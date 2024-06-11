import { CurrencyPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Chart } from "chart.js";
import { AnaliseService } from "../../analise.service";
import { ModalAbcProdutoDetalheComponent } from "./modal-abc-produto-detalhe/modal-abc-produto-detalhe.component";

@Component({
  selector: "app-curva-abc-produto",
  templateUrl: "./curva-abc-produto.component.html",
  styleUrls: ["./curva-abc-produto.component.scss"],
})
export class CurvaAbcProdutoComponent implements OnInit {
  legends = [];
  grafico: any;
  allData;

  showFooter = false;

  checkedButton = "faturamento";

  constructor(
    private service: AnaliseService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    this.service
      .getCurvaABCProdutosPorCriterio(this.checkedButton)
      .subscribe((data: any[]) => {
        this.allData = data;
        this.montarGrafico(data);
      });
  }

  openDialog(produtoModel) {
    const dialogRef = this.dialog.open(ModalAbcProdutoDetalheComponent, {
      width: "70%",
      data: {
        produtoModel: produtoModel,
      },
    });
  }

  currentData;
  montarGrafico(data) {
    if (this.grafico) {
      this.grafico.destroy();
    }

    const cores = [];
    this.legends = [];

    this.currentData = data;

    const labelList = data.map((item) => item.descricao);

    let dataList = [];

    if (this.checkedButton == "faturamento") {
      dataList = data.map((item) => item.faturamento);
    } else if (this.checkedButton == "frequencia") {
      dataList = data.map((item) => item.frequencia);
    } else if (this.checkedButton == "volume") {
      dataList = data.map((item) => item.volume);
    }

    data.forEach((item) => {
      const dynamicColors =
        "rgb(" +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        ")";
      cores.push(dynamicColors);

      this.legends.push({
        nome: item.descricao,
        color: dynamicColors,
      });
    });

    const chartData = {
      labels: labelList,
      backgroundColor: "#fff",
      datasets: [
        {
          data: dataList,
          backgroundColor: cores,
          borderColor: cores,
          borderWidth: 1,
        },
      ],
    };

    this.grafico = new Chart("curva-abc-produto", {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",

        onClick: (evt, item) => {
          if (item.length) {
            const produtoModel = this.currentData[item[0].index];
            this.openDialog(produtoModel);
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Mostrando os 20 Produtos mais relevantes para a Analise",
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let texto;
                if (this.checkedButton == "faturamento") {
                  texto = this.currencyPipe.transform(
                    context.raw.toString(),
                    "BRL"
                  );
                } else if (this.checkedButton == "frequencia") {
                  texto = context.raw.toString() + " Pedidos";
                } else if (this.checkedButton == "volume") {
                  texto = context.raw.toString() + "  PCs";
                }
                return texto;
              },
            },
          },
        },
      },
    });
  }

  toggleTipoCurvaABC(item) {
    this.checkedButton = item.value;
    this.loadChart();
  }
}
