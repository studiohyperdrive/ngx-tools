import { BaseStoreActions, BaseStoreSelectors } from './base-store';
import { EntityStoreActions, EntityStoreSelectors } from './entity-store-assets';

export type StoreSelectors = BaseStoreSelectors | EntityStoreSelectors;
export type StoreActions = BaseStoreActions | EntityStoreActions;
