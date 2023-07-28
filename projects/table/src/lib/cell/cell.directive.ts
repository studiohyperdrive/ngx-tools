import { Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { NgxTableSortDirection } from '../enums/sort-direction.enum';
import { NgxTableSortEvent } from '../interfaces';

@Directive({
	selector: 'ngx-abstract-table-cell',
})
export class NgxAbstractTableCellDirective {
	/**
	 * The name of the column we want this cell to represent
	 */
	@Input() public column: string;

	/**
	 * Whether or not the cell is sortable
	 */
	@Input() public sortable: boolean = false;

	@Output() sort = new EventEmitter<NgxTableSortEvent>();

	/**
	 * The current sortDirection of the cell
	 */
	public sortDirection: NgxTableSortDirection | null = null;

	/**
	 * The templates used to set in the table
	 */
	public footerTemplate: TemplateRef<any>;
	public headerTemplate: TemplateRef<any>;
	public cellTemplate: TemplateRef<any>;

	/**
	 * An optional class that can be set for the cell
	 */
	public cellClass: string;

	/**
	 * Handles the sorting click events
	 */
	public handleSort(): void {
		// Iben: Setup the sort direction
		let newSortDirection = NgxTableSortDirection.ASCENDING;

		// Iben: If a an existing sorting direction exists, we switch based on the ones we have
		if (this.sortDirection) {
			newSortDirection =
				this.sortDirection === NgxTableSortDirection.ASCENDING
					? NgxTableSortDirection.DESCENDING
					: NgxTableSortDirection.ASCENDING;
		}

		// Iben: Set the internal sorting direction
		this.setSortDirection(newSortDirection);

		// Iben: Emit the sorting event
		this.sort.emit({
			direction: this.sortDirection,
			column: this.column,
		});
	}

	/**
	 * Resets the sort direction back to null
	 */
	public resetSortDirection(): void {
		this.sortDirection = null;
	}

	/**
	 * Sets the sorting direction based on the provided direction
	 *
	 * @param direction - The provided direction
	 */
	public setSortDirection(direction: NgxTableSortDirection): void {
		this.sortDirection = direction;
	}
}
