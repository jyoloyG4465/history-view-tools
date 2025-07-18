import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NoborderTextBoxComponent } from '@app/shared/input/noborder-text-box/noborder-text-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatasetService } from '@pages/dataset/dataset.service';
import { Dataset } from '@app/model/dataset';

@Component({
  selector: 'app-dataset-card',
  imports: [
    MatCardModule,
    FormsModule,
    NoborderTextBoxComponent,
    TranslateModule,
  ],
  templateUrl: './dataset-card.component.html',
  styleUrl: './dataset-card.component.scss',
})
export class DatasetCardComponent {
  @Input() dataset!: Dataset;

  private datasetService = inject(DatasetService);

  onValueConfirmed(datasetName: string) {
    this.datasetService.putDatasetRename(this.dataset.datasetId, datasetName);
  }

  onDelete(): void {
    this.datasetService.deleteDataset(this.dataset.datasetId);
  }
}
