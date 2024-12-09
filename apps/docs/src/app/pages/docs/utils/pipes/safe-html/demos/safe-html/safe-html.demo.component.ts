import { Component } from '@angular/core';
import { SafeHtmlPipe } from '@ngx/utils';

@Component({
	imports: [SafeHtmlPipe],
	selector: 'safe-html-demo',
	templateUrl: 'safe-html.demo.component.html',
})
export class SafeHtmlPipeDemoComponent {
	public value = "<h1>Foo Bar</h1><script>window.prompt('This is a prompt')</script>";
}
