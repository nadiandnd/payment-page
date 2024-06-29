import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { SubmitPayment, PaymentSuccess, PaymentFailure } from './payment.actions';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

export interface PaymentStateModel {
  loading: boolean;
  successMessage: string;
  invoice: string;
  errorMessage: string;
}

@State<PaymentStateModel>({
  name: 'payment',
  defaults: {
    loading: false,
    successMessage: '',
    invoice: '',
    errorMessage: '',
  }
})
@Injectable()
export class PaymentState {

  constructor(private paymentService: PaymentService, private router: Router) {}

  @Selector()
  static loading(state: PaymentStateModel) {
    return state.loading;
  }

  @Selector()
  static successMessage(state: PaymentStateModel) {
    return state.successMessage;
  }

  @Selector()
  static invoice(state: PaymentStateModel) {
    return state.invoice;
  }

  @Selector()
  static errorMessage(state: PaymentStateModel) {
    return state.errorMessage;
  }

  @Action(SubmitPayment)
  submitPayment(ctx: StateContext<PaymentStateModel>, { payload }: SubmitPayment) {
    ctx.patchState({ loading: true, errorMessage: '' });
    return this.paymentService.submitPayment(payload).pipe(
      tap((result) => {
        ctx.patchState({
          loading: false,
          successMessage: result.message,
          invoice: result.invoice,
          errorMessage: ''
        });
        this.router.navigate(['/success']);
      }),
      catchError((error) => {        
        ctx.patchState({
          loading: false,
          successMessage: '',
          invoice: '',
          errorMessage: (error.responseCode === '999') ? error.message : 'Payment Failed'
        });
        console.log(error)
        this.router.navigate(['/error']);
        return of(error);        
      })
    );
  }
}



    