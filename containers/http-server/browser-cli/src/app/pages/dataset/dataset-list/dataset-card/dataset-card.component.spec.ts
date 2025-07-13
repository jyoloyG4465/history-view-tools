import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetCardComponent } from './dataset-card.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NoborderTextBoxComponent } from '@app/shared/input/noborder-text-box/noborder-text-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatasetService } from '@pages/dataset/dataset.service';
import { Dataset } from '@app/model/dataset';

describe('DatasetCardComponent', () => {
  let component: DatasetCardComponent;
  let fixture: ComponentFixture<DatasetCardComponent>;
  let mockDatasetService: jasmine.SpyObj<DatasetService>;

  beforeEach(async () => {
    mockDatasetService = jasmine.createSpyObj('DatasetService', ['putDatasetRename', 'deleteDataset']);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        FormsModule,
        NoborderTextBoxComponent,
        TranslateModule.forRoot(),
        DatasetCardComponent, // Standalone Componentの場合
      ],
      providers: [
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetCardComponent);
    component = fixture.componentInstance;
    // @Input() dataset を設定
    component.dataset = {
      datasetId: 1,
      datasetName: 'Test Dataset',
      startDate: '2023-01-01',
      endDate: '2023-01-31',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call putDatasetRename on onValueConfirmed', () => {
    const newDatasetName = 'Renamed Dataset';
    component.onValueConfirmed(newDatasetName);
    expect(mockDatasetService.putDatasetRename).toHaveBeenCalledWith(component.dataset.datasetId, newDatasetName);
  });

  it('should call deleteDataset on onDelete', () => {
    component.onDelete();
    expect(mockDatasetService.deleteDataset).toHaveBeenCalledWith(component.dataset.datasetId);
  });
});