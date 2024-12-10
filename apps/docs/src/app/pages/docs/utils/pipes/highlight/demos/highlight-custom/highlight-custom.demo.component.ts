import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { HighlightPipe } from '@ngx/utils';

@Component({
	imports: [HighlightPipe],
	selector: 'highlight-custom-pipe-demo',
	templateUrl: 'highlight-custom.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightPipeCustomDemoComponent {
	@Input() public textToHighlight?: string = 'text to highlight';
	@Input() public selector: string = 'strong';

	public value = 'In this p there is a text to highlight.';
}
