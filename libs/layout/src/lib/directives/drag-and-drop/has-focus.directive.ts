import { Directive, HostListener } from '@angular/core';

//TODO: Iben: Move this copy to a shared lib once we have figured out how to handle that.

/**
 * An abstract directive used as a base to handle focussed base actions
 */
@Directive({
	standalone: true,
})
export abstract class NgxHasFocusDragAndDropDirective {
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
