import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() content: any;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  closeModal() {
    this.close.emit();
  }

  isObject(val: any): boolean {
    return typeof val === 'object' && !Array.isArray(val);
  }

  formatContent(content: any): string {
    if (this.isObject(content)) {
      return Object.keys(content).map(key => {
        const value = content[key];
        if (value !== null && value !== undefined && key !== 'newValue' && key !== 'appUpdaterConfig') {
          if (this.isObject(value)) {
            return `<div><strong>${key}:</strong> ${this.formatContent(value)}</div>`;
          } else {
            return `<div><strong>${key}:</strong> ${this.replaceSpecialChars(value)}</div>`;
          }
        }
        return '';
      }).join('');
    } else if (Array.isArray(content)) {
      return `<ul>${content.map(item => `<li>${this.formatContent(item)}</li>`).join('')}</ul>`;
    } else {
      return this.replaceSpecialChars(content);
    }
  }

  replaceSpecialChars(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    return value
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  }
}
