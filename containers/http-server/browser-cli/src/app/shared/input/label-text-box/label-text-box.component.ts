import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-text-box',
  imports: [FormsModule],
  templateUrl: './label-text-box.component.html',
  styleUrl: './label-text-box.component.scss',
})
export class LabelTextBoxComponent {
  inputValue: string = '';

  @Output() confirmedEvent = new EventEmitter<string>();

  onConfirm() {
    this.confirmedEvent.emit(this.inputValue);
  }
}
