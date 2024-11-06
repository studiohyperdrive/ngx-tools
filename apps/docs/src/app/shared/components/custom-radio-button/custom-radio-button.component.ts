import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormAccessor } from '@ngx/forms';

@Component({
	selector: 'custom-radio-button',
	standalone: true,
	template: `Custom: <input type="radio" [formControl]="form" />`,
	imports: [ReactiveFormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CustomRadioButtonComponent),
			multi: true,
		},
	],
})
export class CustomRadioButtonComponent extends FormAccessor<string, FormControl<string>> {
	initForm(): FormControl<string> {
		return new FormControl();
	}
}
