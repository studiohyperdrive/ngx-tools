import { Component } from '@angular/core';
import { NgxAccordion } from '@ngx/layout';

@Component({
	standalone: true,
	imports: [NgxAccordion],
	selector: 'layout-accordion-demo-name',
	templateUrl: 'accordion.demo.component.html',
})
export class LayoutAccordionDemoComponent {
	public testData = [
		{ title: 'foo', content: 'bar' },
		{ title: 'baz', content: 'qux' },
		{ title: 'quux', content: 'quuz' },
	];
}
