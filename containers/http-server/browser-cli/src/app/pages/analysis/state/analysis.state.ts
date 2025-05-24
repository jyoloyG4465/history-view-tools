import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AnalysisService } from '../analysis.service';

// Stateの状態の型
export interface AnalysisStateModel {
  channelList: string[];
}

export class FetchChannelList {
  static readonly type = '[AnalysisState] Fetch ChannelList';
  constructor(public datasetId: number) {}
}

@Injectable()
@State<AnalysisStateModel>({
  name: 'analysis',
  defaults: {
    channelList: [],
  },
})
export class AnalysisState {
  private analysisService = inject(AnalysisService);
  constructor() {}

  @Selector()
  static getchannelList(state: AnalysisStateModel) {
    return state.channelList;
  }

  @Action(FetchChannelList)
  SetChannelList(
    ctx: StateContext<AnalysisStateModel>,
    action: FetchChannelList
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
