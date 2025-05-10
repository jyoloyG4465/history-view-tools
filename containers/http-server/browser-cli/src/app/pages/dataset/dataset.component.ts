import { Component, OnInit } from '@angular/core';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { lastValueFrom } from 'rxjs';
import { DatasetApiService } from '@app/services/dataset.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@app/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dataset',
  imports: [
    DatasetImportComponent,
    TranslateModule,
    MatProgressSpinnerModule,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss',
})
export class DatasetComponent implements OnInit {
  datasetList: any[] = [];

  isLoading = false;
  constructor(private datasetService: DatasetApiService) {}

  async ngOnInit() {
    this.setLoading(true);
    await this.fetchDatasetList();
    this.setLoading(false);
  }

  async onUploadFile(formData: FormData): Promise<void> {
    try {
      this.setLoading(true);
      await lastValueFrom(this.datasetService.postDatasetCreate(formData));
      await this.fetchDatasetList();
      alert('ファイル取り込みに成功しました');
    } catch (err) {
      alert('ファイル取り込みに失敗しました');
    } finally {
      this.setLoading(false);
    }
  }

  async fetchDatasetList(): Promise<void> {
    this.datasetList = await lastValueFrom(
      this.datasetService.getDatasetList()
    );
  }

  // ローディング状態の管理
  private setLoading(state: boolean): void {
    this.isLoading = state;
  }
}
