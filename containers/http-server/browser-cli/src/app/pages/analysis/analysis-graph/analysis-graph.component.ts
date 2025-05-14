import { Component } from '@angular/core';
import { AnalysisGraphViewComponent } from './analysis-graph-view/analysis-graph-view.component';
import { AnalysisGraphSettingsComponent } from './analysis-graph-settings/analysis-graph-settings.component';

@Component({
  selector: 'app-analysis-graph',
  imports: [AnalysisGraphViewComponent, AnalysisGraphSettingsComponent],
  templateUrl: './analysis-graph.component.html',
  styleUrl: './analysis-graph.component.scss',
})
export class AnalysisGraphComponent {}
