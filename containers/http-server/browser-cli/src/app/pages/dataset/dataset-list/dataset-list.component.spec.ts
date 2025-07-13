import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetListComponent } from './dataset-list.component';
import { DatasetCardComponent } from './dataset-card/dataset-card.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Dataset } from '@app/model/dataset';
import { provideHttpClient } from '@angular/common/http';
import { DatasetState } from '@app/shared/state/dataset/dataset.state';
import { NgxsModule } from '@ngxs/store';

describe('DatasetListComponent', () => {
  let component: DatasetListComponent;
  let fixture: ComponentFixture<DatasetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        DatasetCardComponent,
        DatasetListComponent,
        NgxsModule.forRoot([DatasetState]),
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dataset cards when datasetList is provided', () => {
    const testDatasets: Dataset[] = [
      {
        datasetId: 1,
        datasetName: 'Test Dataset 1',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
      },
      {
        datasetId: 2,
        datasetName: 'Test Dataset 2',
        startDate: '2023-02-01',
        endDate: '2023-02-28',
      },
    ];
    component.datasetList = testDatasets;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-dataset-card').length).toBe(2);
  });

  it('should not display dataset cards when datasetList is empty', () => {
    component.datasetList = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-dataset-card').length).toBe(0);
  });

  it('should not display dataset cards when datasetList is null', () => {
    component.datasetList = null;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-dataset-card').length).toBe(0);
  });
});
