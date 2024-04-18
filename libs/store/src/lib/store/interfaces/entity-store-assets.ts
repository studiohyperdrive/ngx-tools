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
	effects?: {
		add: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['add'];
			}) => { payload: EffectsInterface['add'] } & TypedAction<string>
		>;
		set: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['set'];
			}) => { payload: EffectsInterface['set'] } & TypedAction<string>
		>;
		update: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['update'];
			}) => { payload: EffectsInterface['update'] } & TypedAction<string>
		>;
		delete: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['delete'];
			}) => { payload: EffectsInterface['delete'] } & TypedAction<string>
		>;
	};
}
