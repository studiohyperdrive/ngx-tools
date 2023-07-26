/*
 * Public API Surface of store
 */
export { StoreService } from './lib/store/abstracts';
export {
	BaseStoreAssets,
	EntityStoreAssets,
	NgxStore,
	BaseStoreActions,
	BaseStoreSelectors,
	EntityStoreActions,
	EntityStoreSelectors,
} from './lib/store/interfaces';
export {
	createStoreAssets,
	dispatchDataToStore,
	createBaseStoreAssets,
	createEntityAdapterStoreAssets,
} from './lib/store/utils';
