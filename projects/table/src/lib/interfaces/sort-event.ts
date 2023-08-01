import { NgxTableSortDirection } from '../enums/sort-direction.enum';

export interface NgxTableSortEvent<ColumnKey = string> {
	direction: NgxTableSortDirection;
	column: ColumnKey;
}
