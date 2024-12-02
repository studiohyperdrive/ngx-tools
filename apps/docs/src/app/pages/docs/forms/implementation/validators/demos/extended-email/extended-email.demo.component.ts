import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'extended-email-validator-demo',
	templateUrl: 'extended-email.demo.component.html',
})
export class ExtendedEmailValidatorDemoComponent {
	form = new FormGroup({
		email: new FormControl<string>('', [NgxValidators.extendedEmail]),
	});
}
