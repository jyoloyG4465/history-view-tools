import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetImportComponent } from './dataset-import.component';

describe('DatasetImportComponent', () => {
  let component: DatasetImportComponent;
  let fixture: ComponentFixture<DatasetImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
