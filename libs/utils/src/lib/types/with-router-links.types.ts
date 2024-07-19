export interface WithRouterLinksConfig {
	replaceElementSelector: string;
	linkAttributeName: string;
	dataLinkIdAttributeName: string;
	/** Add a class to the host of the substitute element. */
	hostClass?: string;
}

export interface LinkReference {
	dataLinkId: string;
	link: string | string[];
	replaceElementSelector?: string;
	toAttribute?: string;
	/** Add a class to the host of the substitute element. This will overwrite the global hostClass of the injection token. */
	hostClass?: string;
}
