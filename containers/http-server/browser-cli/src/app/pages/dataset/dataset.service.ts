import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dataset } from '@app/models/dataset.model';
import { LoadingKeys } from '@app/shared/enum/loading-name';
import { DatasetApiService } from '@app/shared/services/dataset.service';
import { LoadingService } from '@app/shared/services/loading.service';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';
import { finalize, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  private datasetApiService = inject(DatasetApiService);

  private loadingService = inject(LoadingService);
  private datasetStateFacade = inject(DatasetStateFacade);

  putDatasetRename(datasetId: number, datasetName: string): Observable<void> {
    const request = { datasetId, datasetName };
    return this.datasetApiService.putDatasetRename(request);
  }

  deleteDataset(datasetId: number): Observable<void> {
    const params = new HttpParams().set('datasetId', datasetId.toString());
    return this.datasetApiService.deleteDataset(params);
  }

  getDatasetList(): Observable<Dataset[]> {
    return this.datasetApiService.getDatasetList();
  }

  uploadFile(selectedFile: File, datasetName: string): void {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('datasetName', datasetName);

    this.loadingService.start(LoadingKeys.CreateDataset);
    this.datasetApiService
      .postDatasetCreate(formData)
      .pipe(
        switchMap(() => this.datasetStateFacade.fetchDatasetList()),
        finalize(() => this.loadingService.stop(LoadingKeys.CreateDataset))
      )
      .subscribe({
        next: () => {
          alert('ファイル取り込みに成功しました');
        },
        error: () => {
          alert('ファイル取り込みに失敗しました');
        },
      });
  }
}
