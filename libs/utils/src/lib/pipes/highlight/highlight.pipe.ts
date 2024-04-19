import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
	/**
	 * Highlights the provided substring of a test with the chosen dom element
	 *
	 * @param value - The full text with the part we wish to highlight
	 * @param highlight - The part of the text we wish to highlight
	 * @param domElement - The dom-element we wish to use to highlight, by default this is a `mark` element
	 */
	public transform(value: string, highlight: string, domElement = 'mark'): string {
		// Iben: Early exit if there's no value or the value is not a string
		if (!value || typeof value !== 'string') {
			return value;
		}

		// Iben: Match the highlight and replace it with the wrapped element
		const regexp = new RegExp(`(${highlight})`, 'i');
		return value.replace(regexp, `<${domElement}>$1</${domElement}>`);
	}
}
