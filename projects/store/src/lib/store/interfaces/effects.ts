import { BaseStoreActions } from './base-store';
import { EntityStoreActions } from './entity-store-assets';
import { RequireAtLeastOne } from './require-at-least-one';

export type EntityStoreEffectsInterface = RequireAtLeastOne<{
	add: any;
	update: any;
	delete: any;
	set: any;
}>;

export type BaseStoreEffectsInterface = {
	set: any;
};

export type EffectActions<Actions extends BaseStoreActions | EntityStoreActions> =
	Actions extends EntityStoreActions
		? keyof EntityStoreEffectsInterface
		: keyof BaseStoreEffectsInterface;
