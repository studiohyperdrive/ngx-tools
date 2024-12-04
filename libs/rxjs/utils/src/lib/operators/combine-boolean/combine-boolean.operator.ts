import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ObservableBoolean } from '../../types';

/**
 * Combines a series of ObservableBooleans using 'AND' and returns a single ObservableBoolean
 *
 * @param observableBooleans - An array of ObservableBooleans
 */
export const combineBooleans = (observableBooleans: ObservableBoolean[]): ObservableBoolean => {
	return combineLatest(observableBooleans).pipe(
		map((result) => result.reduce((previous, current) => previous && current))
	);
};
