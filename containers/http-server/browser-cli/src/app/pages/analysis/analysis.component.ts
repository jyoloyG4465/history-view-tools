import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis',
  imports: [TranslateModule, LoadingSpinnerComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {}
