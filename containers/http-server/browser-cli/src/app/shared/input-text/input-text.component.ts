import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  inputValue: string = '';

  @Output() confirmedEvent = new EventEmitter<string>();

  onConfirm() {
    this.confirmedEvent.emit(this.inputValue);
  }
}
