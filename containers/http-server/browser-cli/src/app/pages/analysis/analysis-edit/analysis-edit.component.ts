import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { getChannelListResponse } from '@app/models/analysis.model';
import { Dataset } from '@app/models/dataset.model';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { PulldownBoxComponent } from '@app/shared/pulldown-box/pulldown-box.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis-edit',
  imports: [
    PulldownBoxComponent,
    CommonModule,
    TranslateModule,
    ButtonPrimaryComponent,
  ],
  templateUrl: './analysis-edit.component.html',
  styleUrl: './analysis-edit.component.scss',
})
export class AnalysisEditComponent implements OnChanges {
  @Input() datasetList: Dataset[] = [];

  @Input() channelList: getChannelListResponse | undefined;

  @Output() selectedDatasetEvent = new EventEmitter<number>();

  @Output() clickAnalysis = new EventEmitter<void>();

  datasetOptions: { label: string; value: number }[] = [];

  channelOptions: { label: string; value: number }[] = [];

  selectedDatasetId: number | null = null;

  analysisOptions: { label: string; value: number }[] = [
    { label: '月ごとの再生回数', value: 1 },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasetList']) {
      this.datasetOptions = this.datasetList.map((d) => {
        return { label: d.datasetName, value: d.datasetId };
      });
    }

    if (changes['channelList'] && this.channelList) {
      this.channelOptions = this.channelList?.data.map((d, index) => {
        return { label: d, value: index };
      });
    }
  }

  onAnalysisClick() {
    this.clickAnalysis.emit();
  }

  onSelectDataset(event: number) {
    this.selectedDatasetEvent.emit(event);
    this.selectedDatasetId = event;
  }
}
