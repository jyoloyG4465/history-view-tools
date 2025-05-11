import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetCardComponent } from './dataset-card/dataset-card.component';
import { CommonModule } from '@angular/common';
import { Dataset, putDatasetRenameRequest } from '@app/models/dataset.model';

@Component({
  selector: 'app-dataset-list',
  imports: [DatasetCardComponent, CommonModule],
  templateUrl: './dataset-list.component.html',
  styleUrl: './dataset-list.component.scss',
})
export class DatasetListComponent {
  constructor() {}

  @Input() datasetList: Dataset[] = [];

  @Output() updateEvent = new EventEmitter<putDatasetRenameRequest>();

  @Output() deleteEvent = new EventEmitter<number>();

  onUpdate(event: putDatasetRenameRequest) {
    this.updateEvent.emit(event);
  }

  onDelete(datasetId: number): void {
    this.deleteEvent.emit(datasetId);
  }
}
