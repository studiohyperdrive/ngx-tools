import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { hideElement } from '../../utils';

/**
 * A singleton service that adds a live region element to the DOM, to which WCAG/WAI-ARIA announcements can be send.
 */
@Injectable({
	providedIn: 'root',
})
export class NgxLiveRegionService {
	/**
	 * The live region element
	 */
	private region: HTMLElement;

	constructor(
		@Inject(PLATFORM_ID) platformId: string,
		@Inject(DOCUMENT) private document: Document
	) {
		// Iben: Create a live region element
		if (isPlatformBrowser(platformId)) {
			this.createLiveRegion();
		}
	}

	/**
	 * Return whether the live region is available
	 */
	public get hasLiveRegion(): boolean {
		return Boolean(this.region);
	}

	/**
	 * Set a message in the live region
	 *
	 * @param message - The provided message
	 */
	public setMessage(message: string): void {
		// Iben: Display the message if the live region is present, if not, throw a warning
		if (this.hasLiveRegion) {
			this.region.innerText = message;
		} else {
			console.warn(
				'NgxLiveRegionService: An attempt was made to set a message to the live region when the live region was not yet created.'
			);
		}
	}

	/**
	 * Creates a live region where we can broadcast announcements intended for assistive technologies to
	 */
	private createLiveRegion(): void {
		// Iben: Early exit if a live region already exists
		if (this.hasLiveRegion) {
			return;
		}

		// Iben: Create initial element
		this.region = this.document.createElement('div');

		// Iben: Set the needed aria-attributes
		this.region.setAttribute('aria-live', 'assertive');
		this.region.setAttribute('role', 'log');
		this.region.setAttribute('aria-relevant', 'additions');
		this.region.setAttribute('aria-atomic', 'true');

		//Iben: Move the live region out of sight for without assistive technologies
		hideElement(this.region);

		// Iben: Append the live region to the body
		this.document.body.appendChild(this.region);
	}
}
