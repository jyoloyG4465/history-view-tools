import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';
import { AnalysisGraphComponent } from './analysis-graph/analysis-graph.component';
import { Dataset } from '@app/models/dataset.model';
import { lastValueFrom } from 'rxjs';
import { DatasetService } from '../dataset/dataset.service';

@Component({
  selector: 'app-analysis',
  imports: [
    TranslateModule,
    LoadingSpinnerComponent,
    CommonModule,
    AnalysisEditComponent,
    AnalysisGraphComponent,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {
  datasetList: Dataset[] = [];

  isLoading = false;

  selectedDatasetId: number | null = null;

  constructor(private datasetService: DatasetService) {}

  async ngOnInit() {
    await this.fetchDatasetList();
  }

  async fetchDatasetList(): Promise<void> {
    this.setLoading(true);
    this.datasetList = await lastValueFrom(
      this.datasetService.getDatasetList()
    );
    this.setLoading(false);
  }

  // ローディング状態の管理
  private setLoading(state: boolean): void {
    this.isLoading = state;
  }

  onSample(event: number) {
    this.selectedDatasetId = event;
  }
}
