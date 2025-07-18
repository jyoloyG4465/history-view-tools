import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';
import { AnalysisGraphComponent } from './analysis-graph/analysis-graph.component';
import { Observable } from 'rxjs';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';
import { AnalysisStateFacade } from './state/analysis.state.facade';
import { Dataset } from '@app/model/dataset';

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
export class AnalysisComponent implements OnInit, OnDestroy {
  private datasetStateFacade = inject(DatasetStateFacade);
  private analysisStateFacade = inject(AnalysisStateFacade);

  datasetList$: Observable<Dataset[]> = this.datasetStateFacade.datasets$;

  channelList$: Observable<string[]> = this.analysisStateFacade.channelList$;

  ngOnInit() {
    this.datasetStateFacade.fetchDatasetList();
  }

  ngOnDestroy(): void {
    this.analysisStateFacade.reset();
  }
}
