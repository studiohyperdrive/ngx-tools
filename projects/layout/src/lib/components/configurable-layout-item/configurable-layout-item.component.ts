import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

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
	 * The template reference of the;
	 */
	@ViewChild('contentTmpl', { static: false }) public template: TemplateRef<any>;
}
