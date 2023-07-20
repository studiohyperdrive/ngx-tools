import { Action, ActionReducer, combineReducers } from '@ngrx/store';

import { BaseStoreAssets, EntityStoreAssets } from '../../interfaces';

/**
 * These objects will be used as a blueprint for our store slices
 *
 * @template SliceKey - The keys of our store
 */
export interface StoreAssetsOptions<SliceKey extends string | number | symbol> {
	subSlice: SliceKey;
	generator: (slice: string) => EntityStoreAssets<any> | BaseStoreAssets<any>;
}

// Iben: The base type for our flow assets which we'll pass to the create generator
type StoreFlowAssets = Record<string, EntityStoreAssets<any> | BaseStoreAssets<any>>;

// Iben: Type to extract the selectors from the provided ResultType, so that we know if we have a BaseStoreSelector or an EntityStoreSelector, this way
// we get correct typing in our services
type StoreSelectors<ResultType extends StoreFlowAssets> = {
	[Key in keyof ResultType]: ResultType[Key]['selectors'];
};

// Iben: Type to extract the actions from the provided ResultType, so that we know if we have a BaseStoreAction or an EntityStoreAction, this way
// we get correct typing in our services
type StoreActions<ResultType extends StoreFlowAssets> = {
	[Key in keyof ResultType]: ResultType[Key]['actions'];
};

/**
 * The typing of the store of all sub slices
 *
 * @template ResultType - The typing we wish to see for our actions, reducers and selectors
 */
export interface NgxStore<ResultType extends StoreFlowAssets> {
	selectors: StoreSelectors<ResultType>;
	actions: StoreActions<ResultType>;
	reducers: ActionReducer<any, Action>;
}

/**
 * Generates selectors,actions and reducers for a store
 *
 * @template SliceKeys - The keys of the Store slices
 * @template ResultType - The typing of the store slice
 * @param slice - The slice for which you want to generate store assets
 * @param options - The subSlices you want to generate store assets for
 */
export const createStoreAssets = <ResultType extends StoreFlowAssets>(
	slice: string,
	options: StoreAssetsOptions<keyof ResultType>[]
): NgxStore<ResultType> => {
	// Iben: Generate the assets
	const storeAssets: ResultType = [...options].reduce((result, current): ResultType => {
		return {
			...result,
			[current.subSlice]: current.generator(`${slice}.${current.subSlice.toString()}`),
		};
	}, {} as ResultType);

	// Iben: Create base objects for our result
	const selectors: any = {};
	const actions: any = {};

	// Iben: Map the assets to the right entries
	Object.entries(storeAssets).forEach(([key, assets]) => {
		selectors[key] = assets.selectors;
		actions[key] = assets.actions;
	});

	// Iben: Generate a combined reducer
	const reducers = combineReducers(
		Object.keys(storeAssets).reduce((previous, current) => {
			return {
				...previous,
				[current]: storeAssets[current]?.reducers,
			};
		}, {})
	);

	// Iben: Return the result
	return {
		selectors,
		actions,
		reducers,
	};
};
