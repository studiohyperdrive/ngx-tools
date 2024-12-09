import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormAccessor } from '@ngx/forms';

@Component({
	selector: 'custom-checkbox',
	template: `Custom: <input type="checkbox" [formControl]="form" />`,
	imports: [ReactiveFormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CustomCheckboxComponent),
			multi: true,
		},
	],
})
export class CustomCheckboxComponent extends FormAccessor<string, FormControl<string>> {
	initForm(): FormControl<string> {
		return new FormControl();
	}
}
