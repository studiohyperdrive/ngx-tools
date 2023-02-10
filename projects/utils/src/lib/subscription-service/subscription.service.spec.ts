import { TestBed, getTestBed } from '@angular/core/testing';

import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
	let injector: TestBed;
	let service: SubscriptionService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SubscriptionService],
		});

		injector = getTestBed();
		service = injector.inject(SubscriptionService);
	});

	describe('destroy', () => {
		it('should set a value to the destroyed$ Subject, destroying all subscriptions', (done: DoneFn) => {
			const testSub = service.destroyed$.subscribe((triggered: boolean) => {
				expect(triggered).toBe(true);

				testSub.unsubscribe();

				done();
			});

			service.ngOnDestroy();
		});
	});
});
