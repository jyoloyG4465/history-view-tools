import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class StartLoading {
  static readonly type = '[Loading] Start';
  constructor(public label: string) {}
}

export class StopLoading {
  static readonly type = '[Loading] Stop';
  constructor(public label: string) {}
}

export interface LoadingStateModel {
  loadingLabels: string[];
}

@State<LoadingStateModel>({
  name: 'loading',
  defaults: {
    loadingLabels: [],
  },
})
@Injectable()
export class LoadingState {
  @Selector()
  static isLoading(state: LoadingStateModel): boolean {
    return state.loadingLabels.length > 0;
  }

  @Action(StartLoading)
  startLoading(ctx: StateContext<LoadingStateModel>, action: StartLoading) {
    const labels = new Set(ctx.getState().loadingLabels);
    labels.add(action.label);
    const updatedLabels = Array.from(labels);
    ctx.patchState({ loadingLabels: updatedLabels });
  }

  @Action(StopLoading)
  stopLoading(ctx: StateContext<LoadingStateModel>, action: StopLoading) {
    const labels = new Set(ctx.getState().loadingLabels);
    labels.delete(action.label);
    const updatedLabels = Array.from(labels);
    ctx.patchState({ loadingLabels: updatedLabels });
  }
}
