import { HttpErrorResponse } from '@angular/common/http';
import { ActionCreator, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
// eslint-disable-next-line import/no-unresolved
import { Action, ActionReducer, TypedAction } from '@ngrx/store/src/models';
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
		(props: { payload: StateInterface }) => { payload: StateInterface } & TypedAction<string>
	>;
	loading: ActionCreator<
		string,
		(props: { payload: boolean }) => { payload: boolean } & TypedAction<string>
	>;
	error: ActionCreator<
		string,
		(props: {
			payload: boolean | ErrorInterface;
		}) => { payload: boolean | ErrorInterface } & TypedAction<string>
	>;
	clear: ActionCreator<string, () => TypedAction<string>>;
	effects?: {
		set: ActionCreator<
			string,
			(props?: {
				payload: EffectsInterface['set'];
			}) => { payload: EffectsInterface['set'] } & TypedAction<string>
		>;
	};
}

export interface BaseStoreSelectors<StateInterface = any> {
	select: MemoizedSelector<any, StateInterface, DefaultProjectorFn<StateInterface>>;
	selectLoading: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectError: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;
	selectErrorMessage: MemoizedSelector<any, unknown, DefaultProjectorFn<unknown>>;
}
