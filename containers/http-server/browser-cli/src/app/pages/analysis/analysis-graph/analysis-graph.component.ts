import { Component, inject, Input } from '@angular/core';
import { AnalysisGraphViewComponent } from './analysis-graph-view/analysis-graph-view.component';
import { AnalysisGraphSettingsComponent } from './analysis-graph-settings/analysis-graph-settings.component';
import { CommonModule } from '@angular/common';
import { AnalysisStateFacade } from '../state/analysis.state.facade';
import { Observable } from 'rxjs';

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
  @Input() channelName!: string;

  private analysisStateFacade = inject(AnalysisStateFacade);

  hasGraphData$: Observable<boolean> = this.analysisStateFacade.hasGraphData$;

  graphType: string = 'verticalBar';

  onGraphTypeChange(event: string) {
    this.graphType = event;
  }
}
