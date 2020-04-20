import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
/**
 * Inject to root of app
*/
@Injectable({
  providedIn: 'root'
})
/**
 * Service for Graph
*/
export class OverLapGraphForWeatherPredictionService {

/**
 * @ignore
 */
  constructor() { }

/**
 * Show Weather Graph
 * @param {Chart} lineChart Chart object
 * @param lineCanvas Canvas object
 * @param mDate Date array
 * @param mDateTemp Minumun temprature
 * @param label For hoover
 * @param color Fill color of graph
 * @param yAxisMin Minimum temprature of graph
 * @param yAxisMax Minimum temprature of graph
 */
  public showGrapg(lineChart,lineCanvas,mDate,mDateTemp,label,color,yAxisMin,yAxisMax) {
    lineChart = new Chart(lineCanvas.nativeElement,
      {
        options: {
          legend: {
            display: false
          },
          hover: {
            animationDuration: 0
          },
          animation: {
            onComplete: function () {
              const chartInstance = this.chart,
                ctx = chartInstance.ctx;

              ctx.font = Chart.helpers.fontString(
                8,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              this.data.datasets.forEach(function (dataset, i) {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                  const data = dataset.data[index];
                  ctx.fillStyle = "#000";
                  if(index!=5)
                  ctx.fillText(data, bar._model.x +10, bar._model.y - 2);
                  else
                  ctx.fillText(data, bar._model.x -6, bar._model.y - 2);
                });
              });
            }
          },
          tooltips: {
            enabled: true
          },
          responsive: true, 
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  drawOnChartArea: false,
                  display: false
                },
                ticks: {
                  // beginAtZero: true,
                  min: yAxisMin,
                  max: yAxisMax,
                  display: false
                }
              }
            ]
          }
        },
        type: 'line',
        data: {
          labels: mDate,
          datasets: [

            {
              label: label,
              fill: true,
              lineTension: 0.1,
              backgroundColor: color,
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'round',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: mDateTemp,
              spanGaps: false,
            }

          ]
        }
      });





  }

}
