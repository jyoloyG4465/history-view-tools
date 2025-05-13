import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisEditComponent } from './analysis-edit.component';

describe('AnalysisEditComponent', () => {
  let component: AnalysisEditComponent;
  let fixture: ComponentFixture<AnalysisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
