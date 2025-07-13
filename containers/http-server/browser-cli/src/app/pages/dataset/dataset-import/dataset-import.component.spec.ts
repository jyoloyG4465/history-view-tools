import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetImportComponent } from './dataset-import.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatasetService } from '../dataset.service';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { LabelTextBoxComponent } from '@app/shared/input/label-text-box/label-text-box.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('DatasetImportComponent', () => {
  let component: DatasetImportComponent;
  let fixture: ComponentFixture<DatasetImportComponent>;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;
  let mockDatasetService: jasmine.SpyObj<DatasetService>;

  beforeEach(async () => {
    mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'instant',
      'get',
    ]);
    mockDatasetService = jasmine.createSpyObj('DatasetService', ['uploadFile']);
    mockTranslateService.get.and.callFake((key: string) => of(key)); // Observableを返す
    mockTranslateService.instant.and.callFake((key: string) => key);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ButtonPrimaryComponent,
        LabelTextBoxComponent,
        CommonModule,
        DatasetImportComponent, // Standalone Componentの場合
      ],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: DatasetService, useValue: mockDatasetService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatasetImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedFile and selectedFileName on onFileSelected', () => {
    const mockFile = new File([''], 'test.json', { type: 'application/json' });
    const mockEvt = { target: { files: [mockFile] } } as unknown as Event;
    component.onFileSelected(mockEvt);
    expect(component.selectedFile).toBe(mockFile);
    expect(component.selectedFileName).toBe('test.json');
  });

  it('should call alert if no file selected on uploadFile', () => {
    spyOn(window, 'alert'); // window.alertをスパイ
    mockTranslateService.instant.and.returnValue('please choice file'); // 翻訳サービスをモック
    component.selectedFile = undefined;
    component.uploadFile();
    expect(window.alert).toHaveBeenCalledWith('please choice file');
    expect(mockDatasetService.uploadFile).not.toHaveBeenCalled();
  });

  it('should call datasetService.uploadFile if file selected on uploadFile', () => {
    const mockFile = new File([''], 'test.json', { type: 'application/json' });
    component.selectedFile = mockFile;
    component.datasetName = 'test_dataset';
    component.uploadFile();
    expect(mockDatasetService.uploadFile).toHaveBeenCalledWith(
      mockFile,
      'test_dataset'
    );
  });

  it('should set datasetName on onValueConfirmed', () => {
    const testValue = 'new_dataset_name';
    component.onValueConfirmed(testValue);
    expect(component.datasetName).toBe(testValue);
  });

  it('should disable button when no file selected', () => {
    component.selectedFile = undefined;
    component.datasetName = 'test';
    expect(component.disabledButton).toBeTrue();
  });

  it('should disable button when no dataset name', () => {
    component.selectedFile = new File([''], 'test.json');
    component.datasetName = '';
    expect(component.disabledButton).toBeTrue();
  });

  it('should enable button when file selected and dataset name exists', () => {
    component.selectedFile = new File([''], 'test.json');
    component.datasetName = 'test';
    expect(component.disabledButton).toBeFalse();
  });
});
