import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { StatusProcessamentoService } from "app/services/loading-service.ts/status-processamento.service";
import { Chart } from "chart.js";
import * as Chartist from "chartist";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as moment from "moment";
import { Observable, Subscription } from "rxjs";
import { AnaliseService } from "../forms/analise/analise.service";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardInfo$ = new Observable();
  graficoLinha;
  @ViewChild("allStuff") content: ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private service: AnaliseService,
    private router: Router,
    private statusProcessamentoService: StatusProcessamentoService
  ) {}

  watcherSub: Subscription;

  savePdf(id) {
    let data = document.getElementById(id);
    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png", 1.0); // 'image/jpeg' for lower quality output.
      let pdf = new jsPDF("l", "px", "a4"); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.internal.scaleFactor = 1.7;
      pdf.addImage(contentDataURL, "PNG", 5, 5, 615, 0);
      pdf.save("Filename.pdf");
    });
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }

  async ngOnInit() {
    this.loadData();
    //this.loadChart();
    //this.loadCompleteTaskChart();
    //this.loadEmailChart();
    this.dashboardService
      .getCurvaABCFaturamentoDiario()
      .subscribe((data) => this.montarGraficoLinha(data));

    this.dashboardService.getQtdProdutosDiaADia().subscribe((data) => {
      this.montarGraficoDiaADia(data, "graficoProdutoDiaADia");
    });

    this.dashboardService.getQtdPedidoDiaADia().subscribe((data) => {
      this.montarGraficoDiaADia(data, "graficoPedidoDiaADia");
    });

    this.watcherSub = this.statusProcessamentoService
      .getStatusInfoAsObservable()
      .subscribe(() => {
        this.loadData();
      });
  }

  private loadData() {
    this.dashboardInfo$ = this.dashboardService.getDashboard();
  }

  loadCompleteTaskChart() {
    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var completedTasksChart = new Chartist.Line(
      "#completedTasksChart",
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }

  loadEmailChart() {
    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#websiteViewsChart",
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

  legends;
  loadChart() {
    this.service.getCurvaABCFaturamentoMensal().subscribe((data: any[]) => {
      if (data.length == 0) {
        return;
      }
      this.montarGrafico(data);
    });
  }

  montarGrafico(data) {
    const cores = [];
    this.legends = [];

    data.sort((a, b) => a.sum < b.count);

    if (data.length > 2) {
      data = data.slice(0, 20);
    }

    const labelList = data.map((item) => item.nome.substring(5, 7));

    let dataList = [];

    dataList = data.map((item) => item.count);

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: labelList,
      series: [dataList],
    };
    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: dataList[0] + 1,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);
  }

  dataFaturamentoPorDiaLinha;

  montarGraficoLinha(data) {
    if (this.graficoLinha) {
      this.graficoLinha.destroy();
    }
    const labelList = data.map((item) =>
      moment(item.dataEmissao).format("DD/MM/yyyy")
    );
    let dataList = data.map((item) => item.total);

    const chartData = {
      labels: labelList,
      datasets: [
        {
          data: dataList,
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    this.graficoLinha = new Chart("faturamentoPorDiaLinha", {
      type: "line",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  graficoProdutoDiaADia;
  montarGraficoDiaADia(data, graficoName) {
    if (this.graficoProdutoDiaADia) {
      this.graficoProdutoDiaADia.destroy();
    }
    const labelList = data.map((item) =>
      moment(item.dataEmissao).format("DD/MM/yyyy")
    );
    let dataList = data.map((item) => item.total);

    const chartData = {
      labels: labelList,
      datasets: [
        {
          data: dataList,
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    new Chart(graficoName, {
      type: "line",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  goto(route) {
    this.router.navigate([route]);
  }

  ngOnDestroy(): void {
    this.watcherSub.unsubscribe();
  }
}
