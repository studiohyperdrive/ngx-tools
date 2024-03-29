import { BaseStoreAssets, EntityStoreAssets, StoreFlowAssets } from '../interfaces';
import { createBaseStoreAssets, createEntityAdapterStoreAssets, createStoreAssets } from '../utils';

export type DataType = { id: string; url: string };

interface SpecStoreAssets extends StoreFlowAssets {
	channel: BaseStoreAssets<DataType, { set: boolean }>;
	videos: EntityStoreAssets<DataType, { set: string }>;
}

export const StoreSlice = 'YouTube';

export const { actions, reducers, selectors } = createStoreAssets<SpecStoreAssets>(StoreSlice, [
	{
		subSlice: 'channel',
		generator: createBaseStoreAssets<DataType>,
	},
	{
		subSlice: 'videos',
		generator: createEntityAdapterStoreAssets<DataType>,
	},
]);
