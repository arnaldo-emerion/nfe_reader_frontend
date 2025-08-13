import { Component, OnInit } from '@angular/core';
import { ESTADOS_ARRAY } from 'app/arrays/estados.arrays';
import { NFeService } from 'app/forms/nfe/nfe.service';
import { DataUtils } from 'app/utils/data-utils';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-evolucao-mensal',
  templateUrl: './evolucao-mensal.component.html',
  styleUrls: ['./evolucao-mensal.component.css']
})
export class EvolucaoMensalComponent implements OnInit {
  showHeader = true;
  grafico: any;

  constructor(private service: NFeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(startDate?, endDate?) {
    this.service.getMonthlyEvolution()
      .subscribe((data: any[]) => {
        this.loadChart(data);
      })
  }

  filtrarRegistros(dataInicial, dataFinal) {
    const startDate = DataUtils.dateCompToDateInicial(dataInicial);

    const endDate = DataUtils.dateCompToDateFinal(dataFinal);

    dataInicial = moment(startDate).format("yyyy-MM-DD");
    dataFinal = moment(endDate).format("yyyy-MM-DD");

    this.service.getMonthlyEvolutionPorData(dataInicial, dataFinal)
      .subscribe((data: any[]) => {
        this.loadChart(data);
      })
  }

  loadChart(data: any) {
    let labels = data[0].items.map((item) => item.yearMonth)

    let chartData = data.map((ufData, index) => ({
      label: ufData.uf,
      backgroundColor: this.getRandomColor(),
      data: ufData.items.map((item) => item.total),
      hidden: index >= 4
    }));
    this.montarGrafico(labels, chartData)
  }

  getRandomColor() {
    return "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      ")";
  }

  montarGrafico(labels: any[], dataset) {
    if (this.grafico) {
      this.grafico.destroy();
    }

    var chartData = {
      labels: labels,
      datasets: dataset
    };

    this.grafico = new Chart("exceptionGrowthByMonth", {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: "right",
          },
        },
        elements: {
          arc: {},
        },
      },
    });
  }
}
