import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormAccessor, FormAccessor } from 'forms';

@Component({
	selector: 'app-form-accessor',
	template: ` <ng-container [formGroup]="form">
		<p>Hello</p>
		<input formControlName="hello" type="text" />

		<p>World</p>
		<input formControlName="world" type="text" />
	</ng-container>`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormAccessorComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => FormAccessorComponent),
			multi: true,
		},
		{
			provide: BaseFormAccessor,
			useExisting: forwardRef(() => FormAccessorComponent),
		},
	],
})
export class FormAccessorComponent extends FormAccessor<any, any> {
	initForm() {
		return new FormGroup({
			hello: new FormControl(),
			world: new FormControl(),
		});
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.form.get('world').statusChanges.subscribe(console.log);
		this.form.get('hello').disable();
	}
}
