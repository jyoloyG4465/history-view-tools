import { Component, inject, Input } from '@angular/core';
import { graphData } from '@app/models/analysis.model';
import { NgxEchartsModule } from 'ngx-echarts';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { AnalysisStateFacade } from '../../state/analysis.state.facade';
import { CommonModule } from '@angular/common';
import { EChartsCoreOption } from 'echarts/core';

@Component({
  selector: 'app-analysis-graph-view',
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './analysis-graph-view.component.html',
  styleUrl: './analysis-graph-view.component.scss',
})
export class AnalysisGraphViewComponent {
  private analysisStateFacade = inject(AnalysisStateFacade);

  chartOptions$: Observable<EChartsCoreOption> = combineLatest([
    this.analysisStateFacade.graphData$,
    this.analysisStateFacade.graphType$,
  ]).pipe(
    map(([graphData, graphType]) =>
      this.updateChartOption(graphData, graphType)
    )
  );

  private updateChartOption(graphData: graphData[], graphType: string) {
    const categories = graphData.map((item) => item.yearMonth);
    const values = graphData.map((item) => item.total);
    let type: string;

    if (graphType !== 'line') {
      type = 'bar';
    } else {
      type = 'line';
    }

    if (graphType === 'horizonalBar') {
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
