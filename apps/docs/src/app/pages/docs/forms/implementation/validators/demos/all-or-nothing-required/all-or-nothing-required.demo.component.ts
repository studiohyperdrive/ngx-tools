import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'all-or-nothing-required-validator-demo',
	templateUrl: 'all-or-nothing-required.demo.component.html',
})
export class AllOrNothingRequiredValidatorDemoComponent implements OnInit {
	public form = new FormGroup(
		{
			firstName: new FormControl<string>(''),
			lastName: new FormControl<string>(''),
			email: new FormControl<string>(''),
		},
		[NgxValidators.allOrNothingRequired as ValidatorFn]
	);
	constructor() {}

	ngOnInit() {}
}
