import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisEditComponent } from './analysis-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { PulldownBoxComponent } from '@app/shared/pulldown-box/pulldown-box.component';
import { AnalysisStateFacade } from '../state/analysis.state.facade';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Dataset } from '@app/model/dataset';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

describe('AnalysisEditComponent', () => {
  let component: AnalysisEditComponent;
  let fixture: ComponentFixture<AnalysisEditComponent>;
  let mockAnalysisStateFacade: jasmine.SpyObj<AnalysisStateFacade>;
  let channelListSubject: BehaviorSubject<string[]>;

  beforeEach(async () => {
    channelListSubject = new BehaviorSubject<string[]>([]);
    mockAnalysisStateFacade = jasmine.createSpyObj('AnalysisStateFacade', ['fetchChannelList', 'getData'], {
      channelList: ['channel_mock_0', 'channel_mock_1'], // channelList プロパティをモック
      channelList$: channelListSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        PulldownBoxComponent,
        ButtonPrimaryComponent,
        CommonModule,
        AnalysisEditComponent, // Standalone Componentの場合
      ],
      providers: [
        { provide: AnalysisStateFacade, useValue: mockAnalysisStateFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update datasetOptions on datasetList change', () => {
    const testDatasetList: Dataset[] = [
      { datasetId: 1, datasetName: 'Dataset A', startDate: '2023-01-01', endDate: '2023-01-31' },
      { datasetId: 2, datasetName: 'Dataset B', startDate: '2023-02-01', endDate: '2023-02-28' },
    ];
    const changes: SimpleChanges = {
      datasetList: new SimpleChange(undefined, testDatasetList, true),
    };
    component.datasetList = testDatasetList;
    component.ngOnChanges(changes);
    expect(component.datasetOptions).toEqual([
      { label: 'Dataset A', value: 1 },
      { label: 'Dataset B', value: 2 },
    ]);
  });

  it('should update channelOptions on channelList change', () => {
    const testChannelList: string[] = ['Channel X', 'Channel Y'];
    const changes: SimpleChanges = {
      channelList: new SimpleChange(undefined, testChannelList, true),
    };
    component.channelList = testChannelList;
    component.ngOnChanges(changes);
    expect(component.channelOptions).toEqual([
      { label: 'Channel X', value: 0 },
      { label: 'Channel Y', value: 1 },
    ]);
  });

  it('should call fetchChannelList on onSelectDataset', () => {
    const mockEvent: MatSelectChange<any> = { value: 100, source: {} as any };
    component.onSelectDataset(mockEvent);
    expect(component.selectedDatasetId).toBe(100);
    expect(mockAnalysisStateFacade.fetchChannelList).toHaveBeenCalledWith(100);
  });

  it('should set selectedChannelId on onSelectChannel', () => {
    const mockEvent: MatSelectChange<any> = { value: 1, source: {} as any };
    component.onSelectChannel(mockEvent);
    expect(component.selectedChannelId).toBe(1);
  });

  it('should call getData and emit clickAnalysis on onAnalysisClick', () => {
    component.selectedDatasetId = 1;
    component.selectedChannelId = 0; // 'channel_mock_0' に対応

    spyOn(component.clickAnalysis, 'emit'); // EventEmitterのemitをスパイ

    component.onAnalysisClick();

    expect(mockAnalysisStateFacade.getData).toHaveBeenCalledWith(1, 'channel_mock_0');
    expect(component.clickAnalysis.emit).toHaveBeenCalledWith('analysis');
  });
});