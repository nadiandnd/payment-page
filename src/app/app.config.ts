import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { PaymentState } from './store/payment.state';
import { environment } from './environments/environment';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { provideHttpClient } from '@angular/common/http';
import { PaymentService } from './services/payment.service';
import { MockPaymentService } from './services/mock-payment.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(NgxsModule.forRoot([PaymentState], {developmentMode: !environment.production})),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })),
    importProvidersFrom(NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    })),
    provideAnimationsAsync(),
    { provide: PaymentService, useClass: PaymentService }, // Uncomment to use PaymentService
    // { provide: PaymentService, useClass: MockPaymentService } // Uncomment to use MockPaymentService
  ]
};
