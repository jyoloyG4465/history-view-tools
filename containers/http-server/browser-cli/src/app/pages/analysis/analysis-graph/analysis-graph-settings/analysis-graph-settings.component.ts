import { Component, inject } from '@angular/core';
import { AnalysisStateFacade } from '@pages/analysis/state/analysis.state.facade';
import { GraphType } from '@pages/analysis/analysis.enum';

@Component({
  selector: 'app-analysis-graph-settings',
  imports: [],
  templateUrl: './analysis-graph-settings.component.html',
  styleUrl: './analysis-graph-settings.component.scss',
})
export class AnalysisGraphSettingsComponent {
  private analysisStateFacade = inject(AnalysisStateFacade);

  protected graphType = GraphType;

  onClickImage(graphType: GraphType): void {
    this.analysisStateFacade.setGraphType(graphType);
  }
}
