import { Chart } from "chart.js";

export class ChartUtils {
  public static reloadChart(chart, toggleText = 'Desmarcar Todos') {
    // Override legend after chart exists
    chart.options.plugins.legend.labels.generateLabels = (chartInstance: any) => {
      const original = Chart.overrides.pie.plugins.legend.labels.generateLabels(chartInstance);
      return [
        {
          text: toggleText,
          fillStyle: '#888',
          strokeStyle: '#888',
          hidden: false,
          index: -1
        },
        ...original
      ];
    };

    chart.options.plugins.legend.onClick = (e: any, legendItem: any, legend: any) => {
      if (legendItem.index === -1) {
        const allVisible = chart.getDatasetMeta(0).data.every((arc: any) => !arc.hidden);
        chart.getDatasetMeta(0).data.forEach((arc: any) => {
          arc.hidden = allVisible;
        });
        toggleText = allVisible ? 'Marcar Todos' : 'Desmarcar Todos';
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
