import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxCookiesFallBackComponent } from '@ngx/cookies';

@Component({
    selector: 'app-cookie-alert',
    template: `You did not accept the cookie {{ cookies | json }}`,
    imports: [CommonModule]
})
export class CookieAlertComponent extends NgxCookiesFallBackComponent {}
