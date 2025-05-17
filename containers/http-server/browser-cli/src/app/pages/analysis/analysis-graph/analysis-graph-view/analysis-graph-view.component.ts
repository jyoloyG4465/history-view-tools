import { Component, Input } from '@angular/core';
import { postGetDataResponse } from '@app/models/analysis.model';

@Component({
  selector: 'app-analysis-graph-view',
  imports: [],
  templateUrl: './analysis-graph-view.component.html',
  styleUrl: './analysis-graph-view.component.scss',
})
export class AnalysisGraphViewComponent {
  @Input() graphData: postGetDataResponse | undefined;
}
