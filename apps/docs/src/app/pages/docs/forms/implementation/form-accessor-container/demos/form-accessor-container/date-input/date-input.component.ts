import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormAccessor, createAccessorProviders } from '@ngx/forms';

@Component({
	selector: 'app-date-input',
	template: `
		<input type="date" [formControl]="form" (blur)="onTouch()" />
		Internal control touched: {{form.touched}}
	`,
	providers: [createAccessorProviders(DateInputComponent)],
	imports: [ReactiveFormsModule],
})
export class DateInputComponent extends FormAccessor<string, FormControl<string>> {
	initForm(): FormControl<string> {
		return new FormControl<string>(null);
	}
}
