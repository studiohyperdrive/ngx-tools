import { Pipe, PipeTransform } from '@angular/core';

import { NgxAbstractTableCellDirective } from '../../cell';
import { NgxTableSortEvent } from '../../interfaces';

@Pipe({
	name: 'ngxAriaSort',
	standalone: true,
})
export class NgxAriaSortPipe implements PipeTransform {
	transform(value: {
		currentSorting: NgxTableSortEvent;
		cell: NgxAbstractTableCellDirective;
	}): 'none' | 'ascending' | 'descending' {
		const { cell } = value;

		if (!cell || !cell.sortDirection) {
			return 'none';
		}

		return cell.sortDirection.toLocaleLowerCase() as 'ascending' | 'descending';
	}
}
