import { NgxTourStepOffset } from '../../types';

/**
 * Determines whether an element is visible in the viewport.
 * It calculates the position that should be scrolled to, taking into account the provided offset and
 * the relative position of the element to the center of the viewport.s
 *
 * @param element - The provided element
 * @param offset - The optional configurable margin around the cutout
 */
export const elementIsVisibleInViewport = (
	element: HTMLElement,
	margin: number,
	offset?: NgxTourStepOffset
): {
	isVisible: boolean;
	scrollY: number | undefined;
	relativeTo: 'top' | 'bottom';
} => {
	if (!element) {
		// Wouter: If element is not provided, return "true" as to prevent scrolling
		return { isVisible: true, scrollY: undefined, relativeTo: 'top' };
	}

	const { top, bottom, height: elementHeight } = element.getBoundingClientRect();
	const { innerHeight, scrollY } = window;

	const isVisible = top >= 0 && bottom <= innerHeight;

	// Wouter: If the vertical center of the element is on top of the vertical center of the viewport, the element is closer to the top
	const isCloserToTop = top + elementHeight / 2 <= innerHeight / 2;

	// Wouter: If element is in viewport, return true
	if (isVisible) {
		// Wouter: Take the required offset into account
		if (isCloserToTop) {
			return { isVisible: true, scrollY: scrollY - (offset?.top || 0), relativeTo: 'top' };
		}

		return { isVisible: true, scrollY: scrollY + (offset?.bottom || 0), relativeTo: 'bottom' };
	}

	// Wouter: If element is not in viewport, calculate whether it is closer to top or bottom.
	if (isCloserToTop) {
		// Wouter: If closer to top, set scrollY to top of viewport and the provided offset
		return {
			isVisible: false,
			scrollY: top - margin - (offset?.top || 0),
			relativeTo: 'top',
		};
	}

	// Wouter: If closer to bottom, set scrollY to bottom of viewport with an offset of the cutout height and the provided offset
	return {
		isVisible: false,
		scrollY: bottom - innerHeight + margin + (offset?.bottom || 0),
		relativeTo: 'bottom',
	};
};
