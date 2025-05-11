import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-label-text-box',
  imports: [FormsModule],
  templateUrl: './input-label-text-box.component.html',
  styleUrl: './input-label-text-box.component.scss',
})
export class InputLabelTextBoxComponent {
  inputValue: string = '';

  @Output() confirmedEvent = new EventEmitter<string>();

  onConfirm() {
    this.confirmedEvent.emit(this.inputValue);
  }
}
