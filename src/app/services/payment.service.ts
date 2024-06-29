import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  submitPayment(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment`, payload);
  }

  getCardList(): Observable<{ id: number, name: string }[]> {
    return this.http.get<{ id: number, name: string }[]>(`${this.apiUrl}/masterdata/cardschemes`);
  }
}
