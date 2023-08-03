import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxI18nModule } from 'i18n';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgxI18nModule.forRoot({
			defaultLanguage: 'nl',
			availableLanguages: ['nl'],
			defaultAssetPaths: ['./assets/shared/'],
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
