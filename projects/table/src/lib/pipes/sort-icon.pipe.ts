import { Pipe, PipeTransform } from '@angular/core';

import { NgxTableSortDirection } from '../enums/sort-direction.enum';

@Pipe({
	name: 'ngxTableSortIcon',
	standalone: true,
})
export class NgxTableSortIconPipe implements PipeTransform {
	/**
	 * Returns a icon based on the provided sort direction
	 *
	 * @param direction - The provided sort direction
	 */
	public transform(direction: null | NgxTableSortDirection): string {
		if (!direction) {
			return '&equiv;';
		}

		return direction === NgxTableSortDirection.ASCENDING ? '&uArr;' : '&dArr;';
	}
}
