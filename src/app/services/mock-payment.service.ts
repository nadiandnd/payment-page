import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockPaymentService {

  submitPayment(payload: any): Observable<any> {
    if (payload.cardSchemeId !== 3) {
      return of({
        message: 'Payment Successful',
        responseCode: '000',
        invoice: 'ABCD1234'
      }).pipe(delay(1000));
    } else {
      return throwError(() => ({
        message: 'Invalid payment detail.',
        responseCode: '999'
      })).pipe(delay(1000));
    }
  }

  getCardList(): Observable<{ id: number, name: string }[]> {
    return of(mockResp);
  }
}

const mockResp = [{"id":1,"name":"visa"},{"id":2,"name":"mastercard"},{"id":3,"name":"jcb"},{"id":4,"name":"upi"},{"id":5,"name":"amex"},{"id":6,"name":"dci"}];