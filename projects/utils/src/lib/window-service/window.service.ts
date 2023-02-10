import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// @dynamic
@Injectable({
	providedIn: 'root',
})
export class WindowService {
	/* eslint-disable @typescript-eslint/member-ordering */
	private widthSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(1200);
	private scrollingUpSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);
	private currentScrollPositionSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	/**
	 * Observable to get the window-width, defaults to 1200 when no window is defined
	 */
	public width$: Observable<number> = this.widthSubject$.asObservable();
	/**
	 * Observable to track when the scroll has ended
	 */
	public scrollingUp$: Observable<boolean> = this.scrollingUpSubject$.asObservable();
	/**
	 * Observable of the current scroll position after the scroll has ended
	 */
	public currentScrollPosition$: Observable<number> =
		this.currentScrollPositionSubject$.asObservable();
	/**
	 * Current scroll position after the scroll has ended
	 */
	public currentScrollPosition: number = 0;
	/**
	 * The platforms Window object
	 */
	public window: Window;
	/* eslint-enable */

	constructor(
		@Inject(DOCUMENT) public document: Document,
		// tslint:disable-next-line: ban-types
		@Inject(PLATFORM_ID) private platformId: string
	) {
		if (this.isBrowser() && this.hasDocument()) {
			this.window = this.document.defaultView;
			this.document.addEventListener('scroll', this.handleContentScroll.bind(this));

			this.widthSubject$.next(this.window.innerWidth);

			this.window.addEventListener('resize', () => {
				if (this.window.innerWidth && this.widthSubject$.getValue()) {
					this.widthSubject$.next(this.window.innerWidth);
				}
			});
		}
	}

	/**
	 * Scrolls to the provided position of the page
	 *
	 * @param offset - Offset to which we want to scroll, scrolls to top when no offset is provided
	 */
	public scrollTo(offset: number = 0): void {
		if (!this.window) {
			return;
		}
		this.window.scrollTo(0, offset);
	}

	/**
	 * Returns whether there is a document present
	 */
	public hasDocument(): boolean {
		return !!this.document;
	}

	/**
	 * Returns whether the current platform is a browser
	 */
	public isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}

	private handleContentScroll(): void {
		if (window.pageYOffset > this.currentScrollPosition) {
			this.scrollingUpSubject$.next(false);
		} else {
			this.scrollingUpSubject$.next(true);
		}

		this.currentScrollPosition = window.pageYOffset < 0 ? 0 : window.pageYOffset;
		this.currentScrollPositionSubject$.next(this.currentScrollPosition);
	}
}
