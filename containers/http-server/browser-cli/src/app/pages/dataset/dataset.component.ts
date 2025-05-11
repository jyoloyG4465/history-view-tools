import { Component, OnInit } from '@angular/core';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { lastValueFrom, Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { Dataset, putDatasetRenameRequest } from '@app/models/dataset.model';
import { DatasetService } from './dataset.service';

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
  datasetList: Dataset[] = [];

  isLoading = false;
  constructor(private datasetService: DatasetService) {}

  async ngOnInit() {
    await this.fetchDatasetList();
  }

  async onUploadFile(formData: FormData): Promise<void> {
    try {
      this.setLoading(true);
      await lastValueFrom(this.datasetService.createDataset(formData));
      await this.fetchDatasetList();
      alert('ファイル取り込みに成功しました');
    } catch (err) {
      alert('ファイル取り込みに失敗しました');
    } finally {
      this.setLoading(false);
    }
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

  async onUpdate(event: putDatasetRenameRequest): Promise<void> {
    await lastValueFrom(
      this.datasetService.putDatasetRename(event.datasetId, event.datasetName)
    );
    await this.fetchDatasetList();
  }

  async onDelete(datasetId: number): Promise<void> {
    await lastValueFrom(this.datasetService.deleteDataset(datasetId));
    await this.fetchDatasetList();
  }
}
