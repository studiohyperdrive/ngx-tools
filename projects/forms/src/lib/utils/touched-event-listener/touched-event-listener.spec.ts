import { FormControl } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { touchedEventListener } from './touched-event-listener';

describe('touchedEventListener', () => {
	it('should create an Observable that listens to the touched state of a control', () => {
		const control = new FormControl();
		const spy = subscribeSpyTo(touchedEventListener(control));

		control.markAsTouched();
		control.markAsUntouched();
		control.markAsTouched();

		expect(spy.getValues()).toEqual([false, true, false, true]);
	});
});
