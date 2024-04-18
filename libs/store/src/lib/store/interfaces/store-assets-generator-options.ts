import { IdSelector } from '@ngrx/entity';

export interface EntityStoreAssetsGeneratorOptions<StateInterface> {
	slice: string;
	selectId?: IdSelector<StateInterface>;
	initialStateValue?: StateInterface[];
}

export interface BaseStoreAssetsGeneratorOptions<StateInterface> {
	slice: string;
	initialStateValue?: StateInterface;
}
