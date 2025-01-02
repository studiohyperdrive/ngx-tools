import { Component } from '@angular/core';
import { NgxDisplayContentComponent } from '@ngx/layout';

@Component({
	selector: 'app-error',
	standalone: true,
	template: 'Something went wrong: {{data}}',
})
export class DisplayContentErrorComponent extends NgxDisplayContentComponent {}
