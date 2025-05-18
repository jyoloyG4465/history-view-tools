import { Dataset } from '@app/models/dataset.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DatasetApiService } from '../../services/dataset.service';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

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
  constructor(private datasetApiService: DatasetApiService) {}

  @Selector()
  static getDatasets(state: DatasetStateModel) {
    return state.datasets;
  }

  @Action(SetDatasets)
  setDatasets(ctx: StateContext<DatasetStateModel>): Observable<void> {
    {
      return this.datasetApiService.getDatasetList().pipe(
        tap((datasets) => {
          ctx.patchState({ datasets });
        }),
        map(() => undefined)
      );
    }
  }
}
