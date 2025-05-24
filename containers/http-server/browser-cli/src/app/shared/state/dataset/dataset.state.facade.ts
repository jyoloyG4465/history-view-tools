import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DatasetState, SetDatasets } from './dataset.state';
import { Dataset } from '@app/model/dataset';

@Injectable({ providedIn: 'root' })
export class DatasetStateFacade {
  private store = inject(Store);

  constructor() {}

  get datasets$(): Observable<Dataset[]> {
    return this.store.select(DatasetState.getDatasets);
  }

  fetchDatasetList(): Observable<void> {
    return this.store.dispatch(new SetDatasets());
  }
}
