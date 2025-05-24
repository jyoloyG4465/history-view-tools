import { Component, inject } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { combineLatest, map, Observable } from 'rxjs';
import { AnalysisStateFacade } from '@pages/analysis/state/analysis.state.facade';
import { CommonModule } from '@angular/common';
import { EChartsCoreOption } from 'echarts/core';
import { GraphType } from '@pages/analysis/analysis.enum';
import { GraphData } from '@app/model/graphData';

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

  private updateChartOption(graphData: GraphData[], graphType: GraphType) {
    const categories = graphData.map((item) => item.yearMonth);
    const values = graphData.map((item) => item.total);
    let type: string;

    if (graphType !== GraphType.Line) {
      type = 'bar';
    } else {
      type = 'line';
    }

    if (graphType === GraphType.HorizontalBar) {
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
