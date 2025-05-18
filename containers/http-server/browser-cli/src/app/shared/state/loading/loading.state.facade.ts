import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadingState, StartLoading, StopLoading } from './loading.state';

@Injectable({ providedIn: 'root' })
export class LoadingStateFacade {
  constructor(private store: Store) {}

  get isLoading$(): Observable<boolean> {
    return this.store.select(LoadingState.isLoading);
  }

  startLoading(label: string): Observable<void> {
    return this.store.dispatch(new StartLoading(label));
  }

  stopLoading(label: string): Observable<void> {
    return this.store.dispatch(new StopLoading(label));
  }
}
