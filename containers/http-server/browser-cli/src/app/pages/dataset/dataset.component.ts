import { Component, inject, OnInit } from '@angular/core';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { Dataset } from '@app/models/dataset.model';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';

@Component({
  selector: 'app-dataset',
  imports: [
    DatasetImportComponent,
    TranslateModule,
    MatProgressSpinnerModule,
    CommonModule,
    DatasetListComponent,
  ],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss',
})
export class DatasetComponent implements OnInit {
  private datasetStateFacade = inject(DatasetStateFacade);

  datasetList$: Observable<Dataset[]> = this.datasetStateFacade.datasets$;

  ngOnInit() {
    this.datasetStateFacade.fetchDatasetList();
  }
}
