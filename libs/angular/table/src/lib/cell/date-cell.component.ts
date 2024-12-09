import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';

import { DatePipe } from '@angular/common';
import { NgxTableGetPipe } from '../pipes/get-pipe/get.pipe';
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
			@if (rowKey) { @if (row | getProp : rowKey; as rowItem) {
			<time>
				{{ rowItem | date : format }}
			</time>
			} @else {
			<i>{{ emptyLabel }}</i>
			} } @else { @if (item) {
			<time>{{ (itemKey ? item[itemKey] : item) | date : format }}</time>
			} @else {
			<i>{{ emptyLabel }}</i>
			} }
		</ng-template>
	`,
	imports: [DatePipe, NgxTableGetPipe],
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
