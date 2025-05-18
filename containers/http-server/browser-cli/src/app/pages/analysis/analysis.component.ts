import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { LoadingStateFacade } from '@app/shared/state/loading/loading.state.facade';

@Component({
  selector: 'app-analysis',
  imports: [
    TranslateModule,
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

  channelName: string = '';

  selectedDatasetId!: number;

  private datasetService = inject(DatasetService);
  private analysisService = inject(AnalysisService);
  private loadingStateFacade = inject(LoadingStateFacade);

  constructor() {}

  async ngOnInit() {
    await this.fetchDatasetList();
  }

  async fetchDatasetList(): Promise<void> {
    this.loadingStateFacade.startLoading('loadDataset');
    this.datasetList = await lastValueFrom(
      this.datasetService.getDatasetList()
    );
    this.loadingStateFacade.stopLoading('loadDataset');
  }

  async onSelectDataset(event: number) {
    this.selectedDatasetId = event;
    this.loadingStateFacade.startLoading('getChannelList');
    this.channelList = await lastValueFrom(
      this.analysisService.getChannelList(this.selectedDatasetId)
    );
    this.loadingStateFacade.stopLoading('getChannelList');
  }

  async onClickAnalysis(event: string) {
    this.channelName = event;
    this.loadingStateFacade.startLoading('clickAnalysis');
    this.graphData = await lastValueFrom(
      this.analysisService.postGetData(this.selectedDatasetId, event)
    );
    this.loadingStateFacade.stopLoading('clickAnalysis');
  }
}
