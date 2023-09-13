import { Component, forwardRef } from '@angular/core';
import {
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseFormAccessor, FormAccessor, NgxFormsErrorAbstractComponent } from '../../abstracts';
import { NgxFormsErrorsModule } from '../../ngx-forms-errors.module';

@Component({
	selector: 'kp-form-accessor',
	template: ` <ng-container [formGroup]="form">
		<p>Hello</p>
		<input *ngxErrors="'hello'" formControlName="hello" type="text" />

		<p>World</p>
		<input *ngxErrors="'world'" formControlName="world" type="text" />
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
			hello: new FormControl(null, [Validators.required, Validators.email]),
			world: new FormControl(null, Validators.minLength(3)),
		});
	}
}

@Component({
	selector: 'kp-error',
	template: `<p class="kp-error">{{ errors[0] }}</p>`,
})
export class FormErrorComponent extends NgxFormsErrorAbstractComponent {}

describe('NgxFormsErrorsDirective', () => {
	const errors = {
		required: 'Dit veld is verplicht',
		email: 'Dit veld is geen e-mail',
		minlength: 'Dit veld moet minstens 3 lang zijn',
	};
	describe('Without component', () => {
		let fixture: ComponentFixture<FormAccessorComponent>;

		beforeEach(() => {
			TestBed.configureTestingModule({
				declarations: [FormAccessorComponent],
				imports: [
					ReactiveFormsModule,
					NgxFormsErrorsModule.forRoot({ showWhen: 'dirty', errors }),
				],
			});

			fixture = TestBed.createComponent(FormAccessorComponent);

			try {
				fixture.detectChanges();
			} catch (error) {}
		});

		it('should not show the error as long as the control is pristine', () => {
			const errorElements = fixture.nativeElement.querySelectorAll('.ngx-forms-error');

			expect(errorElements.length).toBe(0);
		});

		it('should show the error when the control is dirty and invalid ', () => {
			fixture.componentRef.instance.form.get('hello').setValue('test');
			fixture.componentRef.instance.form.get('hello').markAsDirty();
			fixture.componentRef.instance.form.get('hello').updateValueAndValidity();
			fixture.detectChanges();
			const errorElements = fixture.nativeElement.querySelectorAll('.ngx-forms-error');

			expect(errorElements.length).toBe(1);
			expect(errorElements[0].textContent).toEqual(errors.email);
		});

		it('should not show the error when the control is dirty and valid', () => {
			fixture.componentRef.instance.form.get('hello').setValue('test@test.be');
			fixture.componentRef.instance.form.get('hello').markAsDirty();
			fixture.componentRef.instance.form.get('hello').updateValueAndValidity();
			fixture.detectChanges();
			const errorElements = fixture.nativeElement.querySelectorAll('.ngx-forms-error');

			expect(errorElements.length).toBe(0);
		});
	});

	describe('With component', () => {
		let fixture: ComponentFixture<FormAccessorComponent>;

		beforeEach(() => {
			TestBed.configureTestingModule({
				declarations: [FormAccessorComponent, FormErrorComponent],
				imports: [
					ReactiveFormsModule,
					NgxFormsErrorsModule.forRoot({
						showWhen: 'touched',
						errors,
						component: FormErrorComponent,
					}),
				],
			});

			fixture = TestBed.createComponent(FormAccessorComponent);

			try {
				fixture.detectChanges();
			} catch (error) {}
		});

		it('should not show the error as long as the control is pristine', () => {
			const errorElements = fixture.nativeElement.querySelectorAll('.kp-error');

			expect(errorElements.length).toBe(0);
		});

		it('should show the error when the control is touched and invalid ', () => {
			fixture.componentRef.instance.form.get('hello').markAsTouched();
			fixture.detectChanges();
			const errorElements = fixture.nativeElement.querySelectorAll('.kp-error');

			expect(errorElements.length).toBe(1);
			expect(errorElements[0].textContent).toEqual(errors.required);
		});

		it('should not show the error when the control is touched and valid', () => {
			fixture.componentRef.instance.form.get('hello').setValue('test@test.be');
			fixture.componentRef.instance.form.get('hello').markAsTouched();
			fixture.componentRef.instance.form.get('hello').updateValueAndValidity();
			fixture.detectChanges();
			const errorElements = fixture.nativeElement.querySelectorAll('.ngx-forms-error');

			expect(errorElements.length).toBe(0);
		});
	});
});
