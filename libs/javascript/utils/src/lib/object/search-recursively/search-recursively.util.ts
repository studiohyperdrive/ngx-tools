/**
 * Searches recursively over a nested list of items.
 *
 * @param list - The list of items we want to loop over recursively
 * @param callbackFn - The method we use for checking each item for a match
 */
export const searchRecursively = <ItemType extends { children: ItemType[] }>(
	list: ItemType[],
	callbackFn: (item: ItemType) => boolean
): ItemType | undefined => {
	let result: ItemType | undefined;
	list.forEach((item) => {
		if (result) {
			return;
		}

		if (callbackFn(item)) {
			result = item;
		} else {
			result = searchRecursively(item.children, callbackFn);
		}
	});
	return result;
};
