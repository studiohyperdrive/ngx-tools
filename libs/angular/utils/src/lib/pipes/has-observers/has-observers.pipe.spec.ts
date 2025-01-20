import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HasObserversPipe } from './has-observers.pipe';

describe('HasObserversPipe', () => {
	const pipe = new HasObserversPipe();
	const subs: Subscription[] = [];

	afterEach(() => {
		subs.forEach((sub) => sub.unsubscribe());
	});

	it('should return true if the EventEmitter has observers', (done: DoneFn) => {
		const eventEmitter = new EventEmitter<boolean>();

		subs.push(
			eventEmitter.subscribe(() => {
				const result = pipe.transform(eventEmitter);

				expect(result).toBeTrue();

				done();
			})
		);

		eventEmitter.emit(true);
	});

	it('should return true if the EventEmitter has no observers', () => {
		const eventEmitter = new EventEmitter<boolean>();

		const result = pipe.transform(eventEmitter);

		expect(result).toBeFalse();
	});
});
