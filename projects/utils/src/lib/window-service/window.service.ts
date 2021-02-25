import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @dynamic
@Injectable({
	providedIn: 'root',
})
export class WindowService {
	public width$: BehaviorSubject<number> = new BehaviorSubject<number>(1200);

	private window: Window;

	constructor(
		@Inject(DOCUMENT) public document: Document,
		// tslint:disable-next-line: ban-types
		@Inject(PLATFORM_ID) private platformId: string
	) {
		if (this.isBrowser() && this.hasDocument()) {
			this.window = this.document.defaultView;

			this.width$.next(this.window.innerWidth);

			this.window.addEventListener('resize', () => {
				if (this.window.innerWidth && this.width$.getValue()) {
					this.width$.next(this.window.innerWidth);
				}
			});
		}
	}

	public scrollTo(offset: number = 0): void {
		if (!this.window) {
			return;
		}
		this.window.scrollTo(0, offset);
	}

	public hasDocument(): boolean {
		return !!this.document;
	}

	public isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}
}
