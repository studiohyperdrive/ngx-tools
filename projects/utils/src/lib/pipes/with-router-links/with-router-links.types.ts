export interface WithRouterLinksConfig {
	elSelector: string;
	linkAttr: string;
	dataLinkIdAttr: string;
}

export interface LinkReference {
	select: string;
	linkTo: string | string[];
	elSelector?: string;
	toAttr?: string;
}
