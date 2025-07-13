import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisComponent } from './analysis.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AnalysisEditComponent } from './analysis-edit/analysis-edit.component';
import { AnalysisGraphComponent } from './analysis-graph/analysis-graph.component';
import { DatasetStateFacade } from '@app/shared/state/dataset/dataset.state.facade';
import { AnalysisStateFacade } from './state/analysis.state.facade';
import { BehaviorSubject, of } from 'rxjs'; // BehaviorSubjectをインポート
import { Dataset } from '@app/model/dataset';
import { NgxEchartsModule } from 'ngx-echarts';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;
  let mockDatasetStateFacade: jasmine.SpyObj<DatasetStateFacade>;
  let mockAnalysisStateFacade: jasmine.SpyObj<AnalysisStateFacade>;

  // BehaviorSubjectのインスタンスを保持する変数
  let datasetsSubject: BehaviorSubject<Dataset[]>;
  let channelListSubject: BehaviorSubject<string[]>;

  beforeEach(async () => {
    // BehaviorSubjectを初期化
    datasetsSubject = new BehaviorSubject<Dataset[]>([]);
    channelListSubject = new BehaviorSubject<string[]>([]);

    mockDatasetStateFacade = jasmine.createSpyObj('DatasetStateFacade', [
      'fetchDatasetList',
    ]);
    // datasets$ プロパティに BehaviorSubject を割り当てる
    Object.defineProperty(mockDatasetStateFacade, 'datasets$', {
      value: datasetsSubject.asObservable(),
    });

    mockAnalysisStateFacade = jasmine.createSpyObj('AnalysisStateFacade', [
      'reset',
    ]);
    // channelList$ プロパティに BehaviorSubject を割り当てる
    Object.defineProperty(mockAnalysisStateFacade, 'channelList$', {
      value: channelListSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        CommonModule,
        AnalysisEditComponent,
        AnalysisGraphComponent,
        AnalysisComponent,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [
        { provide: DatasetStateFacade, useValue: mockDatasetStateFacade },
        { provide: AnalysisStateFacade, useValue: mockAnalysisStateFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchDatasetList on ngOnInit', () => {
    expect(mockDatasetStateFacade.fetchDatasetList).toHaveBeenCalledTimes(1);
  });

  it('should call analysisStateFacade.reset on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(mockAnalysisStateFacade.reset).toHaveBeenCalledTimes(1);
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

  it('should expose channelList$ from AnalysisStateFacade', () => {
    const testChannels: string[] = ['channel1', 'channel2'];
    channelListSubject.next(testChannels);
    fixture.detectChanges();
    component.channelList$.subscribe((channels) => {
      expect(channels).toEqual(testChannels);
    });
  });
});
