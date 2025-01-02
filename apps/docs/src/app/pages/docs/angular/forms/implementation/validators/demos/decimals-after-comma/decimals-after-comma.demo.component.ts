import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxValidators } from '@ngx/forms';

@Component({
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'decimals-after-comma-validator-demo',
	templateUrl: 'decimals-after-comma.demo.component.html',
})
export class DecimalsAfterCommaValidatorDemoComponent {
	form = new FormGroup({
		number: new FormControl<number | undefined>(undefined, [
			NgxValidators.decimalsAfterComma(2),
		]),
	});
}
