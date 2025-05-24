import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { GraphType } from '../analysis.enum';
import { GraphData } from '@app/model/graphData';

// Stateの状態の型
export interface AnalysisStateModel {
  channelList: string[];
  graphData: GraphData[];
  graphType: GraphType;
}

export class FetchChannelList {
  static readonly type = '[AnalysisState] Fetch ChannelList';
  constructor(public datasetId: number) {}
}

export class GetData {
  static readonly type = '[AnalysisState] get Data';
  constructor(public datasetId: number, public datasetName: string) {}
}

export class SetGraphType {
  static readonly type = '[AnalysisState] set Graph Type';
  constructor(public graphType: GraphType) {}
}

export class ResetAnalysisState {
  static readonly type = '[AnalysisState] Reset';
}

@Injectable()
@State<AnalysisStateModel>({
  name: 'analysis',
  defaults: {
    channelList: [],
    graphData: [],
    graphType: GraphType.VerticalBar,
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
  static graphType(state: AnalysisStateModel): GraphType {
    return state.graphType;
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

  @Action(SetGraphType)
  setGraphType(
    ctx: StateContext<AnalysisStateModel>,
    action: SetGraphType
  ): void {
    ctx.patchState({ graphType: action.graphType });
  }

  @Action(ResetAnalysisState)
  resetState(ctx: StateContext<AnalysisStateModel>) {
    ctx.patchState({
      channelList: [],
      graphData: [],
      graphType: GraphType.VerticalBar,
    });
  }
}
