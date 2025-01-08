import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';

import { BtwPipe } from '@ngx/utils';
import { NgxAbstractTableCellDirective } from '@ngx/table';

@Component({
	selector: 'app-btw-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: BtwCellComponent,
		},
	],
	template: `
		<ng-template #cellTmpl let-item>
			{{ item | btw }}
		</ng-template>
	`,
	imports: [BtwPipe],
})
export class BtwCellComponent extends NgxAbstractTableCellDirective {
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
	public cellClass: string = 'app-btw-cell';
}
