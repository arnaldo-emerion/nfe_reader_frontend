import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { AnaliseService } from "../../analise.service";

@Component({
  selector: "app-curva-abc-faturamento",
  templateUrl: "./curva-abc-faturamento.component.html",
  styleUrls: ["./curva-abc-faturamento.component.scss"],
})
export class CurvaAbcFaturamentoComponent implements OnInit {
  legends = [];
  grafico: any;

  showFooter = false;

  constructor(private service: AnaliseService) {}

  ngOnInit() {
    this.service.getCurvaABCFaturamentoAnual().subscribe((data: any[]) => {
      this.loadChart(data);
    });
  }

  loadChart(data) {
    if (this.grafico) {
      this.grafico.destroy();
    }
    const exceptionGrowthByMonth = document.getElementById(
      "curva-abc-faturamento"
    );

    const cores = [];
    this.legends = [];
    let labelList;

    if (this.checkedButton == "anual") {
      labelList = data.map((item) => item.label.substring(0, 4));
    } else {
      labelList = data.map((item) => item.label);
    }

    const dataList = data.map((item) => item.total);

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
          data: dataList,
          backgroundColor: cores,
          borderColor: cores,
          borderWidth: 1,
        },
      ],
    };

    this.grafico = new Chart("curva-abc-faturamento", {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",
        plugins: {
          title: {
            display: true,
            text: "Mostrando curva de faturmanto ao longo dos meses para as notas processadas",
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  checkedButton = "anual";
  toggleTipoGrafico(item) {
    this.checkedButton = item.value;
    if (item.value == "anual") {
      this.service
        .getCurvaABCFaturamentoAnual()
        .subscribe((data) => this.loadChart(data));
    } else {
      this.service
        .getCurvaABCFaturamentoMensal()
        .subscribe((data) => this.loadChart(data));
    }
  }
}
