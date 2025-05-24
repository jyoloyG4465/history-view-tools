import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { PulldownBoxComponent } from '@app/shared/pulldown-box/pulldown-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnalysisStateFacade } from '../state/analysis.state.facade';
import { MatSelectChange } from '@angular/material/select';
import { Dataset } from '@app/model/dataset';

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

  @Input() channelList: string[] | null = [];

  @Output() clickAnalysis = new EventEmitter<string>();

  private analysisStateFacade = inject(AnalysisStateFacade);

  protected datasetOptions: { label: string; value: number }[] = [];

  protected channelOptions: { label: string; value: number }[] = [];

  protected analysisOptions: { label: string; value: number }[] = [
    { label: '月ごとの再生回数', value: 0 },
  ];

  protected selectedDatasetId: number = 0;

  protected selectedChannelId: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasetList']) {
      this.datasetOptions = this.datasetList.map((d) => {
        return { label: d.datasetName, value: d.datasetId };
      });
    }

    if (changes['channelList'] && this.channelList) {
      this.channelOptions = this.channelList.map((d, index) => {
        return { label: d, value: index };
      });
    }
  }

  onSelectDataset(event: MatSelectChange<any>) {
    this.selectedDatasetId = event.value;
    this.analysisStateFacade.fetchChannelList(this.selectedDatasetId);
  }

  onSelectChannel(event: MatSelectChange<any>) {
    this.selectedChannelId = event.value;
  }

  onAnalysisClick() {
    const channelName =
      this.analysisStateFacade.channelList[this.selectedChannelId];
    this.analysisStateFacade.getData(this.selectedDatasetId, channelName);
  }
}
