import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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

  @Output() selectedDatasetEvent = new EventEmitter<number>();

  datasetOptions: { label: string; value: number }[] = [];

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
  }

  onAnalysisClick() {
    console.log(1);
  }

  onSample(event: number) {
    // this.selectedDatasetEvent.emit(event);
    this.selectedDatasetId = event;
  }
}
