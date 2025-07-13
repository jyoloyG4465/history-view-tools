import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DataPreparationComponent } from './data-preparation.component';

describe('DataPreparationComponent', () => {
  let component: DataPreparationComponent;
  let fixture: ComponentFixture<DataPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        DataPreparationComponent, // Standalone Componentの場合
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});