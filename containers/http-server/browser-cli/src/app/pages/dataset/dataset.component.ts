import { Component, OnInit } from '@angular/core';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { lastValueFrom, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { Dataset, putDatasetRenameRequest } from '@app/models/dataset.model';
import { DatasetService } from './dataset.service';
import { DatasetStateFacade } from '@app/shared/state/dataset.state.facade';

@Component({
  selector: 'app-dataset',
  imports: [
    DatasetImportComponent,
    TranslateModule,
    MatProgressSpinnerModule,
    CommonModule,
    LoadingSpinnerComponent,
    DatasetListComponent,
  ],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss',
})
export class DatasetComponent implements OnInit {
  datasetList$: Observable<Dataset[]>;

  isLoading = false;
  constructor(
    private datasetService: DatasetService,
    private datasetStateFacade: DatasetStateFacade
  ) {
    this.datasetList$ = this.datasetStateFacade.getDatasets$;
  }

  async ngOnInit() {
    this.setLoading(true);
    this.datasetStateFacade.loadDatasets();
    this.setLoading(false);
  }

  async onUploadFile(formData: FormData): Promise<void> {
    try {
      this.setLoading(true);
      await lastValueFrom(this.datasetService.createDataset(formData));
      this.datasetStateFacade.loadDatasets();
      alert('ファイル取り込みに成功しました');
    } catch (err) {
      alert('ファイル取り込みに失敗しました');
    } finally {
      this.setLoading(false);
    }
  }

  // ローディング状態の管理
  private setLoading(state: boolean): void {
    this.isLoading = state;
  }

  async onUpdate(event: putDatasetRenameRequest): Promise<void> {
    await lastValueFrom(
      this.datasetService.putDatasetRename(event.datasetId, event.datasetName)
    );
    this.datasetStateFacade.loadDatasets();
  }

  async onDelete(datasetId: number): Promise<void> {
    await lastValueFrom(this.datasetService.deleteDataset(datasetId));
    this.datasetStateFacade.loadDatasets();
  }
}
