import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: 'ngx-dynamic-layout-item',
	standalone: true,
})
export class NgxDynamicLayoutItemComponent {
	/**
	 * A template for the item in the content list
	 */
	@ContentChild('contentTmpl', { static: false })
	public contentTemplate: TemplateRef<any>;

	/**
	 * A template for the item in the source list
	 */
	@ContentChild('sourceTmpl', { static: false })
	public sourceTemplate: TemplateRef<any>;

	/**
	 * The key of to which we can match the data
	 */
	@Input({ required: true }) public key: string;
}
