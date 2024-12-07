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
			{{ item | currency : currency }}
		</ng-template>
	`,
    imports: [CurrencyPipe]
})
export class NgxCurrencyTableCellComponent extends NgxAbstractTableCellDirective {
	/**
	 * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format of the provided amount, by default `EUR`
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
