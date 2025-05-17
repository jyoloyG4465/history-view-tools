import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-analysis-graph-settings',
  imports: [],
  templateUrl: './analysis-graph-settings.component.html',
  styleUrl: './analysis-graph-settings.component.scss',
})
export class AnalysisGraphSettingsComponent {
  @Output() graphTypeChangeEvent = new EventEmitter<string>();

  onClickImage(graphType: string): void {
    this.graphTypeChangeEvent.emit(graphType);
  }
}
