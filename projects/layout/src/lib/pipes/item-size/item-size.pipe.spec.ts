import { NgxConfigurableLayoutItemSizePipe } from './item-size.pipe';

describe('NgxConfigurableLayoutItemSizePipe', () => {
	const pipe = new NgxConfigurableLayoutItemSizePipe();

	it('should return an empty object if the keys are not provided', () => {
		expect(pipe.transform(undefined, 'equal')).toEqual({});
		expect(pipe.transform(undefined, 'fit-content')).toEqual({});
		expect(pipe.transform(undefined, 'fill')).toEqual({});
	});

	it('should return an empty object if the itemSize is fill', () => {
		expect(pipe.transform([['a'], ['b', 'c']], 'fill')).toEqual({});
	});

	it('should return grid auto columns if the itemSize is fit-content', () => {
		expect(pipe.transform([['a'], ['b', 'c']], 'fit-content')).toEqual({
			'grid-auto-columns': 'max-content',
		});
	});

	it('should return grid template columns if the itemSize is equal', () => {
		expect(pipe.transform([['a'], ['b', 'c']], 'equal')).toEqual({
			'grid-template-columns': 'repeat(2, minmax(0, 1fr))',
		});
	});
});
