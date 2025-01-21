import { HttpErrorResponse } from '@angular/common/http';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { get } from 'lodash';

import { BaseStore, BaseStoreAssets, BaseStoreAssetsGeneratorOptions } from '../../interfaces';
import { BaseStoreEffectsInterface } from '../../interfaces/effects';

/**
 * Creates store assets to save basic properties (object, string, number, etc.) into the store
 *
 * @param slice - The slice we wish to save the data in
 */
export const createBaseStoreAssets = <
	StateInterface,
	EffectsInterface extends BaseStoreEffectsInterface = any,
>({
	slice,
	initialStateValue,
}: BaseStoreAssetsGeneratorOptions<StateInterface>): BaseStoreAssets<StateInterface> => {
	// Iben: Create actions
	const actions = {
		set: createAction(`[${slice}]: Set`, props<{ payload: StateInterface }>()),
		loading: createAction(`[${slice}]: Loading`, props<{ payload: boolean }>()),
		error: createAction(
			`[${slice}]: Error`,
			props<{
				payload: boolean | HttpErrorResponse;
			}>()
		),
		clear: createAction(`[${slice}]: Clear`),
		effects: {
			set: createAction(
				`[${slice}]: Trigger set`,
				props<{ payload: EffectsInterface['set'] }>()
			),
		},
	};

	// Iben: Set the initial state
	const initialState = {
		data: initialStateValue,
		loading: false,
		error: false,
		errorMessage: null,
	};

	// Iben: Create reducers
	const reducers = createReducer(
		initialState,
		on(actions.set, (state, { payload }) => {
			return { ...state, data: payload };
		}),
		on(actions.loading, (state, { payload }) => {
			return { ...state, loading: payload };
		}),
		on(actions.error, (state, { payload }) => {
			if (typeof payload === 'boolean') {
				return { ...state, error: payload, errorMessage: null };
			}

			return { ...state, error: true, errorMessage: payload.error };
		}),
		on(actions.clear, () => initialState),
		on(actions.effects.set, (state) => {
			return {
				...state,
				loading: true,
				error: false,
				errorMessage: undefined,
			};
		})
	);

	// Iben: Create selectors
	const featureSelector = (state) => get(state, slice);

	const selectors = {
		select: createSelector(featureSelector, (state: BaseStore<StateInterface>) => state.data),
		selectLoading: createSelector(
			featureSelector,
			(state: BaseStore<StateInterface>) => state?.loading
		),
		selectError: createSelector(
			featureSelector,
			(state: BaseStore<StateInterface>) => state?.error
		),
		selectErrorMessage: createSelector(
			featureSelector,
			(state: BaseStore<StateInterface>) => state?.errorMessage
		),
	};

	return { actions, reducers, selectors };
};
