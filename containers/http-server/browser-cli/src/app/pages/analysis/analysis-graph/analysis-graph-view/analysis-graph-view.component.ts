import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { postGetDataResponse } from '@app/models/analysis.model';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-analysis-graph-view',
  imports: [NgxEchartsModule],
  templateUrl: './analysis-graph-view.component.html',
  styleUrl: './analysis-graph-view.component.scss',
})
export class AnalysisGraphViewComponent implements OnChanges {
  @Input() graphData: postGetDataResponse | undefined;

  @Input() graphType!: string;

  @Input() channelName!: string;

  chartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] || changes['graphType']) {
      const categories = this.graphData?.data.map((item) => item.yearMonth);
      const values = this.graphData?.data.map((item) => item.total);
      let type: string;

      if (this.graphType !== 'line') {
        type = 'bar';
      } else {
        type = 'line';
      }

      if (this.graphType === 'horizonalBar') {
        this.chartOptions = {
          title: {
            text: this.channelName,
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
        this.chartOptions = {
          title: {
            text: this.channelName,
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
}
