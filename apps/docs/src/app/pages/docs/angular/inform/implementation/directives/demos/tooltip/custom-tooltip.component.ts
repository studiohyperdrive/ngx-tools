import { Component } from '@angular/core';
import { NgxTooltipAbstractComponent } from '@ngx/inform';

@Component({
	template: `<h1 [innerHtml]="text"></h1>`,
	styles: `
		:host {
			display: block;
			border: 1px solid red;
			background: white;
		}
	`,
	standalone: true,
})
export class CustomTooltipComponent extends NgxTooltipAbstractComponent {}
