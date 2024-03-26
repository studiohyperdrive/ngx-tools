import { Pipe, PipeTransform } from '@angular/core';
import { NgxConfigurableLayoutItemEntity, NgxConfigurableLayoutItemSizeOption } from '../../types';

@Pipe({
	name: 'ngxConfigurableLayoutItemSize',
	standalone: true,
})
export class NgxConfigurableLayoutItemSizePipe implements PipeTransform {
	/**
	 * Returns the needed styling for the ngx-configurable-layout component
	 *
	 * @param keys - The keys used in the grid
	 * @param showInactive - Whether we want to show inactive items
	 * @param itemSize - The itemSize used by the layout
	 */
	transform(
		{
			keys,
			showInactive,
		}: { keys: NgxConfigurableLayoutItemEntity[][]; showInactive: boolean },
		itemSize: NgxConfigurableLayoutItemSizeOption
	): Record<string, any> {
		// Iben: If non data source is provided or if the itemSize is 'fill',
		// we can use the default grid size which will result in filling up the available grid space.
		if (!keys || itemSize === 'fill') {
			return {};
		}

		// Iben: If itemSize is 'fit-content', the columns will be based on the content of the template
		if (itemSize === 'fit-content') {
			return {
				'grid-auto-columns': 'max-content',
			};
		}

		// Iben: If itemSize is 'equal', all items in the grid need to be of equal size.
		// For this, we grab the row with the largest amount of items, which will define the amount of columns
		const longestRow = Math.max(
			...[...keys].map((item) => {
				return item.filter((key) => {
					if (!showInactive) {
						return key.isActive;
					}

					return true;
				}).length;
			})
		);

		return {
			'grid-template-columns': `repeat(${longestRow}, minmax(0, 1fr))`,
		};
	}
}
