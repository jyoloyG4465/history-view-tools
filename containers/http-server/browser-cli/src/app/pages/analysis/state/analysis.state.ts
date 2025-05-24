import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AnalysisService } from '../analysis.service';

// Stateの状態の型
export interface AnalysisStateModel {
  selectedDatasetId: number | null;
  channelList: string[];
}

export class SetChannelList {
  static readonly type = '[AnalysisState] Set ChannelList';
  constructor(public datasetId: number) {}
}
export class SetSelectedDatasetId {
  static readonly type = '[AnalysisState] Set selectedDatasetId';
  constructor(public datasetId: number) {}
}

@Injectable()
@State<AnalysisStateModel>({
  name: 'analysis',
  defaults: {
    selectedDatasetId: null,
    channelList: [],
  },
})
export class AnalysisState {
  private analysisService = inject(AnalysisService);
  constructor() {}

  @Selector()
  static getSelectedDatasetId(state: AnalysisStateModel) {
    return state.selectedDatasetId;
  }

  @Selector()
  static getchannelList(state: AnalysisStateModel) {
    return state.channelList;
  }

  @Action(SetSelectedDatasetId)
  setSelectedDatasetId(
    ctx: StateContext<AnalysisStateModel>,
    action: SetSelectedDatasetId
  ): void {
    ctx.patchState({ selectedDatasetId: action.datasetId });
  }

  @Action(SetChannelList)
  SetChannelList(
    ctx: StateContext<AnalysisStateModel>,
    action: SetChannelList
  ): Observable<void> {
    {
      return this.analysisService.getChannelList(action.datasetId).pipe(
        tap((response) => {
          const channelList = response.data;
          ctx.patchState({ channelList });
        }),
        map(() => undefined)
      );
    }
  }
}
