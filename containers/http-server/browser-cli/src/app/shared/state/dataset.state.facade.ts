import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DatasetState, SetDatasets } from './dataset.state';
import { Dataset } from '@app/models/dataset.model';

@Injectable({ providedIn: 'root' })
export class DatasetStateFacade {
  constructor(private store: Store) {}

  get getDatasets$(): Observable<Dataset[]> {
    return this.store.select(DatasetState.getDatasets);
  }

  loadDatasets(): Observable<void> {
    return this.store.dispatch(new SetDatasets());
  }
}
