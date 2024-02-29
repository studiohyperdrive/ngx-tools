import { createEntityAdapterStoreAssets } from './entity-adapter.util';

describe('createEntityAdapterStoreAssets', () => {
	it('should return the correct actions based on the slice', () => {
		const { actions } = createEntityAdapterStoreAssets({ slice: 'moustaches' });

		expect(actions.add.type).toEqual('[moustaches]: Add');
		expect(actions.set.type).toEqual('[moustaches]: Set');
		expect(actions.delete.type).toEqual('[moustaches]: Delete');
		expect(actions.update.type).toEqual('[moustaches]: Update');
		expect(actions.loading.type).toEqual('[moustaches]: Loading');
		expect(actions.error.type).toEqual('[moustaches]: Error');
		expect(actions.clear.type).toEqual('[moustaches]: Clear');
		expect(actions.effects.set.type).toEqual('[moustaches]: Trigger set');
		expect(actions.effects.add.type).toEqual('[moustaches]: Trigger add');
		expect(actions.effects.update.type).toEqual('[moustaches]: Trigger update');
		expect(actions.effects.delete.type).toEqual('[moustaches]: Trigger delete');
	});

	it('should return the reducers/selectors based on the slice', () => {
		const { reducers, selectors } = createEntityAdapterStoreAssets({ slice: 'moustaches' });

		expect(reducers).not.toBeUndefined();
		expect(selectors).not.toBeUndefined();
		expect(selectors.selectAll).not.toBeUndefined();
		expect(selectors.selectError).not.toBeUndefined();
		expect(selectors.selectLoading).not.toBeUndefined();
		expect(selectors.selectErrorMessage).not.toBeUndefined();
	});
});
