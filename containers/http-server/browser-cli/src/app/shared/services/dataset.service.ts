import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dataset } from '@app/model/dataset';
import { PostDatasetCreateResponse } from '@app/model/postDatasetCreateResponse';
import { PutDatasetRenameRequest } from '@app/model/putDatasetRenameRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetApiService {
  private baseUrl = 'http://localhost:8000/dataset';

  private http = inject(HttpClient);

  constructor() {}

  getDatasetList(): Observable<Dataset[]> {
    return this.http.get<Dataset[]>(`${this.baseUrl}/v1/list/`);
  }

  postDatasetCreate(formData: FormData): Observable<PostDatasetCreateResponse> {
    return this.http.post<PostDatasetCreateResponse>(
      `${this.baseUrl}/v1/create/`,
      formData
    );
  }

  putDatasetRename(request: PutDatasetRenameRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/v1/rename/`, request);
  }

  deleteDataset(params: HttpParams): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/delete/`, { params });
  }
}
