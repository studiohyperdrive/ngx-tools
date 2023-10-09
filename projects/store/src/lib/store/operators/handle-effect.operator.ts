import { Observable, catchError, finalize, map, mergeMap, of, pipe } from 'rxjs';
import { ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { BaseStoreActions, EffectActions, EntityStoreActions } from '../interfaces';
/**
 *
 *
 * @template DataType - The datatype of the source
 * @template PayloadType - The optional type for the payload
 * @param actions The actions of the subslice
 * @param action - The action we wish to dispatch
 * @param source - The source of the data
 */
export const handleEffect = <DataType, PayloadType = any>(
	actions: BaseStoreActions | EntityStoreActions,
	action: EffectActions<typeof actions>,
	source: (payload: PayloadType) => Observable<DataType>
) => {
	// Iben: Inject the store for the finalize dispatch
	const store = inject(Store);

	return pipe(
		// Iben: Listen to the provided action
		ofType(actions.effects[action]),
		// Iben: Merge-map to the request
		mergeMap((value) => {
			// Iben: Fetch the optional payload to the request
			return source(value?.payload).pipe(
				// Iben: Map the call to an action
				map((payload) => {
					return {
						type: actions[action].type,
						payload,
					};
				}),
				// Iben: Map the error to the error action
				catchError(() => {
					return of({ type: actions.error.type, payload: true });
				}),
				// Iben: Dispatch the loading in a finalize so that the current store setup can still work without effects
				// As this finalize is on the source, it will run this operator
				finalize(() => {
					store.dispatch(actions.loading({ payload: false }));
				})
			);
		})
	);
};
