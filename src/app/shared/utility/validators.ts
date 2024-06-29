import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CARD_SCHEME_ID_PATTERN, CARD_NUMBER_PATTERN, EXPIRY_PATTERN, EMAIL_PATTERN, NAME_PATTERN } from './constants';

export const PaymentFormValidators = {
  cardSchemeId: ((control: AbstractControl) => {
    return !CARD_SCHEME_ID_PATTERN.test(control?.value ?? '')
      ? { invalidCardSchemeId: true }
      : null;
  }) as ValidatorFn,  
  cardNumber: ((control: AbstractControl) => {
    const value = control?.value?.toString() ?? '';
    const isValid = CARD_NUMBER_PATTERN.test(value) && value.length >= 15 && value.length <= 16;

    return !isValid ? { invalidCardNumber: true } : null;
  }) as ValidatorFn,
  expiry: ((control: AbstractControl) => {
    return !EXPIRY_PATTERN.test(control?.value ?? '')
      ? { invalidExpiry: true }
      : null;
  }) as ValidatorFn,
  maxLength: (max: number): ValidatorFn => 
    (control: AbstractControl) => {
      const value = control?.value?.toString() ?? '';

      return value.length > max ? { maxLength: true } : null;
    },
  email: ((control: AbstractControl) => {
    const value = control?.value?.toString() ?? '';
    
    return value && !EMAIL_PATTERN.test(value) ? { invalidEmail: true } : null;
  }) as ValidatorFn,
  name: ((control: AbstractControl) => {
    const value = control?.value?.toString() ?? '';

    return !NAME_PATTERN.test(value) ? { invalidName: true } : null;
  }) as ValidatorFn
};
