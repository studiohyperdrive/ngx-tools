import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { BaseFormAccessor } from 'projects/forms/src/lib/abstracts/base-form/base-form.accessor';
import { FormAccessor } from 'projects/forms/src/lib/abstracts/form/form.accessor';

@Component({
	selector: 'app-date-input',
	templateUrl: './date-input.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
		{
			provide: BaseFormAccessor,
			useExisting: forwardRef(() => DateInputComponent),
		},
	],
})
export class DateInputComponent extends FormAccessor<string, FormControl<string>> {
	initForm(): FormControl<string> {
		return new FormControl<string>(null);
	}
}
