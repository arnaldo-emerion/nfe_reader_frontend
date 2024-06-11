import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "app/shared/notification/notification.service";
import { DataUtils } from "app/utils/data-utils";
import { Chart } from "chart.js";
import * as moment from "moment";
import { AnaliseService } from "../../analise.service";
import { ModalDetalheCurvaAbcComponent } from "./modal-detalhe-curva-abc/modal-detalhe-curva-abc.component";

@Component({
  selector: "app-curva-abc-cliente",
  templateUrl: "./curva-abc-cliente.component.html",
  styleUrls: ["./curva-abc-cliente.component.scss"],
})
export class CurvaAbcClienteComponent implements OnInit {
  @ViewChild("dataInicial") startDate;
  @ViewChild("dataFinal") endDate;

  legends = [];
  grafico: any;

  showFooter = false;

  constructor(
    private service: AnaliseService,
    public dialog: MatDialog,
    private currencyPipe: CurrencyPipe,
    private messageService: NotificationService
  ) {}

  ngOnInit() {
    this.loadChart();
  }

  allData;

  loadChart() {
    this.service.getCurvaABCClientesValorTotal().subscribe((data: any[]) => {
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

    if (data.length > 20) {
      data = data.slice(0, 20);
    }
    this.actualData = data;

    const labelList = data.map((item) => item.razaoSocial);

    let dataList = [];

    if (this.checkedButton == "valorTotal") {
      dataList = data.map((item) => item.sum);
    } else {
      dataList = data.map((item) => item.count);
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
        nome: item.nome,
        color: dynamicColors,
      });
    });

    const chartData = {
      labels: labelList,
      backgroundColor: "#fff",
      datasets: [
        {
          axis: "y",
          data: dataList,
          backgroundColor: cores,
          borderColor: cores,
          borderWidth: 1,
        },
      ],
    };

    this.grafico = new Chart("exceptionGrowthByMonth", {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",

        onClick: (evt, item) => {
          if (item.length) {
            const current = this.allData[item[0].index];
            this.openDialog(current);
          }
        },

        plugins: {
          title: {
            display: true,
            text:
              "Mostrando os 20 Clientes mais relevantes para a Analise " +
              captionData,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let texto;
                if (this.checkedButton == "valorTotal") {
                  texto = this.currencyPipe.transform(
                    context.raw.toString(),
                    "BRL"
                  );
                } else {
                  texto = context.raw.toString() + " Pedidos";
                }
                return texto;
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  openDialog(clientModel) {
    const dialogRef = this.dialog.open(ModalDetalheCurvaAbcComponent, {
      width: "70%",
      data: {
        clientModel: clientModel,
      },
    });
  }

  dataInicial;
  dataFinal;

  filtrarRegistros(dataInicial, dataFinal) {
    const startDate = DataUtils.dateCompToDateInicial(dataInicial);

    const endDate = DataUtils.dateCompToDateFinal(dataFinal);

    dataInicial = moment(startDate).format("DD/MM/yyyy");
    dataFinal = moment(endDate).format("DD/MM/yyyy");

    if (this.checkedButton == "valorTotal") {
      this.service
        .getCurvaABCClientesValorTotalPorData(startDate, endDate)
        .subscribe((data: any[]) => {
          this.allData = data;
          this.montarGrafico(data, dataInicial, dataFinal);
        });
    } else {
      this.service
        .getCurvaABCClientesQtdPedidosPorData(startDate, endDate)
        .subscribe((data: any[]) => {
          this.allData = data;
          this.montarGrafico(data, dataInicial, dataFinal);
        });
    }
  }

  checkedButton = "valorTotal";
  toggleTipoCurvaABC(item) {
    this.checkedButton = item.value;

    const inicio = DataUtils.dateCompToDateInicial(this.startDate);
    const final = DataUtils.dateCompToDateFinal(this.endDate);

    const dataInicioFormatada = moment(inicio).format("yyyy-MM-DD");
    const dataTerminoFormatada = moment(final).format("yyyy-MM-DD");

    if (this.checkedButton == "valorTotal") {
      this.service
        .getCurvaABCClientesValorTotalPorData(
          dataInicioFormatada,
          dataTerminoFormatada
        )
        .subscribe((data: any[]) => {
          this.allData = data;
          this.montarGrafico(data);
        });
    } else {
      this.service
        .getCurvaABCClientesQtdPedidosPorData(
          dataInicioFormatada,
          dataTerminoFormatada
        )
        .subscribe((data: any[]) => {
          this.allData = data;
          this.montarGrafico(data);
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
}
