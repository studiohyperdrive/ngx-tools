import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxAccordion } from '@ngx/layout';

@Component({
	imports: [NgxAccordion],
	selector: 'layout-accordion-demo-name',
	templateUrl: './accordion.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAccordionDemoComponent {
	public testData = [
		{ title: 'Hello', content: 'World' },
		{ title: 'foo', content: 'bar' },
		{ title: 'baz', content: 'qux' },
		{ title: 'quux', content: 'quuz' },
	];
}
