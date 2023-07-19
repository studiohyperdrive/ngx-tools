import { BaseStoreAssets, EntityStoreAssets } from '../interfaces';
import { createBaseStoreAssets, createEntityAdapterStoreAssets, createStoreAssets } from '../utils';

export type DataType = { id: string; url: string };

type SpecStoreAssets = {
	channel: BaseStoreAssets<DataType>;
	videos: EntityStoreAssets<DataType>;
};

export const StoreSlice = 'YouTube';

export const { actions, reducers, selectors } = createStoreAssets<SpecStoreAssets>(StoreSlice, [
	{
		subSlice: 'channel',
		generator: createBaseStoreAssets<DataType>,
	},
	{
		subSlice: 'videos',
		generator: createEntityAdapterStoreAssets<DataType>
	}
]);
