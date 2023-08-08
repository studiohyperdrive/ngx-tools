import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SubscriptionService implements OnDestroy {
	public destroyed$: Subject<boolean> = new Subject<boolean>();

	public ngOnDestroy(): void {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}
}
