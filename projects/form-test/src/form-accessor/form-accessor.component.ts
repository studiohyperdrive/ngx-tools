import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	Validators,
} from '@angular/forms';
import { BaseFormAccessor, FormAccessor } from 'forms';

@Component({
	selector: 'app-form-accessor',
	template: ` <ng-container [formGroup]="form">
		<p>Hello</p>
		<input *ngxFormsErrors="'hello'" formControlName="hello" type="text" />

		<p>World</p>
		<input *ngxFormsErrors="'world'" formControlName="world" type="text" />

		<p>Date</p>
		<app-date-input *ngxFormsErrors="'date'" formControlName="date" />
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccessorComponent extends FormAccessor<any, any> {
	initForm() {
		return new FormGroup({
			hello: new FormControl(null, [Validators.required, Validators.email]),
			world: new FormControl(null, Validators.minLength(3)),
			date: new FormControl(null, Validators.required),
		});
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.form.get('world').statusChanges.subscribe(console.log);
	}
}
