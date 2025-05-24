import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pulldown-box',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    CommonModule,
  ],
  templateUrl: './pulldown-box.component.html',
  styleUrl: './pulldown-box.component.scss',
})
export class PulldownBoxComponent {
  @Input() label: string = '';
  @Input() options: { label: string; value: number }[] | null = [];
  @Input() selectedValue: number | null = null;
  @Output() selectedValueChangeEvent = new EventEmitter<MatSelectChange<any>>();

  onChange(event: MatSelectChange<any>) {
    this.selectedValueChangeEvent.emit(event);
  }
}
