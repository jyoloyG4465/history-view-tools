import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetComponent } from './dataset.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';
import { BehaviorSubject } from 'rxjs';
import { Dataset } from '@app/model/dataset';
import { HttpClientModule } from '@angular/common/http';

describe('DatasetComponent', () => {
  let component: DatasetComponent;
  let fixture: ComponentFixture<DatasetComponent>;
  let mockDatasetStateFacade: jasmine.SpyObj<DatasetStateFacade>;
  let datasetsSubject: BehaviorSubject<Dataset[]>;

  beforeEach(async () => {
    datasetsSubject = new BehaviorSubject<Dataset[]>([]);
    mockDatasetStateFacade = jasmine.createSpyObj('DatasetStateFacade', [
      'fetchDatasetList',
    ]);
    Object.defineProperty(mockDatasetStateFacade, 'datasets$', {
      value: datasetsSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatProgressSpinnerModule,
        CommonModule,
        DatasetImportComponent,
        DatasetListComponent,
        DatasetComponent, // Standalone Componentの場合
        HttpClientModule, // これを追加
      ],
      providers: [
        { provide: DatasetStateFacade, useValue: mockDatasetStateFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInitをトリガー
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchDatasetList on ngOnInit', () => {
    expect(mockDatasetStateFacade.fetchDatasetList).toHaveBeenCalledTimes(1);
  });

  it('should expose datasetList$ from DatasetStateFacade', () => {
    const testDatasets: Dataset[] = [
      {
        datasetId: 1,
        datasetName: 'Test Dataset',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
      },
    ];
    datasetsSubject.next(testDatasets);
    fixture.detectChanges();
    component.datasetList$.subscribe((datasets) => {
      expect(datasets).toEqual(testDatasets);
    });
  });
});
