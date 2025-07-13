import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisGraphSettingsComponent } from './analysis-graph-settings.component';
import { AnalysisStateFacade } from '@pages/analysis/state/analysis.state.facade';
import { GraphType } from '@pages/analysis/analysis.enum';

describe('AnalysisGraphSettingsComponent', () => {
  let component: AnalysisGraphSettingsComponent;
  let fixture: ComponentFixture<AnalysisGraphSettingsComponent>;
  let mockAnalysisStateFacade: jasmine.SpyObj<AnalysisStateFacade>;

  beforeEach(async () => {
    mockAnalysisStateFacade = jasmine.createSpyObj('AnalysisStateFacade', ['setGraphType']);

    await TestBed.configureTestingModule({
      imports: [
        AnalysisGraphSettingsComponent, // Standalone Componentの場合
      ],
      providers: [
        { provide: AnalysisStateFacade, useValue: mockAnalysisStateFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisGraphSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setGraphType on onClickImage', () => {
    const graphType = GraphType.Line;
    component.onClickImage(graphType);
    expect(mockAnalysisStateFacade.setGraphType).toHaveBeenCalledWith(graphType);
  });
});