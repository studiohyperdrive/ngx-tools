import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { NgxI18nModule } from '@ngx/i18n';

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserModule,
			AppRoutingModule,
			NgxI18nModule.forRoot({
				defaultLanguage: 'nl',
				availableLanguages: ['nl', 'fr'],
				defaultAssetPaths: ['./assets/shared/'],
			})
		),
		provideHttpClient(withInterceptorsFromDi()),
	],
}).catch((err) => console.error(err));
