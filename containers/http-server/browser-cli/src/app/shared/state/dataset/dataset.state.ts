import { Dataset } from '@app/models/dataset.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { finalize, map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { DatasetApiService } from '@app/shared/services/dataset.service';
import { LoadingStateFacade } from '@app/shared/state/loading/loading.state.facade';

// Stateの状態の型
export interface DatasetStateModel {
  datasets: Dataset[];
}

export class SetDatasets {
  static readonly type = '[Dataset] Set All';
  constructor() {}
}

@Injectable()
@State<DatasetStateModel>({
  name: 'dataset',
  defaults: {
    datasets: [],
  },
})
export class DatasetState {
  private datasetApiService = inject(DatasetApiService);
  private loadingStateFacade = inject(LoadingStateFacade);
  constructor() {}

  @Selector()
  static getDatasets(state: DatasetStateModel) {
    return state.datasets;
  }

  @Action(SetDatasets)
  setDatasets(ctx: StateContext<DatasetStateModel>): Observable<void> {
    this.loadingStateFacade.startLoading('fetchDatasetList');
    {
      return this.datasetApiService.getDatasetList().pipe(
        tap((datasets) => {
          ctx.patchState({ datasets });
        }),
        map(() => undefined),
        finalize(() => {
          // ローディング終了
          this.loadingStateFacade.stopLoading('fetchDatasetList');
        })
      );
    }
  }
}
