/**
 * The configuration used to highlight determine what and how to highlight
 */
export interface NgxHighlightConfiguration {
	/**
	 * Whether the search for matches in the provided string should be normalized.
	 */
	normalized?: boolean;
	/**
	 * Whether the search for matches in the provided string should be case-insensitive.
	 */
	caseInsensitive?: boolean;
	/**
	 * Should only the first match be highlighted or all matches
	 */
	someOrEveryMatch?: 'some' | 'every';
	/**
	 * Whether text to highlight should be split on space.
	 * If false the entire string will be used for searching e.g. "some value"
	 * If true the value will be split e.g. "some" or "value"
	 */
	splitTextToHighlight?: boolean;
	/**
	 * Which HTML tag should be used to highlight
	 */
	tag?: string;
	/**
	 * Which class should be applied to the {@link tag}.
	 */
	highlightClass?: string;
}
