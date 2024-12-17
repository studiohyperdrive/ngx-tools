import { Component } from '@angular/core';
import { NgxTooltipAbstractComponent } from '@ngx/inform';

@Component({
	selector: 'tooltip',
	template: `<p [innerHtml]="text"></p>`,
	styles: `
		:host {
			display: block;
			border: 1px solid black;
			padding: 15px;
			background: white;

			&.ngx-tooltip-position-above {
				margin-bottom: 15px;
			}

			&.ngx-tooltip-position-below {
				margin-top: 15px;
			}

			&.ngx-tooltip-position-left {
				margin-right: 15px;
			}

			&.ngx-tooltip-position-right {
				margin-left: 15px;
			}
		}
	`,
	standalone: true,
})
export class TooltipComponent extends NgxTooltipAbstractComponent {}
