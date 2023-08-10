/**
 * Returns the filtered html as a string that has replaced the non-breakable whitespaces
 * with regular spaces.
 *
 * @param htmlString - The html string to filter
 */
export const replaceHtmlWhitespace = (htmlString: string): string => {
	// Wouter: if null or undefined falsy values, skip filtering
	if (typeof htmlString !== 'string') {
		return htmlString;
	}

	const filteredHtmlString: string = htmlString.replaceAll(/[\s\u00A0]/gi, ' ');
	return filteredHtmlString;
};
