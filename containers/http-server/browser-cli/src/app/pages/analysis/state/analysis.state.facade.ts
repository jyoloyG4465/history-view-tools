import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AnalysisState,
  FetchChannelList,
  GetData,
  ResetAnalysisState,
  SetGraphType,
} from './analysis.state';
import { GraphType } from '../analysis.enum';
import { GraphData } from '@app/model/graphData';

@Injectable({ providedIn: 'root' })
export class AnalysisStateFacade {
  private store = inject(Store);

  get channelList$(): Observable<string[]> {
    return this.store.select(AnalysisState.getChannelList);
  }

  get channelList(): string[] {
    return this.store.selectSnapshot((state) => state.analysis.channelList);
  }

  get graphData$(): Observable<GraphData[]> {
    return this.store.select(AnalysisState.getGraphData);
  }

  get graphType$(): Observable<GraphType> {
    return this.store.select(AnalysisState.graphType);
  }

  fetchChannelList(datasetId: number): Observable<void> {
    return this.store.dispatch(new FetchChannelList(datasetId));
  }

  getData(datasetId: number, channelName: string): Observable<void> {
    return this.store.dispatch(new GetData(datasetId, channelName));
  }

  setGraphType(graphType: GraphType): Observable<void> {
    return this.store.dispatch(new SetGraphType(graphType));
  }

  reset(): void {
    this.store.dispatch(new ResetAnalysisState());
  }
}
