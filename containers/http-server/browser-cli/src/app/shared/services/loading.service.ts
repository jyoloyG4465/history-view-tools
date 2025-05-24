import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingMap = new Map<string, number>();
  private loadingSubject = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  start(key: string) {
    const current = this.loadingMap.get(key) ?? 0;
    this.loadingMap.set(key, current + 1);
    this.update();
  }

  stop(key: string) {
    const current = this.loadingMap.get(key) ?? 0;
    if (current <= 1) {
      this.loadingMap.delete(key);
    } else {
      this.loadingMap.set(key, current - 1);
    }
    this.update();
  }

  private update() {
    const isLoading = this.loadingMap.size > 0;
    this.loadingSubject.next(isLoading);
  }
}
