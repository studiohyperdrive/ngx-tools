import { createBaseStoreAssets } from './base-store.util';

describe('createBaseStoreAssets', () => {
	it('should return the correct actions based on the slice', () => {
		const { actions } = createBaseStoreAssets('moustaches');

		expect(actions.set.type).toEqual('[moustaches]: Set');
		expect(actions.clear.type).toEqual('[moustaches]: Clear');
		expect(actions.loading.type).toEqual('[moustaches]: Loading');
		expect(actions.error.type).toEqual('[moustaches]: Error');
	});

	it('should return the reducers/selectors based on the slice', () => {
		const { reducers,selectors } = createBaseStoreAssets( 'moustaches' );

		expect(reducers).not.toBeUndefined();
		expect(selectors).not.toBeUndefined();
		expect(selectors.select).not.toBeUndefined();
		expect(selectors.selectError).not.toBeUndefined();
		expect(selectors.selectLoading).not.toBeUndefined();
		expect(selectors.selectErrorMessage).not.toBeUndefined();
	});
});
