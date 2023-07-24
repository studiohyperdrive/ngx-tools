import { FormControl, FormGroup, Validators } from '@angular/forms';
import { hasErrors } from './has-errors.util';

describe('hasErrors', () => {
	let form: FormGroup;

	beforeEach(() => {
		form = new FormGroup({
			test: new FormControl('', Validators.required),
			hello: new FormGroup({
				world: new FormControl('', Validators.required),
			}),
		});
	});

	it('should return true if any of the child controls is invalid', () => {
		expect(hasErrors(form)).toBeTrue();
	});

	it('should return false if all controls are valid', () => {
		form.patchValue( { test: 'Denis',hello: { world: 'Wouter' } } );
		
		expect(hasErrors(form)).toBeFalse();
	});
});
