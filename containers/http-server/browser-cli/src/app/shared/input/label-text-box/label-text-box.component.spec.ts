import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTextBoxComponent } from './label-text-box.component';

describe('LabelTextBoxComponent', () => {
  let component: LabelTextBoxComponent;
  let fixture: ComponentFixture<LabelTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTextBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
