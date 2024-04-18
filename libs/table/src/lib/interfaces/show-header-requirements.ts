import { RequireAtLeastOne } from './internal-helpers';

export interface NgxTableShowHeaderRequirements {
	isLoading: boolean;
	isEmpty: boolean;
}

interface NgxTableCypressDataTagsBase {
	header?: string;
	cell?: string;
	footer?: string;
}

export type NgxTableCypressDataTags = RequireAtLeastOne<NgxTableCypressDataTagsBase>;
