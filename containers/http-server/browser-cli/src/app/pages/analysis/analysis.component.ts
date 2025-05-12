import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { PulldownBoxComponent } from '@app/shared/pulldown-box/pulldown-box.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis',
  imports: [
    TranslateModule,
    LoadingSpinnerComponent,
    PulldownBoxComponent,
    CommonModule,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {
  datasetOptions = [
    { label: 'Dataset A', value: 1 },
    { label: 'Dataset B', value: 2 },
  ];

  selectedDatasetId = 1;
}
