import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ButtonPrimaryComponent,
        HomeComponent, // Standalone Componentの場合
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /data-preparation on onDataPrepareClick', () => {
    component.onDataPrepareClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/data-preparation']);
  });

  it('should navigate to /dataset on onDatasetClick', () => {
    component.onDatasetClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dataset']);
  });

  it('should navigate to /analysis on onAnalysisClick', () => {
    component.onAnalysisClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/analysis']);
  });
});