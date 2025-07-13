import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisGraphViewComponent } from './analysis-graph-view.component';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { BehaviorSubject } from 'rxjs';
import { AnalysisStateFacade } from '@pages/analysis/state/analysis.state.facade';
import { CommonModule } from '@angular/common';
import { GraphType } from '@pages/analysis/analysis.enum';
import { GraphData } from '@app/model/graphData';

describe('AnalysisGraphViewComponent', () => {
  let component: AnalysisGraphViewComponent;
  let fixture: ComponentFixture<AnalysisGraphViewComponent>;
  let mockAnalysisStateFacade: jasmine.SpyObj<AnalysisStateFacade>;
  let graphDataSubject: BehaviorSubject<GraphData[]>;
  let graphTypeSubject: BehaviorSubject<GraphType>;

  beforeEach(async () => {
    graphDataSubject = new BehaviorSubject<GraphData[]>([]);
    graphTypeSubject = new BehaviorSubject<GraphType>(GraphType.Line); // デフォルト値

    mockAnalysisStateFacade = jasmine.createSpyObj('AnalysisStateFacade', [], {
      graphData$: graphDataSubject.asObservable(),
      graphType$: graphTypeSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxEchartsModule, // forRoot() は不要、NGX_ECHARTS_CONFIG を直接提供
        AnalysisGraphViewComponent, // Standalone Componentの場合
      ],
      providers: [
        { provide: AnalysisStateFacade, useValue: mockAnalysisStateFacade },
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: { echarts: () => import('echarts') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chartOptions$ when graphData$ changes', (done) => {
    const testGraphData: GraphData[] = [
      { yearMonth: '2023-01', total: '100' },
      { yearMonth: '2023-02', total: '200' },
    ];
    graphDataSubject.next(testGraphData);
    fixture.detectChanges();

    component.chartOptions$.subscribe((options: any) => {
      expect(options.xAxis).toEqual({
        type: 'category',
        data: ['2023-01', '2023-02'],
      });
      expect(options.series && options.series[0].data).toEqual(['100', '200']); // ここも修正
      done();
    });
  });

  it('should update chartOptions$ when graphType$ changes to Bar', (done) => {
    const testGraphData: GraphData[] = [{ yearMonth: '2023-01', total: '100' }];
    graphDataSubject.next(testGraphData);
    graphTypeSubject.next(GraphType.VerticalBar);
    fixture.detectChanges();

    component.chartOptions$.subscribe((options: any) => {
      expect(options.series && options.series[0].type).toBe('verticalBar');
      done();
    });
  });

  it('should update chartOptions$ when graphType$ changes to HorizontalBar', (done) => {
    const testGraphData: GraphData[] = [{ yearMonth: '2023-01', total: '100' }];
    graphDataSubject.next(testGraphData);
    graphTypeSubject.next(GraphType.HorizontalBar);
    fixture.detectChanges();

    component.chartOptions$.subscribe((options: any) => {
      expect(options.series && options.series[0].type).toBe('horizonalBar');
      expect(options.xAxis).toEqual({ type: 'value' });
      expect(options.yAxis).toEqual({ type: 'category', data: ['2023-01'] });
      done();
    });
  });
});
