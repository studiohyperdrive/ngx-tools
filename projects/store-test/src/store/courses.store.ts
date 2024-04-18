import {
	BaseStoreAssets,
	EntityStoreAssets,
	StoreFlowAssets,
	createEntityAdapterStoreAssets,
	createStoreAssets,
} from 'projects/store/src/public-api';
import { createBaseStoreAssets } from 'store';

export interface CoursesStore extends StoreFlowAssets {
	courses: EntityStoreAssets<string>;
	completed: BaseStoreAssets<boolean>;
}

export const { selectors, reducers, actions } = createStoreAssets<CoursesStore>('courses', [
	{
		subSlice: 'courses',
		generator: createEntityAdapterStoreAssets<string>,
		selectId: (item) => item,
	},
	{
		subSlice: 'completed',
		generator: createBaseStoreAssets<boolean>,
	},
]);
