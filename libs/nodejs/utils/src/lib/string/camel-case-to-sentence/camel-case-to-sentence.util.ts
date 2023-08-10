/**
 * Converts a camelCase string to a human-readable sentence
 *
 * @param value - The provided value
 */

export const camelCaseToSentence = (value: string): string => {
	// Iben: Early exit if no (string) value was provided
	if (!value || typeof value !== 'string') {
		return '';
	}

	return (
		value
			// Iben: Split by uppercase
			.match(/[A-Z][a-z]+/g)
			// Iben: Lowercase all but the first word
			.map((value, index) => {
				return index === 0 ? value : value.toLowerCase();
			})
			// Iben: Join back to a string
			.join(' ')
			.trim()
	);
};
