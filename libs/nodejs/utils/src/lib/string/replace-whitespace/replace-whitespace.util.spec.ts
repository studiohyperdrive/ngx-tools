import { replaceHtmlWhitespace } from './replace-whitespace.util';

describe('replace-whitespace-util', () => {
	// Wouter: with non-breaking spaces
	const stringWithNbsp = 'The\u00A0quick\u00A0brown\u00A0fox';
	// Wouter: without only spaces
	const stringWithSpaces = 'The quick brown fox';
	// Wouter: both spaces and non-breaking spaces
	const stringWithMixedSpaces = 'The quick\u00A0brown fox';

	it('should replace nbsp-characters', () => {
		const alteredStingWithNbsp = replaceHtmlWhitespace(stringWithNbsp);
		expect(alteredStingWithNbsp).toEqual(stringWithSpaces);
	});

	it('should replace spaces', () => {
		const alteredStingWithSpaces = replaceHtmlWhitespace(stringWithSpaces);
		expect(alteredStingWithSpaces).toEqual(stringWithSpaces);
	});

	it('should convert both nbsp and spaces', () => {
		const alteredStringWithMixedSpaces = replaceHtmlWhitespace(stringWithMixedSpaces);
		expect(alteredStringWithMixedSpaces).toEqual(stringWithSpaces);
	});
});
