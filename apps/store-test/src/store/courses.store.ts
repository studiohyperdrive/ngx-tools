import {
	StoreFlowAssets,
	EntityStoreAssets,
	BaseStoreAssets,
	createStoreAssets,
	createEntityAdapterStoreAssets,
	createBaseStoreAssets,
} from '@ngx/store';

export interface CoursesStore extends StoreFlowAssets {
	courses: EntityStoreAssets<string>;
	completed: BaseStoreAssets<boolean>;
	amount: BaseStoreAssets<number>;
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
	{
		subSlice: 'amount',
		generator: createBaseStoreAssets<number>,
		initialValue: 0,
	},
]);
