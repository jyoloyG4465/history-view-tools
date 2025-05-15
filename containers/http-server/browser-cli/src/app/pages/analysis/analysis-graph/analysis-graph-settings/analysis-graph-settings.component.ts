import { Component } from '@angular/core';

@Component({
  selector: 'app-analysis-graph-settings',
  imports: [],
  templateUrl: './analysis-graph-settings.component.html',
  styleUrl: './analysis-graph-settings.component.scss',
})
export class AnalysisGraphSettingsComponent {
  onClickImage(index: number): void {
    console.log(`Image ${index} clicked`);
    // ここに任意の処理を追加
  }
}
