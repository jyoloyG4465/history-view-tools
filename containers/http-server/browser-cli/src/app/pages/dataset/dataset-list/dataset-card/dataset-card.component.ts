import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Dataset, putDatasetRenameRequest } from '@app/models/dataset.model';
import { FormsModule } from '@angular/forms';
import { NoborderTextBoxComponent } from '@app/shared/input/noborder-text-box/noborder-text-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatasetService } from '../../dataset.service';

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

  @Output() updateEvent = new EventEmitter<putDatasetRenameRequest>();

  @Output() deleteEvent = new EventEmitter<number>();

  constructor() {}

  onValueConfirmed(value: string) {
    this.updateEvent.emit({
      datasetId: this.dataset.datasetId,
      datasetName: value,
    });
  }

  onDelete(): void {
    this.deleteEvent.emit(this.dataset.datasetId);
  }
}
