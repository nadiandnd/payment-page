import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SubmitPayment } from '../../store/payment.actions';
import { PaymentService } from '../../services/payment.service';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { PaymentFormValidators } from '../../shared/utility/validators';
import { filterAndMapCardSchemes } from '../../shared/utility/card-scheme-mapper';
import { FormErrorComponent } from "../../shared/component/form-error/form-error.component";
import { PAYMENT_ERROR_MESSAGES } from '../../shared/utility/constants';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-payment',
    standalone: true,
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
    imports: [
      ReactiveFormsModule, 
      FormErrorComponent,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule
    ]
})
export class PaymentComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private store = inject(Store);
  private paymentService = inject(PaymentService);
  public cardListDropdown:{ id: number, name: string }[] = [];
  public paymentForm = this.fb.group({
    cardSchemeId: ['', [Validators.required, PaymentFormValidators.cardSchemeId]],
    cardNumber: ['', [Validators.required, PaymentFormValidators.cardNumber]],
    expiry: ['', [Validators.required, PaymentFormValidators.expiry]],
    name: ['', [Validators.required, PaymentFormValidators.name, PaymentFormValidators.maxLength(30)]],
    email: ['', [PaymentFormValidators.email, PaymentFormValidators.maxLength(50)]]
  });
  public PAYMENT_ERROR_MESSAGES = PAYMENT_ERROR_MESSAGES;
  private notifier = new Subject(); 

  ngOnInit(): void {
    this.paymentService.getCardList().pipe(
      takeUntil(this.notifier),
      map(data => filterAndMapCardSchemes(data)),
      tap(data => {
        this.cardListDropdown = data;
      })
    ).subscribe();
    this.checkValidCardNumber();   
  }

  checkValidCardNumber() {
    this.paymentForm.get('cardSchemeId')?.valueChanges.subscribe(value => {           
      const cardNumberControl = this.paymentForm.get('cardNumber');
      if (cardNumberControl) {
        cardNumberControl.clearValidators();
        cardNumberControl.setValidators([Validators.required, PaymentFormValidators.cardNumberLength(value || ''), PaymentFormValidators.cardNumber]);
        cardNumberControl.updateValueAndValidity(); 
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) { 
      const formData = { ...this.paymentForm.value, cardSchemeId: parseInt(this.paymentForm.value.cardSchemeId as string, 10) };
      this.store.dispatch(new SubmitPayment(formData));       
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }  

  get cardSchemeIdControl(): AbstractControl | null {
    return this.paymentForm.get('cardSchemeId');
  }
  
  get cardNumberControl(): AbstractControl | null {
    return this.paymentForm.get('cardNumber');
  }
  
  get expiryControl(): AbstractControl | null {
    return this.paymentForm.get('expiry');
  }
  
  get nameControl(): AbstractControl | null {
    return this.paymentForm.get('name');
  }
  
  get emailControl(): AbstractControl | null {
    return this.paymentForm.get('email');
  }  

  ngOnDestroy(): void {    
    this.notifier.complete();
  }

}
