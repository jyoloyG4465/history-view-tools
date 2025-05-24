import { Component, inject, Input } from '@angular/core';
import { graphData } from '@app/models/analysis.model';
import { NgxEchartsModule } from 'ngx-echarts';
import { map, Observable, tap } from 'rxjs';
import { AnalysisStateFacade } from '../../state/analysis.state.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis-graph-view',
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './analysis-graph-view.component.html',
  styleUrl: './analysis-graph-view.component.scss',
})
export class AnalysisGraphViewComponent {
  @Input() graphType!: string;

  @Input() channelName!: string;

  private analysisStateFacade = inject(AnalysisStateFacade);

  chartOptions$: Observable<any> = this.analysisStateFacade.graphData$.pipe(
    map((graphData) => this.updateChartOption(graphData))
  );

  private updateChartOption(graphData: graphData[]) {
    const categories = graphData.map((item) => item.yearMonth);
    const values = graphData.map((item) => item.total);
    let type: string;

    if (this.graphType !== 'line') {
      type = 'bar';
    } else {
      type = 'line';
    }

    if (this.graphType === 'horizonalBar') {
      return {
        title: {
          text: '分析結果',
        },
        tooltip: {},
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: categories,
        },
        series: [
          {
            name: '合計',
            type: type,
            data: values,
            itemStyle: {
              color: '#5470C6',
            },
          },
        ],
      };
    } else {
      return {
        title: {
          text: '分析結果',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '合計',
            type: type,
            data: values,
            itemStyle: {
              color: '#5470C6',
            },
          },
        ],
      };
    }
  }
}
