import { pathOr } from 'ramda';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Pluck a property from a value
 *
 * This is a custom implementation given that RXJS is deprecating the actual pluck in favor for map
 * This implementation is provided given that pluck has a higher readability than a optional chained map operator
 *
 * @param properties -  A list of property names
 */
export const pluck = <ValueType, PropertyType>(
	...properties: string[]
): OperatorFunction<ValueType, PropertyType> => {
	// Iben: Early exit in case there are no properties
	if (!properties || properties.length === 0) {
		throw new Error('No properties defined in pluck');
	}

	// Iben: Map the value to the provided
	return map<ValueType, PropertyType>((value) => {
		// Iben: Return an empty value if the value is undefined
		if (!value) {
			return;
		}

		// Iben: Return the value of the property
		return pathOr(undefined, properties, value);
	});
};
