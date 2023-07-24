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
import { DataFormAccessor } from './data-form.accessor';

const keys = ['hello', 'world'];

describe('DataFormAccessor', () => {
	@Component({
		selector: 'test-component',
		template: '',
		providers: [
			{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => TestComponent),
				multi: true,
			},
		],
	})
	class TestComponent extends DataFormAccessor<
		string[],
		Record<string, string>,
		FormGroup<{ [key: string]: FormControl<string> }>
	> {
		constructor(cdRef: ChangeDetectorRef) {
			super(cdRef);
		}

		initForm(data: string[]): FormGroup {
			const result = new FormGroup({});

			data.forEach((key) => {
				result.addControl(key, new FormControl('', Validators.required));
			});

			return result;
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
		component.data = keys;
	});

	describe('writeValue', () => {
		it('should not call the `onChange` method when the writeValue is called', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			// Iben: Set the component data

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();
			component.writeValue({ hello: 'test' });

			expect(component.form.value).toEqual({ hello: 'test', world: null });
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

			component.form.patchValue({ hello: 'test' });

			expect((component as any).onChange).toHaveBeenCalledWith({ hello: 'test', world: '' });
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
			expect(component.form.get('hello').touched).toBe(true);
		}));
	});

	describe('validate', () => {
		it('should call the `validate` method with the correct output when the form is valid', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.form.patchValue( {} );

			expect(component.validate()).toEqual({invalidForm: true});
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

describe('DataFormAccessor with mappers', () => {
	@Component({
		selector: 'test-component',
		template: '',
		providers: [
			{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => TestComponent),
				multi: true,
			},
		],
	})
	class TestComponent extends DataFormAccessor<
		string[],
		[string, string][],
		FormGroup<{ [key: string]: FormControl<string> }>,
		Record<string, string>
	> {
		constructor(injector: Injector, cdRef: ChangeDetectorRef) {
			super(cdRef);
		}

		initForm(data: string[]): FormGroup {
			const result = new FormGroup({});

			data.forEach((key) => {
				result.addControl(key, new FormControl('', Validators.required));
			});

			return result;
		}

		onWriteValueMapper(values: [string, string][]) {
			return values.reduce((previous, current) => {
				return {
					...previous,
					[current[0]]: current[1],
				};
			}, {});
		}

		onChangeMapper(value: Record<string, string>): [string, string][] {
			return Object.entries(value);
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
		component.data = keys;
	});

	describe('writeValue', () => {
		it('should set the form with the mapped value', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();
			component.writeValue([['hello', 'test']]);

			expect(component.form.value).toEqual({ hello: 'test', world: null });
		}));
	});

	describe('onChange', () => {
		it('should call the `onChange` with the mapped value', fakeAsync(async () => {
			// Flush the component `setTimeout`
			tick();

			fixture.detectChanges();

			// Wait until the task queue becomes empty
			await fixture.whenStable();

			component.form.patchValue({ hello: 'test' });

			expect((component as any).onChange).toHaveBeenCalledWith([
				['hello', 'test'],
				['world', ''],
			]);
		}));
	});
});
