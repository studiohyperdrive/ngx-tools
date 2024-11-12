import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'compare-demo',
	templateUrl: 'compare.demo.component.html',
})
export class CompareValidatorDemoComponent {
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
