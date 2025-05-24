import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetChannelListResponse } from '@app/model/getChannelListResponse';
import { PostGetDataRequest } from '@app/model/postGetDataRequest';
import { PostGetDataResponse } from '@app/model/postGetDataResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisApiService {
  private baseUrl = 'http://localhost:8000/analysis';

  private http = inject(HttpClient);

  constructor() {}

  getChannelList(params: HttpParams): Observable<GetChannelListResponse> {
    return this.http.get<GetChannelListResponse>(
      `${this.baseUrl}/v1/channel-list/`,
      { params }
    );
  }

  postGetGraphData(
    request: PostGetDataRequest
  ): Observable<PostGetDataResponse> {
    return this.http.post<PostGetDataResponse>(
      `${this.baseUrl}/v1/get-data/`,
      request
    );
  }
}
