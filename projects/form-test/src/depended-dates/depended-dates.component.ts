import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms';
import { DependedDatesValidator } from './depended-dates.validator';
import { BaseFormAccessor } from 'projects/forms/src/lib/abstracts/base-form/base-form.accessor';
import { FormAccessor } from 'projects/forms/src/lib/abstracts/form/form.accessor';

@Component({
	selector: 'app-depended-dates',
	templateUrl: './depended-dates.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DependedDatesComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => DependedDatesComponent),
			multi: true,
		},
		{
			provide: BaseFormAccessor,
			useExisting: forwardRef(() => DependedDatesComponent),
		},
	],
})
export class DependedDatesComponent extends FormAccessor<any, FormGroup<any>> {
	initForm(): FormGroup<any> {
		return new FormGroup(
			{
				hello: new FormGroup({
					start: new FormControl(''),
					end: new FormControl(''),
				}),
				world: new FormGroup({
					start: new FormControl(''),
					end: new FormControl(''),
				}),
			},
			DependedDatesValidator
		);
	}
}
