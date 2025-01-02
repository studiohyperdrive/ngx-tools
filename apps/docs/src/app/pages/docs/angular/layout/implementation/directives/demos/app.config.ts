import { ApplicationConfig } from '@angular/core';

import { DisplayContentLoadingComponent } from './display-content/loading.component';
import { DisplayContentErrorComponent } from './display-content/error.component';
import { DisplayContentOfflineComponent } from './display-content/offline.component';
import { provideNgxDisplayContentConfiguration } from '@ngx/layout';

export const layoutDirectivesConfig: ApplicationConfig = {
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
