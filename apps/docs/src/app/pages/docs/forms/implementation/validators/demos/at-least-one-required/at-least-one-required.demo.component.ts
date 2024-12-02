import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'at-least-one-required-validator-demo',
	templateUrl: 'at-least-one-required.demo.component.html',
})
export class AtLeastOneRequiredValidatorDemoComponent {
	public form = new FormGroup(
		{
			email: new FormControl(''),
			name: new FormControl(''),
		},
		[NgxValidators.atLeastOneRequired()]
	);
}
