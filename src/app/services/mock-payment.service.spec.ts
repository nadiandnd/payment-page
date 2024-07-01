import { TestBed } from '@angular/core/testing';

import { MockPaymentService } from './mock-payment.service';

describe('MockPaymentService', () => {
  let service: MockPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should submit payment successfully', () => {
    const mockPayload = {
      cardSchemeId: 1,
      cardNumber: '1234567890123456',
      expiry: '12/23',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    service.submitPayment(mockPayload).subscribe({
      next: (response) => {
        expect(response.message).toEqual('Payment Successful');
        expect(response.responseCode).toEqual('000');
        expect(response.invoice).toBeDefined();
      },
      error: (error) => {
        fail('Should not have thrown an error');
      }
    });
    
  });

  it('should handle payment submission error', () => {
    const mockPayload = {
      cardSchemeId: 3,
      cardNumber: '1234567890123456',
      expiry: '12/23',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    service.submitPayment(mockPayload).subscribe({
      next: (response) => {
        fail('Expected error response, but got success response');
      },
      error: (error) => {
        expect(error.message).toEqual('Invalid payment detail.');
        expect(error.responseCode).toEqual('999');
      }
    });
  });

  it('should get card list successfully', () => {
    service.getCardList().subscribe({
      next: (cardList) => {
        expect(cardList.length).toBe(4);
      },
      error: (error) => {
        fail('Should not have thrown an error');
      }
    });
  });
});
