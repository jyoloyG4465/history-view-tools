import { Component, inject, OnInit } from '@angular/core';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { lastValueFrom, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { Dataset, putDatasetRenameRequest } from '@app/models/dataset.model';
import { DatasetService } from './dataset.service';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';
import { LoadingService } from '@app/shared/services/loading.service';
import { LoadingKeys } from '@app/shared/enum/loading-name';

@Component({
  selector: 'app-dataset',
  imports: [
    DatasetImportComponent,
    TranslateModule,
    MatProgressSpinnerModule,
    CommonModule,
    DatasetListComponent,
  ],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss',
})
export class DatasetComponent implements OnInit {
  private datasetService = inject(DatasetService);
  private datasetStateFacade = inject(DatasetStateFacade);
  private loadingService = inject(LoadingService);

  datasetList$: Observable<Dataset[]> = this.datasetStateFacade.getDatasets$;

  constructor() {}

  async ngOnInit() {
    this.datasetStateFacade.fetchDatasetList();
  }

  async onUploadFile(formData: FormData): Promise<void> {
    try {
      this.loadingService.start(LoadingKeys.CreateDataset);
      await lastValueFrom(this.datasetService.createDataset(formData));
      this.datasetStateFacade.fetchDatasetList();
      alert('ファイル取り込みに成功しました');
    } catch (err) {
      alert('ファイル取り込みに失敗しました');
    } finally {
      this.loadingService.stop(LoadingKeys.CreateDataset);
    }
  }

  async onUpdate(event: putDatasetRenameRequest): Promise<void> {
    await lastValueFrom(
      this.datasetService.putDatasetRename(event.datasetId, event.datasetName)
    );
    this.datasetStateFacade.fetchDatasetList();
  }

  async onDelete(datasetId: number): Promise<void> {
    await lastValueFrom(this.datasetService.deleteDataset(datasetId));
    this.datasetStateFacade.fetchDatasetList();
  }
}
