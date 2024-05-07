import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormControl, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createAccessorProviders } from '../../utils';
import { DataFormAccessor } from './data-form.accessor';

@Component({
	selector: 'kp-form-accessor',
	template: ``,
	providers: [createAccessorProviders(FormAccessorComponent)],
})
export class FormAccessorComponent extends DataFormAccessor<string[], any, any> {
	initForm(data: string[]) {
		const result = new FormGroup({});

		data.forEach((item) => {
			result.addControl(
				item,
				new FormGroup({
					hello: new FormControl(null, [Validators.required, Validators.email]),
					world: new FormControl(null, Validators.minLength(3)),
				})
			);
		});

		return result;
	}
}

describe('FormAccessor', () => {
	let fixture: ComponentFixture<FormAccessorComponent>;
	let component: FormAccessorComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FormAccessorComponent],
			imports: [ReactiveFormsModule],
			providers: [ChangeDetectorRef, Injector, NgControl],
		});

		fixture = TestBed.createComponent(FormAccessorComponent);
		component = fixture.componentInstance;

		try {
			fixture.detectChanges();
		} catch (error) {}
	});

	it('should create the form on the provided data', () => {
		component.data = ['test', 'hello'];
		expect(component.form.get('test.world')).toBeDefined();
		expect(component.form.get('test.hello')).toBeDefined();
		expect(component.form.get('hello.world')).toBeDefined();
		expect(component.form.get('hello.hello')).toBeDefined();
	});
});
