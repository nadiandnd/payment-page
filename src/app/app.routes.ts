import { Routes } from '@angular/router';
import { SuccessComponent } from './features/payment/success/success.component';
import { ErrorComponent } from './features/payment/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/payment', pathMatch: 'full' },
    {
        path: 'payment',
        loadComponent: () => 
            import('./features/payment/payment.component').then(m => m.PaymentComponent)
    },
    { path: 'success', component: SuccessComponent },
    { path: 'error', component: ErrorComponent}
];
