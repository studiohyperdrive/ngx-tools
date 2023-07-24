import {
	ActionReducer,
	Action,
	MemoizedSelector,
	DefaultProjectorFn,
	ActionCreator,
} from '@ngrx/store';
// eslint-disable-next-line import/no-unresolved
import { TypedAction } from '@ngrx/store/src/models';

import { BasicEntityState } from './entity-adapter-reducers';

export interface EntityStoreAssets<StateInterface> {
	reducers: ActionReducer<BasicEntityState<StateInterface>, Action>;
	selectors: EntityStoreSelectors<StateInterface>;
	actions: EntityStoreActions<StateInterface>;
}

export interface EntityStoreSelectors<StateInterface = any> {
	selectAll: MemoizedSelector<any, StateInterface[], DefaultProjectorFn<StateInterface[]>>;
	selectLoading: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectError: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectErrorMessage: MemoizedSelector<any, unknown, DefaultProjectorFn<unknown>>;
}

export interface EntityStoreActions<StateInterface = any> {
	add: ActionCreator<
		string,
		(props: {
			payload: StateInterface | StateInterface[];
		}) => { payload: StateInterface | StateInterface[] } & TypedAction<string>
	>;
	set: ActionCreator<
		string,
		(props: {
			payload: StateInterface[];
		}) => { payload: StateInterface[] } & TypedAction<string>
	>;
	update: ActionCreator<
		string,
		(props: { payload: StateInterface }) => { payload: StateInterface } & TypedAction<string>
	>;
	delete: ActionCreator<
		string,
		(props: { payload: StateInterface }) => { payload: StateInterface } & TypedAction<string>
	>;
	loading: ActionCreator<
		string,
		(props: { payload: boolean }) => { payload: boolean } & TypedAction<string>
	>;
	error: ActionCreator<
		string,
		(props: { payload: boolean }) => { payload: boolean } & TypedAction<string>
	>;
	clear: ActionCreator<string, () => TypedAction<string>>;
}
