import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
	DisplayContentErrorComponent,
	DisplayContentLoadingComponent,
	DisplayContentOfflineComponent,
} from '../display-content';
import { TourItemComponent } from '../tour/tour.component';
import { routes } from '../routes';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ConfirmModalComponent } from '../modal/confirm.component';
import { provideNgxDisplayContentConfiguration } from '@ngx/layout';
import { provideNgxTourConfiguration } from '@ngx/tour';
import { provideNgxModalConfiguration, provideNgxTooltipConfiguration } from '@ngx/inform';

export const appConfig: ApplicationConfig = {
	providers: [
		provideNgxDisplayContentConfiguration({
			hideWhenNoTemplateProvided: true,
			listenToOnlineStatus: true,
			components: {
				loading: DisplayContentLoadingComponent,
				error: DisplayContentErrorComponent,
				offline: DisplayContentOfflineComponent,
			},
		}),
		provideNgxTourConfiguration(TourItemComponent),
		provideNgxTooltipConfiguration({ component: TooltipComponent }),
		provideNgxModalConfiguration({
			modals: {
				confirm: {
					component: ConfirmModalComponent,
					role: 'alertdialog',
					panelClass: 'modeeeeeeel-panel',
				},
			},
			panelClass: 'modal-panelelelelele',
		}),
		provideRouter(routes),
	],
};
