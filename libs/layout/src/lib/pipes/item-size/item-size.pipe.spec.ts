import { NgxConfigurableLayoutItemSizePipe } from './item-size.pipe';

describe('NgxConfigurableLayoutItemSizePipe', () => {
	const pipe = new NgxConfigurableLayoutItemSizePipe();

	it('should return an empty object if no arguments are provided', () => {
		expect(pipe.transform(undefined, 'equal')).toEqual({});
		expect(pipe.transform(undefined, 'fit-content')).toEqual({});
		expect(pipe.transform(undefined, 'fill')).toEqual({});
	});

	it('should return an empty object if the keys are not provided', () => {
		expect(
			pipe.transform(
				{
					keys: undefined,
					showInactive: true,
				},
				'equal'
			)
		).toEqual({});
		expect(
			pipe.transform(
				{
					keys: undefined,
					showInactive: true,
				},
				'fit-content'
			)
		).toEqual({});
		expect(
			pipe.transform(
				{
					keys: undefined,
					showInactive: true,
				},
				'fill'
			)
		).toEqual({});
	});

	it('should return an empty object if the itemSize is fill', () => {
		expect(
			pipe.transform(
				{
					keys: [
						[{ key: 'a', isActive: true }],
						[
							{ key: 'b', isActive: true },
							{ key: 'c', isActive: true },
						],
					],
					showInactive: true,
				},
				'fill'
			)
		).toEqual({});
	});

	it('should return grid auto columns if the itemSize is fit-content', () => {
		expect(
			pipe.transform(
				{
					keys: [
						[{ key: 'a', isActive: true }],
						[
							{ key: 'b', isActive: true },
							{ key: 'c', isActive: true },
						],
					],
					showInactive: true,
				},
				'fit-content'
			)
		).toEqual({
			'grid-auto-columns': 'max-content',
		});
	});

	it('should return grid template columns if the itemSize is equal', () => {
		expect(
			pipe.transform(
				{
					keys: [
						[{ key: 'a', isActive: true }],
						[
							{ key: 'b', isActive: true },
							{ key: 'c', isActive: true },
						],
					],
					showInactive: true,
				},
				'equal'
			)
		).toEqual({
			'grid-template-columns': 'repeat(2, minmax(0, 1fr))',
		});
	});
});
