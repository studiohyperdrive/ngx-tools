/**
 * Hides the element for users without assistive technologies
 *
 * @param {HTMLElement} element - A provided HTMLElement
 */
export const hideElement = (element: HTMLElement): void => {
	element.style.position = 'absolute';
	element.style.width = '1px';
	element.style.height = '1px';
	element.style.marginTop = '-1px';
	element.style.overflow = 'hidden';
};
