import { ActionReducer, Action } from '@ngrx/store';
import { IdSelector } from '@ngrx/entity';

import { BaseStoreAssets } from './base-store';
import { EntityStoreAssets } from './entity-store-assets';

/**
 * These objects will be used as a blueprint for our store slices
 *
 * @template SliceKey - The keys of our store
 */
export interface StoreAssetsOptions<SliceKey extends string | number | symbol> {
	subSlice: SliceKey;
	generator:
		| ((slice: string, selectId?: IdSelector<any>) => EntityStoreAssets<any>)
		| ((slice: string) => BaseStoreAssets<any>);

	selectId?: IdSelector<any>;
}

// Iben: The base type for our flow assets which we'll pass to the create generator
export type StoreFlowAssets = Record<string, EntityStoreAssets<any> | BaseStoreAssets<any>>;

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
