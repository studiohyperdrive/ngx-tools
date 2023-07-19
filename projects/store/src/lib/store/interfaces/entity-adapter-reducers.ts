import { EntityState } from '@ngrx/entity';

// Iben: actions get typed to any as the type TypedAction<T> from ngrx/store is sadly not exported
interface BasicEntityAdapterReducerActions {
	add: any;
	set: any;
	delete: any;
	update: any;
}

export type BasicEntityAdapterActions = Partial<BasicEntityAdapterReducerActions>;

export interface BasicEntityState<StateInterface> extends EntityState<StateInterface> {
	entityStatus: {
		loading: boolean;
		error: boolean;
		errorMessage: unknown;
	};
}
