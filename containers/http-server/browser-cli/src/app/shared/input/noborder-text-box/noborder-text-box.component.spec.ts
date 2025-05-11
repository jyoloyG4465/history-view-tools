import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoborderTextBoxComponent } from './noborder-text-box.component';

describe('NoborderTextBoxComponent', () => {
  let component: NoborderTextBoxComponent;
  let fixture: ComponentFixture<NoborderTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoborderTextBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoborderTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
