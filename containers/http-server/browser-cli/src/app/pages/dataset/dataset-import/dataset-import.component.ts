import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { LabelTextBoxComponent } from '@app/shared/input/label-text-box/label-text-box.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dataset-import',
  imports: [
    ButtonPrimaryComponent,
    LabelTextBoxComponent,
    CommonModule,
    TranslateModule,
  ],
  standalone: true,
  templateUrl: './dataset-import.component.html',
  styleUrl: './dataset-import.component.scss',
})
export class DatasetImportComponent {
  @Output() uploadFileEvent = new EventEmitter<FormData>();

  selectedFile: File | undefined = undefined;

  selectedFileName: string = '';

  datasetName: string = '';

  get disabledButton(): boolean {
    return !this.selectedFile || !this.datasetName;
  }

  private translate = inject(TranslateService);

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = input.files[0].name;
    }
  }

  async uploadFile(): Promise<void> {
    if (!this.selectedFile) {
      alert(this.translate.instant('please choice file'));
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('datasetName', this.datasetName);

    this.uploadFileEvent.emit(formData);
  }

  onValueConfirmed(value: string) {
    this.datasetName = value;
  }
}
