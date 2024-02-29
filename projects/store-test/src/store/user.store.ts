import { User } from '../interface/user.interface';
import {
	BaseStoreAssets,
	EntityStoreAssets,
	StoreFlowAssets,
	createBaseStoreAssets,
	createEntityAdapterStoreAssets,
	createStoreAssets,
} from 'projects/store/src/public-api';

interface UserStore extends StoreFlowAssets {
	users: EntityStoreAssets<User, { set: void; add: string }>;
	paging: BaseStoreAssets<string>;
	hello: BaseStoreAssets<string>;
	admins: EntityStoreAssets<User>;
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
	{
		subSlice: 'hello',
		generator: createBaseStoreAssets<string>,
		initialValue: 'world',
	},
	{
		subSlice: 'admins',
		generator: createEntityAdapterStoreAssets<User>,
		initialValue: [{ id: 'iben', name: 'Iben' }],
	},
]);
