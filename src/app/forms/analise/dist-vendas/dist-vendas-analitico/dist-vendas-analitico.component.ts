import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "app/shared/notification/notification.service";
import { DataUtils } from "app/utils/data-utils";
import { Chart } from "chart.js";
import * as moment from "moment";
import { AnaliseService } from "../../analise.service";

@Component({
  selector: "app-dist-vendas-analitico",
  templateUrl: "./dist-vendas-analitico.component.html",
  styleUrls: ["./dist-vendas-analitico.component.scss"],
})
export class DistVendasAnaliticoComponent implements OnInit {
  legends = [];
  grafico: any;
  graficoLinha: any;

  @ViewChild("dataInicial") startDate;
  @ViewChild("dataFinal") endDate;

  showFooter = false;
  showHeader = true;

  constructor(
    private service: AnaliseService,
    public dialog: MatDialog,
    private currencyPipe: CurrencyPipe,
    private messageService: NotificationService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.loadChart();
  }

  allData;

  loadChart() {
    this.service
      .getCurvaABCFaturamentoPorEstadoValorTotal()
      .subscribe((data: any[]) => {
        this.allData = data;
        this.montarGrafico(data);
      });
  }

  actualData;
  montarGrafico(data, dataInicio?, dataFim?) {
    if (this.grafico) {
      this.grafico.destroy();
    }

    const captionData = !dataInicio
      ? " (Período Completo)"
      : " ( " + dataInicio + " - " + dataFim + ")";

    const cores = [];
    this.legends = [];

    const totalSum = data.reduce((acc, val) => (acc += val.total), 0);

    data.forEach((item) => {
      item.percentual = (item.total / totalSum) * 100;
    });

    this.actualData = data;

    const labelList = data.map((item) => item.label);

    let dataList = [];

    dataList = data.map((item) => item.total);

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
        nome: item.nome,
        color: dynamicColors,
      });
    });

    const chartData = {
      labels: labelList,
      datasets: [
        {
          data: dataList,
          backgroundColor: cores,
          borderColor: cores,
          hoverOffset: 4,
        },
      ],
    };

    this.grafico = new Chart("exceptionGrowthByMonth", {
      type: "pie",
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let texto;
                const item = this.actualData[context.dataIndex];
                if (this.checkedButton == "valorTotal") {
                  texto =
                    context.label +
                    " => " +
                    this.currencyPipe.transform(context.raw.toString(), "BRL") +
                    " (" +
                    this.decimalPipe.transform(item.percentual, "1.2-2") +
                    " %)";
                } else {
                  texto =
                    context.label +
                    " => " +
                    context.raw.toString() +
                    " Pedidos" +
                    " (" +
                    this.decimalPipe.transform(item.percentual, "1.2-2") +
                    " %)";
                }
                return texto;
              },
            },
          },
        },
        elements: {
          arc: {},
        },
      },
    });

    this.reloadChart();
  }

  openDialog(clientModel) {}

  dataInicial;
  dataFinal;

  filtrarRegistros(dataInicial, dataFinal) {
    const startDate = DataUtils.dateCompToDateInicial(dataInicial);
    const endDate = DataUtils.dateCompToDateFinal(dataFinal);

    dataInicial = moment(startDate).format("DD/MM/yyyy");
    dataFinal = moment(endDate).format("DD/MM/yyyy");

    this.getDataByDate(startDate, endDate);
  }

  checkedButton = "valorTotal";
  toggleTipoCurvaABC(item) {
    this.checkedButton = item.value;

    const inicio = DataUtils.dateCompToDateInicial(this.startDate);
    const final = DataUtils.dateCompToDateFinal(this.endDate);

    const dataInicioFormatada = moment(inicio).format("yyyy-MM-DD");
    const dataTerminoFormatada = moment(final).format("yyyy-MM-DD");

    this.getDataByDate(dataInicioFormatada, dataTerminoFormatada);
  }

  private getDataByDate(dataInicio, dataTermino) {
    if (this.checkedButton == "valorTotal") {
      this.service
        .getCurvaABCFaturamentoPorEstadoValorTotal(dataInicio, dataTermino)
        .subscribe((data: any[]) => {
          this.allData = data;
          this.montarGrafico(data, this.dataInicial, this.dataFinal);
        });
    } else {
      this.service
        .getCurvaABCFaturamentoPorEstadoFrequencia(dataInicio, dataTermino)
        .subscribe((data: any[]) => {
          this.allData = data;
          this.montarGrafico(data, this.dataInicial, this.dataFinal);
        });
    }
  }

  limparSelecao(dataInicial, dataFinal) {
    dataInicial.datepickerInput._datepicker.select();
    dataFinal.datepickerInput._datepicker.select();
    dataInicial = null;
    dataFinal = null;
    this.loadChart();
  }

  toggleText = 'Desmarcar Todos';
  reloadChart() {
    const chart = this.grafico;

    // Override legend after chart exists
    chart.options.plugins.legend.labels.generateLabels = (chartInstance: any) => {
      const original = Chart.overrides.pie.plugins.legend.labels.generateLabels(chartInstance);
      return [
        {
          text: this.toggleText,
          fillStyle: '#888',
          strokeStyle: '#888',
          hidden: false,
          index: -1
        },
        ...original
      ];
    };
debugger;
    chart.options.plugins.legend.onClick = (e: any, legendItem: any, legend: any) => {
      if (legendItem.index === -1) {
        const allVisible = chart.getDatasetMeta(0).data.every((arc: any) => !arc.hidden);
        chart.getDatasetMeta(0).data.forEach((arc: any) => {
          arc.hidden = allVisible;
        });
        this.toggleText = allVisible ? 'Marcar Todos' : 'Desmarcar Todos';
        chart.update();
      } else {
        const arc = chart.getDatasetMeta(0).data[legendItem.index];
        arc.hidden = !arc.hidden;
        chart.update();
      }
    };

    chart.update();
  }

}
