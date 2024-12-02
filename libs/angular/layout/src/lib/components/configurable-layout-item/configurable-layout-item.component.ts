import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

/**
 * The layout item pairs with the `<ngx-configurable-layout>` container.
 * This component will in itself not be rendered. The key provided in this component
 * will need to be provided in the `[keys]` input or the `formControl` of the layout container
 * as well. The order in which they are provided there, will define the order in which
 * the items will be rendered.
 */
@Component({
	selector: 'ngx-configurable-layout-item',
	templateUrl: './configurable-layout-item.component.html',
	standalone: true,
})
export class NgxConfigurableLayoutItemComponent {
	/**
	 * The unique key of the layout item.
	 */
	@Input({ required: true }) public key: string;

	/**
	 * An optional label for the layout item used for WCAG purposes.
	 */
	@Input() public label: string;

	/**
	 * The template reference of the;
	 */
	@ViewChild('contentTmpl', { static: false }) public template: TemplateRef<any>;
}
