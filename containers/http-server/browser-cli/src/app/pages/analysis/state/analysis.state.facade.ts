import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AnalysisState,
  SetSelectedDatasetId,
  SetChannelList,
} from './analysis.state';

@Injectable({ providedIn: 'root' })
export class AnalysisStateFacade {
  private store = inject(Store);

  get getChannelList$(): Observable<string[]> {
    return this.store.select(AnalysisState.getchannelList);
  }

  get getSelectedDatasetId$(): Observable<number | null> {
    return this.store.select(AnalysisState.getSelectedDatasetId);
  }

  get getChannelList(): string[] {
    return this.store.selectSnapshot((state) => state.analysis.channelList);
  }

  get getSelectedDatasetId(): number {
    return this.store.selectSnapshot(
      (state) => state.analysis.selectedDatasetId
    );
  }

  setSelectedDatasetId(datasetId: number): Observable<void> {
    return this.store.dispatch(new SetSelectedDatasetId(datasetId));
  }

  setChannelList(): Observable<void> {
    const selectedDatasetId = this.getSelectedDatasetId;
    return this.store.dispatch(new SetChannelList(selectedDatasetId));
  }
}
