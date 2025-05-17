import { Component, Input } from '@angular/core';
import { AnalysisGraphViewComponent } from './analysis-graph-view/analysis-graph-view.component';
import { AnalysisGraphSettingsComponent } from './analysis-graph-settings/analysis-graph-settings.component';
import { postGetDataResponse } from '@app/models/analysis.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis-graph',
  imports: [
    AnalysisGraphViewComponent,
    AnalysisGraphSettingsComponent,
    CommonModule,
  ],
  templateUrl: './analysis-graph.component.html',
  styleUrl: './analysis-graph.component.scss',
})
export class AnalysisGraphComponent {
  @Input() graphData: postGetDataResponse | undefined;

  @Input() channelName!: string;

  graphType: string = 'verticalBar';

  onGraphTypeChange(event: string) {
    this.graphType = event;
  }
}
