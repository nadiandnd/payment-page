import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { NgxsModule, Store } from '@ngxs/store';
import { PaymentState } from '../../store/payment.state';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { SubmitPayment } from '../../store/payment.actions';
import { PAYMENT_ERROR_MESSAGES } from '../../shared/utility/constants';
import { of } from 'rxjs';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let paymentService: jasmine.SpyObj<PaymentService>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaymentComponent, 
        NgxsModule.forRoot([PaymentState]), 
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [        
        provideHttpClient(),
        provideHttpClientTesting(),
        FormBuilder,        
        { provide: PaymentService, useValue: jasmine.createSpyObj('PaymentService', ['getCardList']) },
        Store
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    paymentService = TestBed.inject(PaymentService) as jasmine.SpyObj<PaymentService>;;
    paymentService.getCardList.and.returnValue(of([{ id: 1, name: 'Visa' }]));
    store = TestBed.inject(Store)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.paymentForm).toBeTruthy();   
  });

  it('should load card list on init', () => {    
    component.ngOnInit();
    expect(paymentService.getCardList).toHaveBeenCalled();
    expect(component.cardListDropdown.length).toBe(1);
    expect(component.cardListDropdown[0].name).toBe('Visa');
  });

  it('should dispatch SubmitPayment action on valid form submission', () => {
    spyOn(store, 'dispatch');
    component.paymentForm.setValue({
      cardSchemeId: '1',
      cardNumber: '4111111111111111',
      expiry: '12/34',
      name: 'Name Test',
      email: 'test@example.com'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(new SubmitPayment({
      cardSchemeId: 1,
      cardNumber: '4111111111111111',
      expiry: '12/34',
      name: 'Name Test',
      email: 'test@example.com'
    }));
  });

  it('should mark all controls as touched on invalid form submission', () => {
    spyOn(component.paymentForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.paymentForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should have the correct error messages', () => {
    expect(component.PAYMENT_ERROR_MESSAGES).toEqual(PAYMENT_ERROR_MESSAGES);
  });

  it('should get the correct form controls', () => {
    expect(component.cardSchemeIdControl).toBe(component.paymentForm.get('cardSchemeId'));
    expect(component.cardNumberControl).toBe(component.paymentForm.get('cardNumber'));
    expect(component.expiryControl).toBe(component.paymentForm.get('expiry'));
    expect(component.nameControl).toBe(component.paymentForm.get('name'));
    expect(component.emailControl).toBe(component.paymentForm.get('email'));
  });

  it('should update cardNumber validator based on cardSchemeId changes', () => {
    const cardSchemeIdControl = component.paymentForm.get('cardSchemeId');
    const cardNumberControl = component.paymentForm.get('cardNumber');

    cardSchemeIdControl?.setValue('4'); // Amex
    component.checkValidCardNumber();

    // Test Amex (15 digits)
    cardNumberControl?.setValue('123456789012345');
    expect(cardNumberControl?.valid).toBe(true);

    cardNumberControl?.setValue('12345678901234');
    expect(cardNumberControl?.valid).toBe(false);

    // Change card scheme to Visa/Mastercard (16 digits)
    cardSchemeIdControl?.setValue('1'); // Visa
    fixture.detectChanges();

    cardNumberControl?.setValue('1234567890123456');
    expect(cardNumberControl?.valid).toBe(true);

    cardNumberControl?.setValue('123456789012345');
    expect(cardNumberControl?.valid).toBe(false);
  });
});
