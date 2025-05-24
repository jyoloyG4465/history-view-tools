import { Component, Input } from '@angular/core';
import { DatasetCardComponent } from './dataset-card/dataset-card.component';
import { CommonModule } from '@angular/common';
import { Dataset } from '@app/models/dataset.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dataset-list',
  imports: [DatasetCardComponent, CommonModule, TranslateModule],
  templateUrl: './dataset-list.component.html',
  styleUrl: './dataset-list.component.scss',
})
export class DatasetListComponent {
  @Input() datasetList: Dataset[] | null = [];
}
