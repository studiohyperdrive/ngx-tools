import { Component } from '@angular/core';
import { StripHtmlPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [StripHtmlPipe],
	selector: 'strip-html-demo',
	templateUrl: 'strip-html.demo.component.html',
})
export class StripHtmlPipeDemoComponent {
	value = '<h1>Hello, World!</h1>';
}
