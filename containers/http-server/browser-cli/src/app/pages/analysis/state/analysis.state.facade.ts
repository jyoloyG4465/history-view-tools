import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AnalysisState, FetchChannelList, GetData } from './analysis.state';
import { graphData } from '@app/models/analysis.model';

@Injectable({ providedIn: 'root' })
export class AnalysisStateFacade {
  private store = inject(Store);

  get channelList$(): Observable<string[]> {
    return this.store.select(AnalysisState.getChannelList);
  }

  get channelList(): string[] {
    return this.store.selectSnapshot((state) => state.analysis.channelList);
  }

  get graphData$(): Observable<graphData[]> {
    return this.store.select(AnalysisState.getGraphData);
  }

  get hasGraphData$(): Observable<boolean> {
    return this.store.select(AnalysisState.hasGraphData);
  }

  fetchChannelList(datasetId: number): Observable<void> {
    return this.store.dispatch(new FetchChannelList(datasetId));
  }

  getData(datasetId: number, channelName: string): Observable<void> {
    return this.store.dispatch(new GetData(datasetId, channelName));
  }
}
