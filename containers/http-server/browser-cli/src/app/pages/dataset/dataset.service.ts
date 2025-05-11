import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dataset, postDatasetCreateResopnse } from '@app/models/dataset.model';
import { DatasetApiService } from '@app/services/dataset.service';
import { Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  constructor(private datasetApiService: DatasetApiService) {}

  private datasetChangedSubject = new Subject<void>();
  datasetChanged$ = this.datasetChangedSubject.asObservable();

  putDatasetRename(datasetId: number, datasetName: string): Observable<void> {
    const request = { datasetId, datasetName };
    return this.datasetApiService.putDatasetRename(request);
  }

  deleteDataset(datasetId: number): Observable<void> {
    const params = new HttpParams().set('datasetId', datasetId.toString());
    return this.datasetApiService.deleteDataset(params);
  }

  createDataset(formData: FormData): Observable<postDatasetCreateResopnse> {
    return this.datasetApiService.postDatasetCreate(formData);
  }

  getDatasetList(): Observable<Dataset[]> {
    return this.datasetApiService.getDatasetList();
  }
}
