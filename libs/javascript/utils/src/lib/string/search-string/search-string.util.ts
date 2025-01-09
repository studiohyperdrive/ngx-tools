import { normalizeString } from '../normalize-string/normalize-string.util';

export const searchValueForSome = (
	value: string | undefined | null,
	searchTerm: string,
	normalized = true,
	caseInsensitive = true
): boolean => searchValueFor(value, searchTerm, normalized, caseInsensitive, 'some');

export const searchValueForEvery = (
	value: string | undefined | null,
	searchTerm: string,
	normalized = true,
	caseInsensitive = true
): boolean => searchValueFor(value, searchTerm, normalized, caseInsensitive, 'every');

const searchValueFor = (
	value: string | undefined | null,
	searchTerm: string,
	normalized = true,
	caseInsensitive = true,
	searchFor: 'every' | 'some'
): boolean => {
	// No searchTerm to search for, so this will always match
	if (!searchTerm.trim()) {
		return true;
	}

	// No value to search, nothing will ever match
	if (!value) {
		return false;
	}

	// Split the searchTerm on space and filter empty values (eg multiple spaces next to each other) out
	const splitSearchTerm = searchTerm.split(' ').filter((item) => !!item);

	// Normalizing the value
	const normalizedValue = normalizeString(value);

	const searchFunction = (searchText) => {
		// If we want to search normalized, we first normalize both the value and the searchTerm
		const usableValue = normalized ? normalizedValue : value;
		const usableSearchText = normalized ? normalizeString(searchText) : searchText;

		// Putting everything lowerCase when searching case insensitive
		if (caseInsensitive) {
			return usableValue.toLowerCase().includes(usableSearchText.toLowerCase());
		}

		return usableValue.includes(usableSearchText);
	};

	if (searchFor === 'some') {
		return splitSearchTerm.some(searchFunction);
	}
	return splitSearchTerm.every(searchFunction);
};
