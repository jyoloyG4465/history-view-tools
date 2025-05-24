import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetChannelListResponse } from '@app/model/getChannelListResponse';
import { PostGetDataResponse } from '@app/model/postGetDataResponse';
import { AnalysisApiService } from '@app/shared/services/analysis.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private analysisApiService = inject(AnalysisApiService);

  constructor() {}

  getGraphData(
    datasetId: number,
    channelName?: string
  ): Observable<PostGetDataResponse> {
    const request = { datasetId, channelName };
    return this.analysisApiService.postGetGraphData(request);
  }

  getChannelList(datasetId: number): Observable<GetChannelListResponse> {
    const params = new HttpParams().set('datasetId', datasetId.toString());
    return this.analysisApiService.getChannelList(params);
  }
}
