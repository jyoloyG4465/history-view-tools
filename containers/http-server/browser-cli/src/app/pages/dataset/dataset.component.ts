import { Component } from '@angular/core';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { lastValueFrom } from 'rxjs';
import { DatasetApiService } from '@app/services/dataset.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dataset',
  imports: [DatasetImportComponent, TranslateModule],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss',
})
export class DatasetComponent {
  constructor(private datasetService: DatasetApiService) {}

  async onUploadFile(formData: FormData): Promise<void> {
    try {
      await lastValueFrom(this.datasetService.postDatasetCreate(formData));
      await lastValueFrom(this.datasetService.getDatasetList());
      alert('ファイル取り込みに成功しました');
    } catch (err) {
      alert('ファイル取り込みに失敗しました');
    }
  }
}
