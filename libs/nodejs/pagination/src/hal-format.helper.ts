import {IHALFormat, IHALFormatParams, IHALLinks, IHALPagination} from './hal-format.types';

/**
 * Calculate the total amount of pages based on the size and total-count.
 * @param size
 * @param totalElements
 */
export function calculateTotalPages(size: number, totalElements: number): number {
	return Math.ceil(totalElements / size);
}

/**
 * Calculate pagination properties based on page, size & total-count.
 * @param page
 * @param size
 * @param totalElements
 */
export function calculatePagination(
	page: number,
	size: number,
	totalElements: number,
): IHALPagination {
	return {
		size,
		totalElements,
		totalPages: calculateTotalPages(size, totalElements),
		number: page,
	};
}

/**
 * Calculate the next page based on the current-page and the total amount of pages.
 * @param totalPages
 * @param currentPage
 */
export function calculateNextPage(totalPages: number, currentPage: number): number {
	return currentPage === totalPages ? currentPage : currentPage + 1;
}

/**
 * Create the HAL-format links to self, first-, last- & next-page.
 * @param path
 * @param size
 * @param totalPages
 * @param number
 */
export function createHalLinks(
	path: string,
	{ size, totalPages, number }: IHALPagination,
): IHALLinks {
	return {
		self: {
			href: path,
		},
		first: {
			href: `${path}?page=1&pagesize=${size}`,
		},
		last: {
			href: `${path}?page=${totalPages}&pagesize=${size}`,
		},
		next: {
			href: `${path}?page=${calculateNextPage(totalPages, number)}&pagesize=${size}`,
		},
	};
}

/**
 * Create a HAL-format response based on a set of known params.
 * This function takes in generic "T" to type the provided entities.
 * @param path
 * @param key
 * @param entities
 * @param page
 * @param size
 * @param totalElements
 */
export function HALFormat<T = unknown>({
	path,
	key,
	entities,
	page,
	size,
	totalElements,
}: IHALFormatParams<T>): IHALFormat<T> {
	const _page = calculatePagination(page, size, totalElements);
	const _links = createHalLinks(path, _page);

	return {
		_links,
		_embedded: {
			[key]: entities,
		},
		_page,
	};
}
