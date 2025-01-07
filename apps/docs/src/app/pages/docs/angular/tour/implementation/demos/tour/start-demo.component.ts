import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgDocButtonComponent, NgDocColor } from '@ng-doc/ui-kit';

@Component({
	standalone: true,
	imports: [NgDocButtonComponent],
	template: ` <button ng-doc-button>Button</button> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartDemoComponent {
	@Input()
	color: NgDocColor = 'primary';
}
