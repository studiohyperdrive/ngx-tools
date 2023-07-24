import { FormControl, FormGroup } from '@angular/forms';
import { customUpdateValueAndValidity } from './custom-update-value-and-validity.util';

describe('customUpdateValueAndValidity', () => {
	const updateValueAndValidity = jasmine.createSpy();
	const form = new FormGroup({
		hello: new FormGroup({
			world: new FormControl(),
		}),
		test: new FormControl(),
	});

	beforeEach(() => {
		updateValueAndValidity.calls.reset();
	});

	it('should call the original update value and validity', () => {
		customUpdateValueAndValidity(form, updateValueAndValidity, { onlySelf: true });

		expect(updateValueAndValidity).toHaveBeenCalledWith({ onlySelf: true });
	});

	it('should call the update value and validity on the controls', () => {
		spyOn(form.get('hello.world'), 'updateValueAndValidity');
		spyOn(form.get('test'), 'updateValueAndValidity');

		customUpdateValueAndValidity(form, updateValueAndValidity, { onlySelf: true });

		expect(form.get('hello.world').updateValueAndValidity).toHaveBeenCalledWith({
			onlySelf: true,
		});
		expect(form.get('test').updateValueAndValidity).toHaveBeenCalledWith({
			onlySelf: true,
		});
	});
});
