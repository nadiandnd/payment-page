import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PaymentState } from '../../../store/payment.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  message$: Observable<string> = inject(Store).select(PaymentState.successMessage);
  invoice$: Observable<string> = inject(Store).select(PaymentState.invoice);
}
