import { Component, OnInit } from '@angular/core';
import { ESTADOS_ARRAY } from 'app/arrays/estados.arrays';
import { NFeService } from 'app/forms/nfe/nfe.service';
import { Chart } from 'chart.js';

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

  loadData() {
    this.service.getMonthlyEvolution()
      .subscribe((data: any[]) => {
        console.log(data)
        let labels = data[0].items.map((item) => item.yearMonth)

        let chartData = data.map((ufData) => ({
          label: ufData.uf,
          backgroundColor:  this.getRandomColor(),
          data: ufData.items.map((item) => item.total)
        }));
        this.montarGrafico(labels, chartData)
      })
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

  montarGrafico(labels:any[], dataset) {
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
