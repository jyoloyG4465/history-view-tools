import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  putDatasetRename(datasetId: number, datasetName: string): void {
    const request = { datasetId, datasetName };
    this.handleDatasetOperation$(
      LoadingKeys.RenameDataset,
      this.datasetApiService.putDatasetRename(request)
    ).subscribe();
  }

  deleteDataset(datasetId: number): void {
    const params = new HttpParams().set('datasetId', datasetId.toString());
    this.handleDatasetOperation$(
      LoadingKeys.DeleteDataset,
      this.datasetApiService.deleteDataset(params)
    ).subscribe();
  }

  uploadFile(selectedFile: File, datasetName: string): void {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('datasetName', datasetName);

    this.handleDatasetOperation$(
      LoadingKeys.CreateDataset,
      this.datasetApiService.postDatasetCreate(formData)
    ).subscribe({
      next: () => alert('ファイル取り込みに成功しました'),
      error: () => alert('ファイル取り込みに失敗しました'),
    });
  }

  private handleDatasetOperation$(
    key: LoadingKeys,
    request$: Observable<any>
  ): Observable<any> {
    this.loadingService.start(key);

    return request$.pipe(
      switchMap(() => this.datasetStateFacade.fetchDatasetList()),
      finalize(() => this.loadingService.stop(key))
    );
  }
}
