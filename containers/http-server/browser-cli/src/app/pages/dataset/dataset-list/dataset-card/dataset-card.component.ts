import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Dataset, putDatasetRenameRequest } from '@app/models/dataset.model';
import { FormsModule } from '@angular/forms';
import { NoborderTextBoxComponent } from '@app/shared/input/noborder-text-box/noborder-text-box.component';
import { DatasetApiService } from '@app/services/dataset.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
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

  constructor(private datasetService: DatasetService) {}

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
