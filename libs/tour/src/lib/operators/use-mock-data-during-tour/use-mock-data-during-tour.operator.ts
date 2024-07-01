import { inject } from '@angular/core';
import { OperatorFunction, combineLatest, map, of, switchMap } from 'rxjs';

import { NgxTourService } from '../../services';

/**
 * An operator to map the data of an Observable to mock data when the NgxTourService has an active tour.
 *
 * *Important*: This operator only works within an injection context
 *
 * @param mockData - The mock data we wish to use when the tour is active
 */
export const useMockDataDuringTour = <ValueType>(
	mockData: ValueType
): OperatorFunction<ValueType, ValueType> => {
	// Iben: Inject the tour service
	const tourService: NgxTourService = inject(NgxTourService);

	// Iben: Listen to the active state of the tour
	return switchMap((value: ValueType) => {
		return combineLatest([of(value), tourService.tourActive$]).pipe(
			map(([value, isActive]) => {
				// Iben: If the tour is active, return the mockData, else, return the value
				if (isActive) {
					return mockData;
				}

				return value;
			})
		);
	});
};
