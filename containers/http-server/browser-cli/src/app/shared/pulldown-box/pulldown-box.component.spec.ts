import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulldownBoxComponent } from './pulldown-box.component';

describe('PulldownBoxComponent', () => {
  let component: PulldownBoxComponent;
  let fixture: ComponentFixture<PulldownBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PulldownBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulldownBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
