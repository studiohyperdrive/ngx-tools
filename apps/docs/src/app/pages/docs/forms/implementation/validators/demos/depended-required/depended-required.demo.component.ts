import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'depended-required-validator-demo',
	templateUrl: 'depended-required.demo.component.html',
})
export class DependedRequiredValidatorDemoComponent implements OnInit {
	shouldBeTest(value: any) {
		return value === 'TEST';
	}

	form = new FormGroup(
		{
			controlA: new FormControl(''),
			controlB: new FormControl(''),
			controlC: new FormControl(''),
		},
		NgxValidators.dependedRequired(['controlB', 'controlC'], 'controlA')
	);

	formWithMatchValue = new FormGroup(
		{
			controlA: new FormControl(''),
			controlB: new FormControl(''),
			controlC: new FormControl(''),
		},
		NgxValidators.dependedRequired(['controlB', 'controlC'], 'controlA', this.shouldBeTest)
	);

	ngOnInit() {}
}
