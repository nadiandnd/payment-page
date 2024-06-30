import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() errorMessages: { [key: string]: () => string } = {};

  shouldShowErrors(): boolean {
    return !!this.control && !!this.control.errors && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) {
      return '';
    }

    const errorMessages = Object.keys(this.control.errors).map(errorKey => {
      const errorMessageFn = this.errorMessages[errorKey];
      return errorMessageFn ? errorMessageFn() : '';
    });

    return errorMessages.join(', ');
  }
}
