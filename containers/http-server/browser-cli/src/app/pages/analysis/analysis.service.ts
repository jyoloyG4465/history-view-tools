import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  getChannelListResponse,
  postGetDataResponse,
} from '@app/models/analysis.model';
import { Dataset, postDatasetCreateResopnse } from '@app/models/dataset.model';
import { AnalysisApiService } from '@app/shared/services/analysis.service';
import { DatasetApiService } from '@app/shared/services/dataset.service';
import { Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private analysisApiService = inject(AnalysisApiService);

  constructor() {}

  getGraphData(
    datasetId: number,
    channelName?: string
  ): Observable<postGetDataResponse> {
    const request = { datasetId, channelName };
    return this.analysisApiService.postGetGraphData(request);
  }

  getChannelList(datasetId: number): Observable<getChannelListResponse> {
    const params = new HttpParams().set('datasetId', datasetId.toString());
    return this.analysisApiService.getChannelList(params);
  }
}
