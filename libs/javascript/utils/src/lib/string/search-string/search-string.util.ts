import { normalizeString } from '../normalize-string/normalize-string.util';

/**
 * Searches a given value for any potential matches
 *
 * @param value - The value to search
 * @param searchTerm - The value we want to use for searching (will be splitted on space)
 * @param normalized - Should the search be done on normalized values?
 * @param caseInsensitive - Should the search be done case-sensitive or not?
 */
export const searchValueForSome = (
	value: string | undefined | null,
	searchTerm: string,
	normalized = true,
	caseInsensitive = true
): boolean => searchValueFor(value, searchTerm, normalized, caseInsensitive, 'some');

/**
 * Searches a given value for all potential matches
 *
 * @param value - The value to search
 * @param searchTerm - The value we want to use for searching (will be splitted on space)
 * @param normalized - Should the search be done on normalized values?
 * @param caseInsensitive - Should the search be done case-sensitive or not?
 */
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
	// Femke: No searchTerm to search for, so this will always match
	if (!searchTerm.trim()) {
		return true;
	}

	// Femke: No value to search, nothing will ever match
	if (!value) {
		return false;
	}

	// Femke: Split the searchTerm on space and filter empty values (eg multiple spaces next to each other) out
	const splitSearchTerm = searchTerm.split(' ').filter((item) => !!item);

	// Femke: Normalizing the value
	const normalizedValue = normalizeString(value);

	const searchFunction = (searchText) => {
		// Femke: If we want to search normalized, we first normalize both the value and the searchTerm
		const usableValue = normalized ? normalizedValue : value;
		const usableSearchText = normalized ? normalizeString(searchText) : searchText;

		// Femke: Putting everything lowerCase when searching case-insensitive
		if (caseInsensitive) {
			return usableValue.toLowerCase().includes(usableSearchText.toLowerCase());
		}

		return usableValue.includes(usableSearchText);
	};

	// Femke: Searching only for partial matches of the searchTerm
	if (searchFor === 'some') {
		return splitSearchTerm.some(searchFunction);
	}

	// Femke: Searching for all matches of the searchTerm
	return splitSearchTerm.every(searchFunction);
};
