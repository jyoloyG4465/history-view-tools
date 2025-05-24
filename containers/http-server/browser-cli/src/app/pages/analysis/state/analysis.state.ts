import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { graphData } from '@app/models/analysis.model';

// Stateの状態の型
export interface AnalysisStateModel {
  channelList: string[];
  graphData: graphData[];
}

export class FetchChannelList {
  static readonly type = '[AnalysisState] Fetch ChannelList';
  constructor(public datasetId: number) {}
}

export class GetData {
  static readonly type = '[AnalysisState] get Data';
  constructor(public datasetId: number, public datasetName: string) {}
}

@Injectable()
@State<AnalysisStateModel>({
  name: 'analysis',
  defaults: {
    channelList: [],
    graphData: [],
  },
})
export class AnalysisState {
  private analysisService = inject(AnalysisService);
  constructor() {}

  @Selector()
  static getChannelList(state: AnalysisStateModel) {
    return state.channelList;
  }

  @Selector()
  static getGraphData(state: AnalysisStateModel) {
    return state.graphData;
  }

  @Selector()
  static hasGraphData(state: AnalysisStateModel): boolean {
    return state.graphData.length > 0;
  }

  @Action(FetchChannelList)
  fetchChannelList(
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

  @Action(GetData)
  getGraphData(
    ctx: StateContext<AnalysisStateModel>,
    action: GetData
  ): Observable<void> {
    {
      return this.analysisService
        .getGraphData(action.datasetId, action.datasetName)
        .pipe(
          tap((response) => {
            const graphData = response.data;
            ctx.patchState({ graphData });
          }),
          map(() => undefined)
        );
    }
  }
}
