# Subscription service

This service is a solution to end RxJS subscriptions when component is destroyed.

It is build on the assumption that a service provided on a component destroys when the component destroys.

To use it, you provide the service on the component and provide its exposed `destroyed$` observable within the `takeUntil` operator in a pipe on your subscription.

```typescript
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from '@studiohyperdrive/ngx-utils';

@Component({
	providers: [SubscriptionService],
})
export class YourComponent {
	constructor(private subs: SubscriptionService) {
		yourObservable
			.pipe(takeUntil(this.subs.destroyed$))
			.subscribe
			// your subscriptions
			();
	}
}
```
