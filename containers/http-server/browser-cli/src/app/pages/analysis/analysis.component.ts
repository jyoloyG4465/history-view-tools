import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';
import { AnalysisGraphComponent } from './analysis-graph/analysis-graph.component';
import { Dataset } from '@app/models/dataset.model';
import { Observable } from 'rxjs';
import { postGetDataResponse } from '@app/models/analysis.model';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';
import { AnalysisStateFacade } from './state/analysis.state.facade';

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
  graphData: postGetDataResponse | undefined;

  channelName: string = '';

  selectedDatasetId!: number;

  private datasetStateFacade = inject(DatasetStateFacade);
  private analysisStateFacade = inject(AnalysisStateFacade);

  datasetList$: Observable<Dataset[]> = this.datasetStateFacade.getDatasets$;

  channelList$: Observable<string[]> = this.analysisStateFacade.getChannelList$;

  ngOnInit() {
    this.datasetStateFacade.fetchDatasetList();
  }
}
