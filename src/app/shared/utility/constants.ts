export const CARD_SCHEME_ID_PATTERN = /^[0-9]+$/;
export const CARD_NUMBER_PATTERN = /^[0-9]+$/;
export const EXPIRY_PATTERN = /(0[1-9]|1[0-2])\/([0-9]{2})/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_PATTERN = /^[a-zA-Z\s]+$/;
export const PAYMENT_ERROR_MESSAGES = {
    required: () => 'This field is required.',
    invalidCardSchemeId: () => 'Invalid card scheme ID.',
    invalidCardNumber: () => 'Invalid card number.',
    invalidExpiry: () => 'Invalid expiry format (MM/YY).',
    maxLength: () => 'Exceeds maximum length.',
    invalidEmail: () => 'Invalid email format.',
    invalidName: () => 'Invalid name format'
} as { [key: string]: () => string };