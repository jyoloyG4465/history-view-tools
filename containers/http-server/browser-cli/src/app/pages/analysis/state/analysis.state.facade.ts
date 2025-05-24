import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AnalysisState, FetchChannelList } from './analysis.state';

@Injectable({ providedIn: 'root' })
export class AnalysisStateFacade {
  private store = inject(Store);

  get getChannelList$(): Observable<string[]> {
    return this.store.select(AnalysisState.getchannelList);
  }

  get getChannelList(): string[] {
    return this.store.selectSnapshot((state) => state.analysis.channelList);
  }

  fetchChannelList(datasetId: number): Observable<void> {
    return this.store.dispatch(new FetchChannelList(datasetId));
  }
}
