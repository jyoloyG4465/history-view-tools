import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pulldown-box',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    CommonModule,
    MatError,
  ],
  templateUrl: './pulldown-box.component.html',
  styleUrl: './pulldown-box.component.scss',
})
export class PulldownBoxComponent {
  @Input() label: string = '';
  @Input() options: { label: string; value: number }[] = [];
  @Input() selectedValue: any;
  @Output() selectedValueChangeEvent = new EventEmitter<any>();

  onChange(event: any) {
    this.selectedValueChangeEvent.emit(event.value);
  }
}
