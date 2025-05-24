import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AnalysisStateFacade } from '../../state/analysis.state.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analysis-graph-settings',
  imports: [],
  templateUrl: './analysis-graph-settings.component.html',
  styleUrl: './analysis-graph-settings.component.scss',
})
export class AnalysisGraphSettingsComponent {
  private analysisStateFacade = inject(AnalysisStateFacade);

  onClickImage(graphType: string): void {
    this.analysisStateFacade.setGraphType(graphType);
  }
}
