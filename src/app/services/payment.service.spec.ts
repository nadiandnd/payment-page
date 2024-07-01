import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { mockResp } from './mock-payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [        
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch card list', () => {  

    service.getCardList().subscribe(cards => {
      expect(cards.length).toBe(6);
      expect(cards).toEqual(mockResp);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/masterdata/cardschemes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResp);
  });

  it('should submit payment', () => {
    const mockPayload = {
      cardSchemeId: 1,
      cardNumber: '4111111111111111',
      expiry: '12/34',
      name: 'Name Test',
      email: 'test@example.com'
    };
    const mockResponse = { success: true };

    service.submitPayment(mockPayload).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/payment`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });
});
