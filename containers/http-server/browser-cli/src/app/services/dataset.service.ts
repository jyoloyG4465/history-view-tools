import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Dataset,
  deleteDatasetRequest,
  postDatasetCreateResopnse,
  putDatasetRenameRequest,
} from '@app/models/dataset.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetApiService {
  private baseUrl = 'http://localhost:8000/dataset';

  constructor(private http: HttpClient) {}

  getDatasetList(): Observable<Dataset[]> {
    return this.http.get<Dataset[]>(`${this.baseUrl}/v1/list/`);
  }

  postDatasetCreate(formData: FormData): Observable<postDatasetCreateResopnse> {
    return this.http.post<postDatasetCreateResopnse>(
      `${this.baseUrl}/v1/create/`,
      formData
    );
  }

  putDatasetRename(request: putDatasetRenameRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/v1/rename/`, request);
  }

  deleteDataset(params: HttpParams): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/delete/`, { params });
  }
}
