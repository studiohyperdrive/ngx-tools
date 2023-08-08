import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
	let service: SubscriptionService;

	beforeEach(() => {
		service = new SubscriptionService();
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
