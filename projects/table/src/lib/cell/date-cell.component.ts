import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';

import { NgxAbstractTableCellDirective } from './cell.directive';

@Component({
	selector: 'ngx-date-table-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: NgxDateTableCellComponent,
		},
	],
	template: `
		<ng-template #cellTmpl let-item let-row="row">
			<ng-container *ngIf="rowKey; else itemTemplate">
				<time *ngIf="row | getProp : rowKey as rowItem; else emptyTemplate">
					{{ rowItem | date : format }}
				</time>
			</ng-container>

			<ng-template #itemTemplate>
				<time *ngIf="item; else emptyTemplate">{{
					(itemKey ? item[itemKey] : item) | date : format
				}}</time>
			</ng-template>

			<ng-template #emptyTemplate>
				<i>{{ emptyLabel }}</i>
			</ng-template>
		</ng-template>
	`,
})
export class NgxDateTableCellComponent extends NgxAbstractTableCellDirective {
	/**
	 * The format of the provided date, by default `dd/MM/yyyy`
	 */
	@Input() public format = 'dd/MM/yyyy';

	/**
	 * The label to display when date is invalid or empty
	 */
	@Input() public emptyLabel = 'Empty date';

	/**
	 * In case the date is nested in an object, we can provide a key to fetch it
	 */
	@Input() public itemKey: string;

	/**
	 * In case the date is nested in the row, we can provide a key to fetch it
	 */
	@Input() public rowKey: string;

	/**
	 * A template for the header of the cell
	 */
	@ContentChild('headerTmpl', { static: false })
	public headerTemplate: TemplateRef<unknown>;
	/**
	 * A template for the footer of the cell
	 */
	@ContentChild('footerTmpl', { static: false })
	public footerTemplate: TemplateRef<unknown>;

	/**
	 * ViewChild that represents the cell template
	 */
	@ViewChild('cellTmpl', { static: true })
	public cellTemplate: TemplateRef<any>;

	/**
	 * A generic class to indicate that this is a date cell
	 */
	public cellClass: string = 'ngx-date-table-cell';
}
