import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { PulldownBoxComponent } from '@app/shared/pulldown-box/pulldown-box.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis-edit',
  imports: [
    PulldownBoxComponent,
    CommonModule,
    TranslateModule,
    ButtonPrimaryComponent,
  ],
  templateUrl: './analysis-edit.component.html',
  styleUrl: './analysis-edit.component.scss',
})
export class AnalysisEditComponent {
  datasetOptions = [
    { label: 'Dataset A', value: 1 },
    { label: 'Dataset B', value: 2 },
  ];

  selectedDatasetId = 1;
  onAnalysisClick() {
    console.log(1);
  }
}
