import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';
import { AnalysisGraphComponent } from './analysis-graph/analysis-graph.component';
import { Dataset } from '@app/models/dataset.model';
import { lastValueFrom } from 'rxjs';
import { AnalysisService } from './analysis.service';
import {
  getChannelListResponse,
  postGetDataResponse,
} from '@app/models/analysis.model';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';

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

  private analysisService = inject(AnalysisService);
  private datasetStateFacade = inject(DatasetStateFacade);

  constructor() {}

  ngOnInit() {
    this.datasetStateFacade.fetchDatasetList();
  }

  async onSelectDataset(event: number) {
    this.selectedDatasetId = event;
    this.channelList = await lastValueFrom(
      this.analysisService.getChannelList(this.selectedDatasetId)
    );
  }

  async onClickAnalysis(event: string) {
    this.channelName = event;
    this.graphData = await lastValueFrom(
      this.analysisService.postGetData(this.selectedDatasetId, event)
    );
  }
}
