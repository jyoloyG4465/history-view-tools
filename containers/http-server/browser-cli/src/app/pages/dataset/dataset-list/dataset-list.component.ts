import { Component, Input } from '@angular/core';
import { DatasetCardComponent } from './dataset-card/dataset-card.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Dataset } from '@app/model/dataset';

@Component({
  selector: 'app-dataset-list',
  imports: [DatasetCardComponent, CommonModule, TranslateModule],
  templateUrl: './dataset-list.component.html',
  styleUrl: './dataset-list.component.scss',
})
export class DatasetListComponent {
  @Input() datasetList: Dataset[] | null = [];
}
