import { FormControl, FormGroup } from '@angular/forms';
import { updateAllValueAndValidity } from './custom-update-value-and-validity.util';

describe('customUpdateValueAndValidity', () => {
	const form = new FormGroup({
		hello: new FormGroup({
			world: new FormControl(),
		}),
		test: new FormControl(),
	});

	it('should call the original update value and validity', () => {
		spyOn(form, 'updateValueAndValidity');
		updateAllValueAndValidity(form, { onlySelf: true });

		expect(form.updateValueAndValidity).toHaveBeenCalledWith({ onlySelf: true });
	});

	it('should call the update value and validity on the controls', () => {
		spyOn(form.get('hello.world'), 'updateValueAndValidity');
		spyOn(form.get('test'), 'updateValueAndValidity');

		updateAllValueAndValidity(form, { onlySelf: true });

		expect(form.get('hello.world').updateValueAndValidity).toHaveBeenCalledWith({
			onlySelf: true,
		});
		expect(form.get('test').updateValueAndValidity).toHaveBeenCalledWith({
			onlySelf: true,
		});
	});
});
