import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noborder-text-box',
  imports: [FormsModule],
  templateUrl: './noborder-text-box.component.html',
  styleUrl: './noborder-text-box.component.scss',
})
export class NoborderTextBoxComponent {
  @Input() text: string = '';

  @Output() confirmedEvent = new EventEmitter<string>();

  onConfirm() {
    this.confirmedEvent.emit(this.text);
  }
}
