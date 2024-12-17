import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
	NG_DOC_DEFAULT_PAGE_PROCESSORS,
	NG_DOC_DEFAULT_PAGE_SKELETON,
	NgDocDefaultSearchEngine,
	provideNgDocApp,
	provideMainPageProcessor,
	providePageSkeleton,
	provideSearchEngine,
} from '@ng-doc/app';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { TooltipComponent } from './app/pages/docs/inform/implementation/directives/demos/tooltip/tooltip.component';
import { provideNgDocContext } from '@ng-doc/generated';
import {provideNgxModalConfiguration, provideNgxTooltipConfiguration} from '@ngx/inform';
import {
	ConfirmModalComponent
} from "./app/pages/docs/inform/implementation/services/demos/modal/confirm.component";
import {modalAppConfig} from "./app/pages/docs/inform/implementation/services/demos/modal/bootstrap.demo";
import {tooltipAppConfig} from "./app/pages/docs/inform/implementation/directives/demos/tooltip/bootstrap.demo";
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

bootstrapApplication(AppComponent, {
	providers: [
		// Provide context of the generated documentation
		provideNgDocContext(),
		// Provide default configuration for the documentation app
		provideNgDocApp(),
		provideSearchEngine(NgDocDefaultSearchEngine),
		providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
		provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
		// Provide animations
		provideAnimations(),
		// Provide HttpClient with interceptors (NgDoc uses interceptors)
		provideHttpClient(withInterceptorsFromDi()),
		// Add generated routes to the application
		provideRouter(
			appRoutes,
			// Enable anchor scrolling
			withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled',
			})
		),
		// Add tooltip configuration in order to get inform demos to work
		...tooltipAppConfig.providers,
		// Add tooltip configuration in order to get inform demos to work
		...modalAppConfig.providers,
	],
}).catch((err: unknown) => console.error(err));
