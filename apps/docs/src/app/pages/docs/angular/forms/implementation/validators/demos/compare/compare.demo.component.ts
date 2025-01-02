import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'compare-demo',
	templateUrl: 'compare.demo.component.html',
})
export class CompareValidatorDemoComponent {
	//TODO: Fix typescript error when not using 'as ValidatorFn'
	form = new FormGroup(
		{
			controlA: new FormControl<number | null>(null),
			controlB: new FormControl<number | null>(null),
		},
		[
			NgxValidators.compareValidator<number>(
				['controlA', 'controlB'],
				(a: number, b: number) => a > b
			) as ValidatorFn,
		]
	);
}
