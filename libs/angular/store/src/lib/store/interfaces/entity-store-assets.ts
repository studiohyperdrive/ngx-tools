import {
	ActionReducer,
	Action,
	MemoizedSelector,
	DefaultProjectorFn,
	ActionCreator,
} from '@ngrx/store';

import { BasicEntityState } from './entity-adapter-reducers';
import { EntityStoreEffectsInterface } from './effects';

export interface EntityStoreAssets<
	StateInterface,
	EffectsInterface extends EntityStoreEffectsInterface = any
> {
	reducers: ActionReducer<BasicEntityState<StateInterface>, Action>;
	selectors: EntityStoreSelectors<StateInterface>;
	actions: EntityStoreActions<StateInterface, EffectsInterface>;
}

export interface EntityStoreSelectors<StateInterface = any> {
	selectAll: MemoizedSelector<any, StateInterface[], DefaultProjectorFn<StateInterface[]>>;
	selectLoading: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectError: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectErrorMessage: MemoizedSelector<any, unknown, DefaultProjectorFn<unknown>>;
}

export interface EntityStoreActions<
	StateInterface = any,
	EffectsInterface extends EntityStoreEffectsInterface = any
> {
	add: ActionCreator<
		string,
		(props: {
			payload: StateInterface | StateInterface[];
		}) => { payload: StateInterface | StateInterface[] } & Action<string>
	>;
	set: ActionCreator<
		string,
		(props: { payload: StateInterface[] }) => { payload: StateInterface[] } & Action<string>
	>;
	update: ActionCreator<
		string,
		(props: { payload: StateInterface }) => { payload: StateInterface } & Action<string>
	>;
	delete: ActionCreator<
		string,
		(props: { payload: StateInterface }) => { payload: StateInterface } & Action<string>
	>;
	loading: ActionCreator<
		string,
		(props: { payload: boolean }) => { payload: boolean } & Action<string>
	>;
	error: ActionCreator<
		string,
		(props: { payload: boolean }) => { payload: boolean } & Action<string>
	>;
	clear: ActionCreator<string, () => Action<string>>;
	effects?: {
		add: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['add'];
			}) => { payload: EffectsInterface['add'] } & Action<string>
		>;
		set: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['set'];
			}) => { payload: EffectsInterface['set'] } & Action<string>
		>;
		update: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['update'];
			}) => { payload: EffectsInterface['update'] } & Action<string>
		>;
		delete: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['delete'];
			}) => { payload: EffectsInterface['delete'] } & Action<string>
		>;
	};
}
