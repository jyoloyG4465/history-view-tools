import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLabelTextBoxComponent } from './input-label-text-box.component';

describe('InputLabelTextBoxComponent', () => {
  let component: InputLabelTextBoxComponent;
  let fixture: ComponentFixture<InputLabelTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLabelTextBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputLabelTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
