/**
 * Determines whether an element is visible in the viewport
 *
 * Based on the implementation of Angelos Chalaris (https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/)
 *
 * @param element - The provided element
 * @param partiallyVisible - Whether or not the element has to be partially visible
 */
export const elementIsVisibleInViewport = (
	element: HTMLElement,
	partiallyVisible: boolean = false
): boolean => {
	const { top, left, bottom, right } = element.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	return partiallyVisible
		? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
				((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
		: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
