import { ApplicationConfig } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { provideNgxTooltipConfiguration } from '@ngx/inform';

export const tooltipAppConfig: ApplicationConfig = {
	providers: [
		provideNgxTooltipConfiguration({
			component: TooltipComponent,
			defaultPosition: 'right',
		}),
	],
};
