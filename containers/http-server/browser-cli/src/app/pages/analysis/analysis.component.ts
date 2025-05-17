import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';
import { AnalysisGraphComponent } from './analysis-graph/analysis-graph.component';
import { Dataset } from '@app/models/dataset.model';
import { lastValueFrom } from 'rxjs';
import { DatasetService } from '../dataset/dataset.service';
import { AnalysisService } from './analysis.service';
import {
  getChannelListResponse,
  postGetDataResponse,
} from '@app/models/analysis.model';

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

  channelList: getChannelListResponse | undefined;

  graphData: postGetDataResponse | undefined;

  isLoading = false;

  selectedDatasetId!: number;

  constructor(
    private datasetService: DatasetService,
    private analysisService: AnalysisService
  ) {}

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

  async onSelectDataset(event: number) {
    this.selectedDatasetId = event;
    this.setLoading(true);
    this.channelList = await lastValueFrom(
      this.analysisService.getChannelList(this.selectedDatasetId)
    );
    this.setLoading(false);
  }

  async onClickAnalysis() {
    const channelName = 'もこうの実況';
    this.setLoading(true);
    const sample = await lastValueFrom(
      this.analysisService.postGetData(this.selectedDatasetId)
    );
    console.log(sample);
    this.setLoading(false);
  }
}
