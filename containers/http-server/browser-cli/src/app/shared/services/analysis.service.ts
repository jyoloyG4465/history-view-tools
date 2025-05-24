import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  getChannelListResponse,
  postGetDataRequest,
  postGetDataResponse,
} from '@app/models/analysis.model';
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
export class AnalysisApiService {
  private baseUrl = 'http://localhost:8000/analysis';

  private http = inject(HttpClient);

  constructor() {}

  getChannelList(params: HttpParams): Observable<getChannelListResponse> {
    return this.http.get<getChannelListResponse>(
      `${this.baseUrl}/v1/channel-list/`,
      { params }
    );
  }

  postGetGraphData(
    request: postGetDataRequest
  ): Observable<postGetDataResponse> {
    return this.http.post<postGetDataResponse>(
      `${this.baseUrl}/v1/get-data/`,
      request
    );
  }
}
