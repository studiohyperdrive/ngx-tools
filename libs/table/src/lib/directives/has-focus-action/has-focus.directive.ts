import { Directive, HostListener } from '@angular/core';

/**
 * An abstract directive used as a base to handle focussed base actions
 */
@Directive({
	standalone: true,
})
export abstract class NgxHasFocusDirective {
	/**
	 * Whether the current element is focussed
	 */
	protected hasFocus: boolean = false;

	/**
	 * Set the hasFocus flag
	 */
	@HostListener('focus') setFocus() {
		this.hasFocus = true;
	}

	/**
	 * Remove the hasFocus flag
	 */
	@HostListener('blur') removeFocus() {
		this.hasFocus = false;
	}

	/**
	 * Execute an action when the element has focussed
	 *
	 * @param action - The provided action
	 */
	public handleWhenFocussed(action: () => void): void {
		if (this.hasFocus) {
			action();
		}
	}
}
