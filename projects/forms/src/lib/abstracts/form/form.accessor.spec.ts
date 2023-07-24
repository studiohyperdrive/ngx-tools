import { ChangeDetectorRef, Component, forwardRef, Injector } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
	ControlContainer,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { FormAccessor } from './form.accessor';

describe('FormAccessor', () => {
	@Component({
		selector: 'forms-component',
		template: '',
		providers: [
			{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => TestComponent),
				multi: true,
			},
		],
	})
	class TestComponent extends FormAccessor<
		{ name: string },
		FormGroup<{ name: FormControl<string> }>
	> {
		constructor(cdRef: ChangeDetectorRef) {
			super(cdRef);
		}

		initForm() {
			return new FormGroup({
				name: new FormControl('', Validators.required),
			});
		}
	}

	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	beforeEach(() => {
		const testBed = TestBed.configureTestingModule({
			declarations: [TestComponent],
			imports: [ReactiveFormsModule],
			providers: [ControlContainer],
		});

		fixture = testBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		(component as any).onChange = jasmine.createSpy();
	});

	describe('writeValue', () => {
		it('should not call the `onChange` method when the writeValue is called', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();
			component.writeValue({ name: 'test' });

			expect(component.form.value).toEqual({ name: 'test' });
			expect((component as any).onChange).not.toHaveBeenCalled();
		}));
	});

	describe('setDisabledState', () => {
		it('should not call the `onChange` method when setDisabledState is called', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.setDisabledState(false);

			expect((component as any).onChange).not.toHaveBeenCalled();
		}));
	});

	describe('onChange', () => {
		it('should call the `onChange` if the form gets changed', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.form.patchValue({ name: 'test' });

			expect((component as any).onChange).toHaveBeenCalledWith({ name: 'test' });
		}));
	});

	describe('markAsTouched/markAsPristine', () => {
		it('should set the form and its controls to touched when markAsTouched has been called', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.markAsTouched();

			expect(component.form.touched).toBe(true);
			expect(component.form.get('name').touched).toBe(true);
		}));
	});

	describe('validate', () => {
		it('should call the `validate` method with the correct output when the form is valid', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.form.patchValue({ name: 'test' });

			expect(component.validate()).toEqual(null);
		}));

		it('should call the `validate` method with the correct output when the form is invalid', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			expect(component.validate()).toEqual({ invalidForm: true });
		}));
	});
});

describe('FormAccessor with mappers', () => {
	@Component({
		selector: 'forms-component',
		template: '',
		providers: [
			{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => TestComponent),
				multi: true,
			},
		],
	})
	class TestComponent extends FormAccessor<
		string,
		FormGroup<{ name: FormControl<string> }>,
		{ name: string }
	> {
		constructor(injector: Injector, cdRef: ChangeDetectorRef) {
			super(cdRef);
		}

		initForm() {
			return new FormGroup({
				name: new FormControl(''),
			});
		}

		onWriteValueMapper(name: string) {
			return { name };
		}

		onChangeMapper({ name }: { name: string }) {
			return name;
		}
	}

	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	beforeEach(() => {
		const testBed = TestBed.configureTestingModule({
			declarations: [TestComponent],
			imports: [ReactiveFormsModule],
			providers: [ControlContainer],
		});

		fixture = testBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		(component as any).onChange = jasmine.createSpy();
	});

	describe('writeValue', () => {
		it('should set the form with the mapped value', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();
			component.writeValue('test');

			expect(component.form.value).toEqual({ name: 'test' });
		}));
	});

	describe('onChange', () => {
		it('should call the `onChange` with the mapped value', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.form.patchValue({ name: 'test' });

			expect((component as any).onChange).toHaveBeenCalledWith('test');
		}));
	});
});
