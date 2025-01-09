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
	// Femke: The final result if we find any
	let result: ItemType | undefined;

	// Femke: Loop over the current list
	list.forEach((item) => {
		// Femke: If we have already a result, no need to search further
		if (result) {
			return;
		}

		// Femke: Check the item if it matches what we are searching for
		if (callbackFn(item)) {
			// Femke: Found a match, so store it
			result = item;
		} else {
			// Femke: No match found, search the children of the item
			result = searchRecursively(item.children, callbackFn);
		}
	});

	return result;
};
