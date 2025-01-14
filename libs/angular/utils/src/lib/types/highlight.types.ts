export interface HighlightConfig {
	normalized?: boolean;
	caseInsensitive?: boolean;
	someOrEveryMatch?: 'some' | 'every';
	splitTextToHighlight?: boolean;
	tag?: string;
	highlightClass?: string;
}
