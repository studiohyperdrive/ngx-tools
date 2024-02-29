import { combineReducers } from '@ngrx/store';
import { NgxStore, StoreAssetsOptions, StoreFlowAssets } from '../../interfaces';

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
			[current.subSlice]: current.selectId
				? current.generator({
						slice: `${slice}.${current.subSlice.toString()}`,
						selectId: current.selectId,
						initialStateValue: current.initialValue,
				  })
				: current.generator({
						slice: `${slice}.${current.subSlice.toString()}`,
						initialStateValue: current.initialValue,
				  }),
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
