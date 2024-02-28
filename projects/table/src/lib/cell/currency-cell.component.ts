import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { NgxAbstractTableCellDirective } from './cell.directive';

@Component({
	selector: 'ngx-currency-table-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: NgxCurrencyTableCellComponent,
		},
	],
	template: `
		<ng-template #cellTmpl let-item>
			<time>{{ item | currency : currency }}</time>
		</ng-template>
	`,
	standalone: true,
	imports: [CurrencyPipe],
})
export class NgxCurrencyTableCellComponent extends NgxAbstractTableCellDirective {
	/**
	 * The format of the provided date, by default `dd/MM/yyyy`
	 */
	@Input() public currency = 'EUR';

	/**
	 * A template for the header of the cell
	 */
	@ContentChild('headerTmpl', { static: false })
	public headerTemplate: TemplateRef<any>;
	/**
	 * A template for the footer of the cell
	 */
	@ContentChild('footerTmpl', { static: false })
	footerTemplate: TemplateRef<any>;

	/**
	 * ViewChild that represents the cell template
	 */
	@ViewChild('cellTmpl', { static: true }) cellTemplate: TemplateRef<any>;

	/**
	 * A generic class to indicate that this is a currency cell
	 */
	public cellClass: string = 'ngx-currency-table-cell';
}
