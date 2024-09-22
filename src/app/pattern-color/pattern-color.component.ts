import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pattern-color',
  standalone: true,
  imports: [ColorPickerModule, FormsModule, MatIconModule],
  templateUrl: './pattern-color.component.html',
  styleUrl: './pattern-color.component.scss'
})
export class PatternColorComponent {
  @Input() color: string = 'red';

  @Output() colorChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  updateColor(color: string) {
    this.color = color;
    this.colorChange.emit(color);
  }

  deleteColor(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit();
  }
}
