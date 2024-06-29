export function filterAndMapCardSchemes(cardSchemes: { id: number, name: string }[]): { id: number, name: string }[] {
    const validSchemes = ['visa', 'mastercard', 'jcb', 'amex'];
  
    return cardSchemes
      .filter(scheme => validSchemes.includes(scheme.name.toLowerCase()))
      .map(scheme => {
        switch (scheme.name.toLowerCase()) {
          case 'visa':
            return { ...scheme, name: 'Visa' };
          case 'mastercard':
            return { ...scheme, name: 'MasterCard' };
          case 'jcb':
            return { ...scheme, name: 'JCB' };
          case 'amex':
            return { ...scheme, name: 'Amex' };
          default:
            return scheme;
        }
      });
  }