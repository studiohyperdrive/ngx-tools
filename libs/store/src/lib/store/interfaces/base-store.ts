import { HttpErrorResponse } from '@angular/common/http';
import {
	ActionCreator,
	DefaultProjectorFn,
	MemoizedSelector,
	Action,
	ActionReducer,
} from '@ngrx/store';
import { BaseStoreEffectsInterface } from './effects';

export interface BaseStore<StateInterface, ErrorInterface = unknown> {
	data: StateInterface;
	loading: boolean;
	error: boolean;
	errorMessage: ErrorInterface;
}

export interface BaseStoreAssets<
	StateInterface,
	EffectsInterface extends BaseStoreEffectsInterface = any,
	ErrorInterface = HttpErrorResponse
> {
	actions: BaseStoreActions<StateInterface, EffectsInterface, ErrorInterface>;
	reducers: ActionReducer<
		{ data: any; loading: boolean; error: boolean; errorMessage: ErrorInterface },
		Action
	>;
	selectors: BaseStoreSelectors<StateInterface>;
}

// TODO: Wouter: Add ErrorInterface to error property
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface BaseStoreActions<
	StateInterface = any,
	EffectsInterface extends BaseStoreEffectsInterface = any,
	ErrorInterface = unknown
> {
	set: ActionCreator<
		string,
		(props: { payload: StateInterface }) => { payload: StateInterface } & Action<string>
	>;
	loading: ActionCreator<
		string,
		(props: { payload: boolean }) => { payload: boolean } & Action<string>
	>;
	error: ActionCreator<
		string,
		(props: {
			payload: boolean | ErrorInterface;
		}) => { payload: boolean | ErrorInterface } & Action<string>
	>;
	clear: ActionCreator<string, () => Action<string>>;
	effects?: {
		set: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['set'];
			}) => { payload: EffectsInterface['set'] } & Action<string>
		>;
	};
}

export interface BaseStoreSelectors<StateInterface = any> {
	select: MemoizedSelector<any, StateInterface, DefaultProjectorFn<StateInterface>>;
	selectLoading: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectError: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectErrorMessage: MemoizedSelector<any, unknown, DefaultProjectorFn<unknown>>;
}
