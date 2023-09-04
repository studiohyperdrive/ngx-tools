import { User } from '../interface/user.interface';
import { StoreFlowAssets } from 'dist/store/lib/store/interfaces';
import {
	EntityStoreAssets,
	createEntityAdapterStoreAssets,
	createStoreAssets,
	BaseStoreAssets,
	createBaseStoreAssets,
} from 'store';

interface UserStore extends StoreFlowAssets {
	users: EntityStoreAssets<User, { set: void; add: string }>;
	paging: BaseStoreAssets<string>;
}

export const { actions, reducers, selectors } = createStoreAssets<UserStore>('users', [
	{
		subSlice: 'users',
		generator: createEntityAdapterStoreAssets<User, { set: void; add: string }>,
	},
	{
		subSlice: 'paging',
		generator: createBaseStoreAssets<string>,
	},
]);
