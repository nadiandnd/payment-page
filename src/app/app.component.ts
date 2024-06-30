import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./features/payment/header/header.component";
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, MatInputModule]
})
export class AppComponent {
  title: string = 'payment-page';
}
