import { ApplicationConfig } from '@angular/core';

import { TourItemComponent } from './tour/components/tour.component';
import { provideNgxTourConfiguration } from '@ngx/tour';

export const tourAppConfig: ApplicationConfig = {
	providers: [
		provideNgxTourConfiguration({
			component: TourItemComponent,
			offset: { top: 90, bottom: 100 },
		}),
	],
};
