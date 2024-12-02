import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, fromEvent, takeUntil, tap } from 'rxjs';

/**
 * A service that provides the currently online status of the application
 */
@Injectable({ providedIn: 'root' })
export class NgxOnlineService implements OnDestroy {
	/**
	 * A subject that emits whenever the application is on or offline
	 */
	private readonly onlineSubject: Subject<boolean> = new Subject<boolean>();

	/**
	 * A subject to handle the destroyed flow
	 */
	private readonly onDestroySubject: Subject<void> = new Subject();

	/**
	 * An observable that emits whenever the application is on or offline
	 */
	public readonly online$: Observable<boolean> = this.onlineSubject.asObservable();

	constructor(@Inject(PLATFORM_ID) platformId: string) {
		// Iben: When we're in the browser, listen to the online and offline status of the application
		if (isPlatformBrowser(platformId)) {
			// Iben: Handle the on and offline status of the application
			fromEvent(window, 'online')
				.pipe(
					tap(() => {
						this.onlineSubject.next(true);
					}),
					takeUntil(this.onDestroySubject.asObservable())
				)
				.subscribe();

			fromEvent(window, 'offline')
				.pipe(
					tap(() => {
						this.onlineSubject.next(false);
					}),
					takeUntil(this.onDestroySubject.asObservable())
				)
				.subscribe();
		}
	}

	ngOnDestroy(): void {
		// Iben: Complete the destroyed subject
		this.onDestroySubject.next();
		this.onDestroySubject.complete();
	}
}
