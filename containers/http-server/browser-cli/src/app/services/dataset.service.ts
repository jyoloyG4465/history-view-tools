import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetApiService {
  private baseUrl = 'http://localhost:8000/dataset';

  constructor(private http: HttpClient) {}

  getDatasetList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/list/`);
  }
}
