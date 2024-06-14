import { ApplicationConfig } from '@angular/core';
import {
	DisplayContentErrorComponent,
	DisplayContentLoadingComponent,
	DisplayContentOfflineComponent,
} from '../display-content';
import { provideNgxDisplayContentConfiguration } from '@ngx/layout';

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
	],
};
