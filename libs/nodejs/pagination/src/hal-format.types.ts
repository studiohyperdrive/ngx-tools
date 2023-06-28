export interface IHALLink {
	href: string;
}

export interface IHALLinks {
	self: IHALLink;
	first: IHALLink;
	last: IHALLink;
	next: IHALLink;
}

export interface IHALEntities<T = unknown> {
	[key: string]: T[];
}

export interface IHALPagination {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}

export interface IHALFormat<T = unknown> {
	_links?: IHALLinks;
	_embedded: IHALEntities<T>;
	_page: IHALPagination;
}

export interface IHALFormatParams<T = unknown> {
	path?: string;
	key: string;
	entities: T[];
	page: number;
	size: number;
	totalElements: number;
	maxPages?: number;
}
