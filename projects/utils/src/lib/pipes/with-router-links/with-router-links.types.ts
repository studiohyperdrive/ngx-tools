export interface WithRouterLinksConfig {
	replaceElementSelector: string;
	linkAttributeName: string;
	dataLinkIdAttributeName: string;
}

export interface LinkReference {
	dataLinkId: string;
	link: string | string[];
	replaceElementSelector?: string;
	toAttribute?: string;
}
