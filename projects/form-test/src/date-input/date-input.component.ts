import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormAccessor } from 'projects/forms/src/lib/abstracts/form/form.accessor';
import { createAccessorProviders } from 'projects/forms/src/public-api';

@Component({
	selector: 'app-date-input',
	templateUrl: './date-input.component.html',
	providers: [createAccessorProviders(DateInputComponent)],
})
export class DateInputComponent extends FormAccessor<string, FormControl<string>> {
	initForm(): FormControl<string> {
		return new FormControl<string>(null);
	}
}
