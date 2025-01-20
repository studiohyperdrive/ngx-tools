import { Observable } from 'rxjs';
import { EntityStoreAssets } from './entity-store-assets';
import { BaseStoreAssets } from './base-store';
import { StoreFlowAssets } from './store-generator';

/**
 * A type to extract the original generic DataType from a BaseStoreAssets or EntityStoreAssets
 */
type extractStoreAssetType<Type> =
	Type extends BaseStoreAssets<infer DataType>
		? DataType
		: Type extends EntityStoreAssets<infer DataType>
			? DataType[]
			: never;

/**
 * A type to map a StoreFlowAsset key to it's corresponding Observable
 */
type StoreStateData<StoreType extends StoreFlowAssets> = {
	[Key in keyof StoreType as `${string & Key}$`]: Observable<
		extractStoreAssetType<StoreType[Key]>
	>;
};

/**
 * A type to map a StoreFlowAsset key to it's corresponding loading Observable
 */
type StoreStateLoading<StoreType extends StoreFlowAssets> = {
	[Key in keyof StoreType as `${string & Key}Loading$`]: Observable<boolean>;
};

/**
 * A type to map a StoreFlowAsset key to it's corresponding error Observable
 */
type StoreStateError<StoreType extends StoreFlowAssets> = {
	[Key in keyof StoreType as `${string & Key}Error$`]: Observable<boolean>;
};

/**
 * A type to map a StoreFlowAsset key to it's corresponding error message Observable
 */
type StoreStateErrorMessage<StoreType extends StoreFlowAssets> = {
	[Key in keyof StoreType as `${string & Key}ErrorMessage$`]: Observable<boolean>;
};

/**
 * A type to map a StoreFlowAssets to a StoreState object
 */
export type StoreState<StoreType extends StoreFlowAssets> = StoreStateData<StoreType> &
	StoreStateLoading<StoreType> &
	StoreStateError<StoreType> &
	StoreStateErrorMessage<StoreType>;
