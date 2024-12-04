import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Pluck a value based on its existence, with a list of property names in case the property is empty
 *
 * @param properties -  A list of property names
 */
export const pluckOr = <ValueType, PropertyType>(
	...properties: (keyof ValueType)[]
): OperatorFunction<ValueType, PropertyType> => {
	// Iben: Early exit in case there are no properties
	if (!properties || properties.length === 0) {
		throw new Error('No properties defined in pluckOr');
	}

	// Iben: Map the value to the provided
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return map<ValueType, PropertyType>((value: any) => {
		// Iben: Return an empty value if the value is undefined
		if (!value) {
			return;
		}
		let result;

		// Iben: Loop over the arguments until one of them is found in the value
		for (const property of properties) {
			result = value[property];

			// Iben: Once we have the value we break
			if (result !== undefined) {
				break;
			}
		}

		return result;
	});
};
