import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import {
	BaseStoreActions,
	BaseStoreSelectors,
	EntityStoreActions,
	EntityStoreSelectors,
} from '../../interfaces';

// -------------------
// Overloads
// -------------------
// BASE STORE
export function dispatchDataToStore<DataType = any>(
	dispatchAction: BaseStoreActions<DataType>,
	selectAction: BaseStoreSelectors<DataType>,
	data: Observable<DataType>,
	store: Store,
	dispatchType: 'set'
): Observable<DataType>;
export function dispatchDataToStore<DataType = any>(
	dispatchAction: BaseStoreActions<DataType>,
	selectAction: BaseStoreSelectors<DataType>,
	data: Observable<DataType>,
	store: Store
): Observable<DataType>;
// NO SELECTOR
export function dispatchDataToStore<DataType = any>(
	dispatchAction: BaseStoreActions<DataType>,
	selectAction: null | undefined,
	data: Observable<DataType>,
	store: Store,
	dispatchType: 'set'
): Observable<null>;
export function dispatchDataToStore<DataType = any>(
	dispatchAction: BaseStoreActions<DataType>,
	selectAction: null | undefined,
	data: Observable<DataType>,
	store: Store
): Observable<null>;
// ENTITY STORE
export function dispatchDataToStore<DataType = any>(
	dispatchAction: EntityStoreActions<DataType>,
	selectAction: EntityStoreSelectors<DataType>,
	data: Observable<DataType[]>,
	store: Store,
	dispatchType: 'set' | 'add' | 'update'
): Observable<DataType[]>;
export function dispatchDataToStore<DataType = any>(
	dispatchAction: EntityStoreActions<DataType>,
	selectAction: EntityStoreSelectors<DataType>,
	data: Observable<DataType[]>,
	store: Store
): Observable<DataType[]>;
// NO SELECTOR
export function dispatchDataToStore<DataType = any>(
	dispatchAction: EntityStoreActions<DataType>,
	selectAction: null | undefined,
	data: Observable<DataType[]>,
	store: Store,
	dispatchType: 'set' | 'add' | 'update'
): Observable<null>;
export function dispatchDataToStore<DataType = any>(
	dispatchAction: EntityStoreActions<DataType>,
	selectAction: null | undefined,
	data: Observable<DataType[]>,
	store: Store
): Observable<null>;

// -------------------
// Definition
// -------------------
/**
 * Dispatches data to the store based on a provided action and Observable. Loading and error state will be handled by default.
 *
 * @param dispatchAction - The action we wish to use to dispatch data to the store
 * @param selectAction - The selector we wish to use to select the data from the store. If not provided, `null` will be returned.
 * @param data - The data we wish to dispatch to the store
 * @param store - The store we wish to dispatch the data to
 * @param dispatchType - Whether we wish to set, add or update the data. By default this is `set`
 * @returns {Observable<(DataType | DataType[] | null)>} - Returns the data that was dispatched to the store. The generic type is the same as the `data`.
 */
export function dispatchDataToStore<DataType = any>(
	dispatchAction: BaseStoreActions<DataType> | EntityStoreActions<DataType>,
	selectAction: BaseStoreSelectors<DataType> | EntityStoreSelectors<DataType> | undefined,
	data: Observable<DataType | DataType[]>,
	store: Store,
	dispatchType: 'set' | 'add' | 'update' = 'set'
): Observable<DataType | DataType[]> | null {
	// Iben: Set the loading state to true and the error state to false to start a new set
	store.dispatch(dispatchAction.loading({ payload: true }));
	store.dispatch(dispatchAction.error({ payload: false }));

	// Iben: Set, add or update the data according to the provided dispatch type
	return data.pipe(
		tap((payload) => {
			switch (dispatchType) {
				case 'set': {
					return payload instanceof Array
						? store.dispatch(
								(dispatchAction as EntityStoreActions<DataType>).set({
									payload,
								})
						  )
						: store.dispatch(
								(dispatchAction as BaseStoreActions<DataType>).set({
									payload,
								})
						  );
				}
				case 'add': {
					if (!(payload instanceof Array)) {
						return throwError(
							() =>
								new Error(
									'NgxStore: Payload must be an array when using "add". Also make sure your storeslice is of type "EntityStoreAssets".'
								)
						);
					}

					return store.dispatch(
						(dispatchAction as EntityStoreActions<DataType>).add({ payload })
					);
				}
				case 'update': {
					if (payload instanceof Array) {
						return throwError(
							() =>
								new Error(
									'NgxStore: Payload must not be an array when using "update".'
								)
						);
					}

					return store.dispatch(
						(dispatchAction as EntityStoreActions<DataType>).update({
							payload,
						})
					);
				}
			}
		}),
		switchMap((payload) => {
			if (!selectAction) {
				return of(null);
			}

			// Wouter: Get the value recently set to the store. This is done to keep the Store as SSOT.
			return store.select(
				payload instanceof Array
					? (selectAction as EntityStoreSelectors).selectAll
					: (selectAction as BaseStoreSelectors).select
			);
		}),
		// Iben: Catch the error and dispatch its to the store
		catchError((err) => {
			store.dispatch(dispatchAction.error({ payload: err }));

			return throwError(() => err);
		}),
		// Iben: Set the loading state to false
		finalize(() => {
			store.dispatch(dispatchAction.loading({ payload: false }));
		})
	);
}
