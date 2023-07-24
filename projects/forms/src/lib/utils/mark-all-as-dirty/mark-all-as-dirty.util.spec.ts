import { FormControl, FormGroup } from '@angular/forms';
import { markAllAsDirty } from './mark-all-as-dirty.util';

describe('markAllAsDirty', () => {
	let form: FormGroup;

	beforeEach(() => {
		form = new FormGroup({
			test: new FormControl(),
			hello: new FormGroup({
				world: new FormControl(),
			}),
		});
	});

	it('should mark all controls as dirty', () => {
		markAllAsDirty( form.controls );

		expect( form.get( 'test' ).dirty ).toBeTrue();
		expect(form.get('hello').dirty).toBeTrue();
		expect(form.get('hello.world').dirty).toBeTrue();
	});
});
