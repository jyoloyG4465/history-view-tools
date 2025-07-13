import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisGraphComponent } from './analysis-graph.component';
import { AnalysisGraphViewComponent } from './analysis-graph-view/analysis-graph-view.component';
import { AnalysisGraphSettingsComponent } from './analysis-graph-settings/analysis-graph-settings.component';
import { CommonModule } from '@angular/common';

describe('AnalysisGraphComponent', () => {
  let component: AnalysisGraphComponent;
  let fixture: ComponentFixture<AnalysisGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AnalysisGraphViewComponent,
        AnalysisGraphSettingsComponent,
        CommonModule,
        AnalysisGraphComponent, // Standalone Componentの場合
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});