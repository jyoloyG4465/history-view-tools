import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getChannelListResponse,
  postGetDataResponse,
} from '@app/models/analysis.model';
import { Dataset, postDatasetCreateResopnse } from '@app/models/dataset.model';
import { AnalysisApiService } from '@app/services/analysis.service';
import { DatasetApiService } from '@app/services/dataset.service';
import { Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  constructor(private analysisApiService: AnalysisApiService) {}

  postGetData(
    datasetId: number,
    channelName?: string
  ): Observable<postGetDataResponse> {
    const request = { datasetId, channelName };
    return this.analysisApiService.postDatasetCreate(request);
  }

  getChannelList(datasetId: number): Observable<getChannelListResponse> {
    const params = new HttpParams().set('datasetId', datasetId.toString());
    return this.analysisApiService.getChannelList(params);
  }
}
