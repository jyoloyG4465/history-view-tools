import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { PulldownBoxComponent } from '@app/shared/pulldown-box/pulldown-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';

@Component({
  selector: 'app-analysis',
  imports: [
    TranslateModule,
    LoadingSpinnerComponent,
    PulldownBoxComponent,
    CommonModule,
    AnalysisEditComponent,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {}
